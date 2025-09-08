// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// --- Sample Books Data ---
const books = [
  {
    title: "Agua Viva",
    author: "Clarice Lispector",
    cover: "https://via.placeholder.com/100x150?text=Agua+Viva",
    summary: "A poetic meditation on existence and language.",
  },
  {
    title: "The Springs of Affection",
    author: "Maeve Brennan",
    cover: "https://via.placeholder.com/100x150?text=Springs+of+Affection",
    summary: "Stories of Irish family life, full of subtle emotion.",
  },
  // Add more books here!
];

// --- Sample Tabs Data ---
const tabs = [
  {
    title: "Nobody Has A Personality Anymore",
    url: "https://freyaindia.co.uk",
    summary:
      "You are the way you are not because you have a soul but because of your symptoms and diagnoses; you are not an amalgam of your ancestors or curious constellation of traits but the clinical result of a timeline of childhood events...",
  },
  {
    title: "The Death of the Middle-Class Restaurant",
    url: "https://nytimes.com",
    summary:
      "Once rapidly growing commercial marvels, casual dining chains — sit-down restaurants where middle-class families can walk in without a reservation, order from another human and share a meal — have been in decline for most of the 21st century...",
  },
  // Add more tabs here!
];

// --- Book List Component ---
function BookList() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Books</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book, i) => (
          <li
            key={i}
            style={{
              marginBottom: "2rem",
              background: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px #0001",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <img
              src={book.cover}
              alt={book.title}
              style={{
                marginRight: "1rem",
                width: "100px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <div>
              <h2 style={{ margin: "0 0 0.5rem 0" }}>{book.title}</h2>
              <h4 style={{ margin: "0 0 1rem 0", color: "#555" }}>
                {book.author}
              </h4>
              <p style={{ margin: 0 }}>{book.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Tabs Page Component ---
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

// --- Main App Component ---
function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "1rem",
          background: "#eee",
          display: "flex",
          gap: "1rem",
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
        <Route path="/" element={<BookList />} />
        <Route path="/tabs" element={<TabsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
