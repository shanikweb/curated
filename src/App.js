// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

// ------- Tabs demo data (you can replace with your own) -------
const tabs = [
  {
    title: "Nobody Has A Personality Anymore",
    url: "https://freyaindia.co.uk",
    summary:
      "You are the way you are not because you have a soul but because of your symptoms and diagnoses...",
  },
];

// ------- Tabs Page -------
function TabsPage() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Tabs</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tabs.map((tab, i) => (
          <li
            key={i}
            style={{
              marginBottom: "2rem",
              background: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem 0" }}>
              <a
                href={tab.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#2a5db0" }}
              >
                {tab.title}
              </a>
            </h2>
            <p style={{ margin: 0 }}>{tab.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------- Books Page (fetch once, filter locally) -------
const STATUS_LABELS = {
  IS_READING: "Currently Reading",
  FINISHED: "Finished Reading",
  WANTS_TO_READ: "Want to Read",
};

function BooksFromLiteral() {
  const [readingStates, setReadingStates] = useState([]);
  const [status, setStatus] = useState("IS_READING");
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

  const books = useMemo(() => {
    // Filter locally by the selected status
    return readingStates
      .filter((rs) => rs.status === status)
      .map((rs) => rs.book)
      .filter(Boolean);
  }, [readingStates, status]);

  if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading books...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>{error}</div>;

  return (
    <div>
      <div style={{ textAlign: "center", margin: "1.5rem 0" }}>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStatus(key)}
            style={{
              margin: "0 0.5rem",
              padding: "0.5rem 1rem",
              background: status === key ? "#2a5db0" : "#eee",
              color: status === key ? "#fff" : "#222",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px #0001",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "1rem",
                background: "#eee",
              }}
            />
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{book.title}</h3>
            <p style={{ margin: 0, color: "#555" }}>
              {(book.authors || []).map((a) => a.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------- Main App with Navigation -------
function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "1rem",
          background: "#eee",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#222" }}>
          Books
        </Link>
        <Link to="/tabs" style={{ textDecoration: "none", color: "#222" }}>
          Tabs
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<BooksFromLiteral />} />
        <Route path="/tabs" element={<TabsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
