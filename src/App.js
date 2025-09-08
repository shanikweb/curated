// src/App.js
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// --- Book Grid Component ---
function BooksFromLiteral() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Paste your token here (keep private!)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiJjbDZzZG8yYWIxMTc3NzMwaHlsMmEwa2Vtam8iLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwidGltZXN0YW1wIjoxNzU3MzQ3NDQzMTIyLCJpYXQiOjE3NTczNDc0NDMsImV4cCI6MTc3MzA3MjI0M30.kW_gzNttA1t5_Ag7MDD--7WIAVDZAJd0jFZPedkzIp0";

    fetch("https://literal.club/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query myBooks {
            myBooks {
              id
              title
              cover
              authors { name }
            }
          }
        `,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          setError("Failed to fetch books. Check your token.");
        } else {
          setBooks(data.data.myBooks);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading books...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>{error}</div>;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "2rem",
      padding: "2rem"
    }}>
      {books.map(book => (
        <div key={book.id} style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px #0001",
          padding: "1rem",
          textAlign: "center"
        }}>
          <img
            src={book.cover}
            alt={book.title}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              borderRadius: "6px",
              marginBottom: "1rem",
              background: "#eee"
            }}
          />
          <h3 style={{ margin: "0 0 0.5rem 0" }}>{book.title}</h3>
          <p style={{ margin: 0, color: "#555" }}>
            {book.authors.map(a => a.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

// --- Main App Component ---
function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>My Books</h1>
      <BooksFromLiteral />
    </div>
  );
}

export default App;
