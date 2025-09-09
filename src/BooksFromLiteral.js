import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BooksFromLiteral.css";

const STATUS_LABELS = {
  IS_READING: "Current",
  FINISHED: "Finished",
  WANTS_TO_READ: "To Read",
};

const STATUS_ORDER = ["IS_READING", "FINISHED", "WANTS_TO_READ"];

export default function BooksFromLiteral() {
  const [readingStates, setReadingStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("IS_READING"); // start on Currently Reading
  const [viewMode, setViewMode] = useState("GRID"); // GRID | LIST
  const gridRef = useRef(null);
  const toolbarRef = useRef(null);
  const [preview, setPreview] = useState({ show: false, src: "", x: 0, y: 0 });

  // No plugin registration needed; using plain GSAP for crossfades

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiJjbDZzZG8yYWIxMTc3NzMwaHlsMmEwa2Vtam8iLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwidGltZXN0YW1wIjoxNzU3MzQ3NDQzMTIyLCJpYXQiOjE3NTczNDc0NDMsImV4cCI6MTc3MzA3MjI0M30.kW_gzNttA1t5_Ag7MDD--7WIAVDZAJd0jFZPedkzIp0"; // paste your token here

    const baseQuery = `
      query myReadingStates {
        myReadingStates {
          id
          status
          book {
            id
            slug
            title
            cover
            authors { id name }
          }
        }
      }
    `;

    // Try to request optional fields; if API rejects, we'll fall back to baseQuery
    const extendedQuery = `
      query myReadingStates {
        myReadingStates {
          id
          status
          book {
            id
            slug
            title
            cover
            authors { id name }
            year
            publishedYear
            publishedDate
            publishedAt
            genres { name }
            categories { name }
            subjects { name }
          }
        }
      }
    `;

    async function run() {
      try {
        const hit = async (query) => fetch("https://literal.club/graphql/", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ query })
        }).then(r => r.json());

        let data = await hit(extendedQuery);
        if (data.errors) {
          // fallback to base
          data = await hit(baseQuery);
        }
        if (data.errors) {
          setError("Failed to fetch books. Check your token.");
        } else {
          setReadingStates(data.data.myReadingStates || []);
        }
      } catch (e) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  // Prepare flattened list with status for filtering
  const allBooks = useMemo(() => (
    readingStates
      .map(rs => {
        const b = rs.book || {};
        // derive year from various possible fields
        const year = b.year || b.publishedYear || (typeof b.publishedDate === 'string' && (b.publishedDate.match(/\d{4}/) || [])[0]) || (typeof b.publishedAt === 'string' && (b.publishedAt.match(/\d{4}/) || [])[0]) || undefined;
        // derive genres/categories
        const names = (arr) => Array.isArray(arr) ? arr.map(x => x?.name || x).filter(Boolean) : [];
        const genreList = names(b.genres).length ? names(b.genres) : (names(b.categories).length ? names(b.categories) : names(b.subjects));
        return { ...b, _status: rs.status, _year: year, _genres: genreList };
      })
      .filter(Boolean)
  ), [readingStates]);

  const visibleBooks = useMemo(() => (
    filter === "ALL" ? allBooks : allBooks.filter(b => b._status === filter)
  ), [allBooks, filter]);

  // animate the moving underline under active chip (must be before early returns)
  useEffect(() => {
    const bar = toolbarRef.current;
    if (!bar) return;
    const ux = bar.querySelector('.chip-ux');
    const active = bar.querySelector('.chip.active');
    if (!ux || !active) return;
    const update = () => {
      const rect = active.getBoundingClientRect();
      const parent = bar.getBoundingClientRect();
      const left = rect.left - parent.left;
      ux.style.width = rect.width + 'px';
      ux.style.transform = `translateX(${left}px)`;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [filter, viewMode]);

  // Remove previous scroll hint logic — simplified grid crossfade

  if (loading) return <div className="books-loading">Loading books...</div>;
  if (error) return <div className="books-error">{error}</div>;

  

  return (
    <div className="books-page">
      <div className="books-toolbar" role="tablist" aria-label="Filter books" ref={toolbarRef}>
        {[
          { key: "IS_READING", label: STATUS_LABELS.IS_READING },
          { key: "FINISHED", label: STATUS_LABELS.FINISHED },
          { key: "WANTS_TO_READ", label: STATUS_LABELS.WANTS_TO_READ },
          { key: "LIST", label: "List" },
        ].map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={(viewMode === "LIST" ? key === "LIST" : filter === key)}
            className={`chip ${(viewMode === "LIST" ? key === "LIST" : filter === key) ? "active" : ""}`}
            onClick={() => {
              // If selecting List, switch view and fade container
              if (key === 'LIST') {
                if (viewMode === 'LIST') return;
                const grid = gridRef.current;
                if (!grid) { setViewMode('LIST'); return; }
                gsap.killTweensOf(grid);
                gsap.to(grid, { opacity: 0, y: 8, duration: 0.18, ease: 'power2.out', onComplete: () => {
                  setViewMode('LIST');
                  requestAnimationFrame(() => gsap.fromTo(grid, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.22 }));
                }});
                return;
              }

              // Otherwise ensure grid view and apply status filter
              const nextFilter = key;
              if (viewMode !== 'GRID') setViewMode('GRID');
              const grid = gridRef.current;
              if (!grid) { setFilter(nextFilter); return; }
              // Cancel any in-flight tweens to avoid stacking animations
              gsap.killTweensOf(grid);
              gsap.to(grid, {
                opacity: 0,
                y: 8,
                scale: 0.995,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  setFilter(nextFilter);
                  requestAnimationFrame(() => {
                    gsap.fromTo(
                      grid,
                      { opacity: 0, y: 8, scale: 0.985 },
                      { opacity: 1, y: 0, scale: 1, duration: 0.26, ease: "power2.out" }
                    );
                  });
                }
              });
            }}
          >
            {label}
          </button>
        ))}
        <span className="chip-ux" aria-hidden="true" />
      </div>
      {viewMode === 'LIST' ? (
        (() => {
          const hasAnyYear = allBooks.some(b => !!b._year);
          const hasAnyGenre = allBooks.some(b => Array.isArray(b._genres) && b._genres.length);
          return (
        <div className={`books-table ${hasAnyYear ? 'has-year' : ''} ${hasAnyGenre ? 'has-genre' : ''}`} ref={gridRef}>
          <div className="books-head">
            <div className="cell idx">№</div>
            <div className="cell title">Title</div>
            <div className="cell authors">Author</div>
            {hasAnyYear && <div className="cell year">Year</div>}
            {hasAnyGenre && <div className="cell genre">Genre</div>}
            <div className="cell status">Status</div>
          </div>
          <div className="books-list">
            {(allBooks.length === 0) ? (
              <div className="books-empty">No books found.</div>
            ) : (
              allBooks.map((book, i) => {
                const authors = (book.authors || []).map(a => a.name).join(", ");
                const year = book._year || "—";
                const genre = (Array.isArray(book._genres) && book._genres.length) ? book._genres.join(', ') : "—";
                const idx = String(i + 1).padStart(2, '0');
                const statusLabel = STATUS_LABELS[book._status] || book._status || '—';
                return (
                  <a
                    key={book.id}
                    href={`https://literal.club/book/${book.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-row"
                    title={book.title}
                    onMouseEnter={(e)=> setPreview({ show: true, src: book.cover, x: e.clientX + 16, y: e.clientY + 16 })}
                    onMouseMove={(e)=> setPreview(p => ({ ...p, x: e.clientX + 16, y: e.clientY + 16 }))}
                    onMouseLeave={()=> setPreview(p => ({ ...p, show: false }))}
                  >
                    <div className="cell idx">{idx}</div>
                    <div className="cell title"><span className="book-title">{book.title}</span><span className="book-authors-inline">{authors}</span></div>
                    <div className="cell authors">{authors}</div>
                    {hasAnyYear && <div className="cell year">{year}</div>}
                    {hasAnyGenre && <div className="cell genre">{genre}</div>}
                    <div className="cell status">{statusLabel}</div>
                  </a>
                );
              })
            )}
          </div>
        </div>
          );
        })()
      ) : (
        <div className="books-grid" ref={gridRef}>
          {(visibleBooks.length === 0) ? (
            <div className="books-empty">No books in this filter.</div>
          ) : (
            visibleBooks.map((book) => (
              <a
                key={book.id}
                href={`https://literal.club/book/${book.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
                title={book.title}
                data-status={book._status}
              >
                <img src={book.cover} alt={book.title} className="book-cover" />
              </a>
            ))
          )}
        </div>
      )}

      {/* floating preview for list view */}
      {viewMode === 'LIST' && (
        <div
          className="book-preview"
          style={{
            left: preview.x,
            top: preview.y,
            opacity: preview.show ? 1 : 0,
            transform: `translate(-5px, -5px)`
          }}
          aria-hidden="true"
        >
          {preview.src && <img src={preview.src} alt="" />}
        </div>
      )}
    </div>
  );
}
