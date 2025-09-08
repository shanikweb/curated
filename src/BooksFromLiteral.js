import React, { useEffect, useState } from "react";
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

  // Group books by status
  const booksByStatus = STATUS_ORDER.map(status => ({
    status,
    label: STATUS_LABELS[status],
    books: readingStates
      .filter(rs => rs.status === status)
      .map(rs => rs.book)
      .filter(Boolean)
  }));

  if (loading) return <div className="books-loading">Loading books...</div>;
  if (error) return <div className="books-error">{error}</div>;

  return (
    <div className="books-page">
      {booksByStatus.map(({ status, label, books }, idx) => (
        <section key={status} className="books-section">
          <h2 className="books-section-title">{label}</h2>
          <div className="books-row">
            {books.length === 0 ? (
              <div className="books-empty">No books in this category.</div>
            ) : (
              books.map((book, idx) => (
                <a
                  key={book.id}
                  href={`https://literal.club/book/${book.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                  style={{ "--i": idx }}
                  title={book.title}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                  />
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {(book.authors || []).map((a) => a.name).join(", ")}
                  </div>
                </a>
              ))
            )}
          </div>
          {idx < booksByStatus.length - 1 && <hr className="books-divider" />}
        </section>
      ))}
    </div>
  );
}
