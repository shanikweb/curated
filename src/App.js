import React from "react";

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

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>My Book Aggregator</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((book, i) => (
          <li key={i} style={{ marginBottom: "2rem", background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px #0001" }}>
            <img src={book.cover} alt={book.title} style={{ float: "left", marginRight: "1rem", width: "100px", height: "150px", objectFit: "cover" }} />
            <h2>{book.title}</h2>
            <h4>{book.author}</h4>
            <p>{book.summary}</p>
            <div style={{ clear: "both" }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
