import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./BooksFromLiteral.css";

const STATUS_LABELS = {
  IS_READING: "Currently Reading",
  FINISHED: "Finished Reading",
  WANTS_TO_READ: "Want to Read",
};

const STATUS_ORDER = ["IS_READING", "FINISHED", "WANTS_TO_READ"];

export default function BooksFromLiteral() {
  const [readingStates, setReadingStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("IS_READING"); // start on Currently Reading
  const gridRef = useRef(null);

  // No plugin registration needed; using plain GSAP for crossfades

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiJjbDZzZG8yYWIxMTc3NzMwaHlsMmEwa2Vtam8iLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwidGltZXN0YW1wIjoxNzU3MzQ3NDQzMTIyLCJpYXQiOjE3NTczNDc0NDMsImV4cCI6MTc3MzA3MjI0M30.kW_gzNttA1t5_Ag7MDD--7WIAVDZAJd0jFZPedkzIp0"; // paste your token here

    fetch("https://literal.club/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
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
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setError("Failed to fetch books. Check your token.");
        } else {
          setReadingStates(data.data.myReadingStates || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error.");
        setLoading(false);
      });
  }, []);

  // Prepare flattened list with status for filtering
  const allBooks = useMemo(() => (
    readingStates
      .map(rs => ({ ...rs.book, _status: rs.status }))
      .filter(Boolean)
  ), [readingStates]);

  const visibleBooks = useMemo(() => (
    filter === "ALL" ? allBooks : allBooks.filter(b => b._status === filter)
  ), [allBooks, filter]);

  // Remove previous scroll hint logic — simplified grid crossfade

  if (loading) return <div className="books-loading">Loading books...</div>;
  if (error) return <div className="books-error">{error}</div>;

  return (
    <div className="books-page">
      <div className="books-toolbar" role="tablist" aria-label="Filter books">
        {[
          { key: "IS_READING", label: STATUS_LABELS.IS_READING },
          { key: "FINISHED", label: STATUS_LABELS.FINISHED },
          { key: "WANTS_TO_READ", label: STATUS_LABELS.WANTS_TO_READ },
        ].map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            className={`chip ${filter === key ? "active" : ""}`}
            onClick={() => {
              if (key === filter) return;
              const nextFilter = key;
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
      </div>
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
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{(book.authors || []).map(a => a.name).join(", ")}</div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
