import React from "react";
import "./TabsPage.css"; // Optional: for tabs page styles

const tabs = [
  {
    title: "Nobody Has A Personality Anymore",
    url: "https://freyaindia.co.uk",
    summary: "You are the way you are not because you have a soul but because of your symptoms and diagnoses...",
  },
];

export default function TabsPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontWeight: 400, fontSize: 28, marginBottom: "2rem" }}>Tabs</h1>
      <ul style={{ listStyle: "none", padding: 0, maxWidth: 700 }}>
        {tabs.map((tab, i) => (
          <li
            key={i}
            style={{
              marginBottom: "2.5rem",
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px #0001",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: 22 }}>
              <a
                href={tab.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#2a5db0" }}
              >
                {tab.title}
              </a>
            </h2>
            <p style={{ margin: 0, color: "#444" }}>{tab.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
