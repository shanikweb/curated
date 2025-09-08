import React, { useEffect, useState } from "react";

function BooksFromLiteral() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Paste your token here (for testing only; don't share publicly)
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
        setBooks(data.data.myBooks);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading books...</div>;

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
              marginBottom: "1rem"
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

export default BooksFromLiteral;
