import React from "react";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 2rem" }}>
      <section style={{ marginTop: "1rem" }}>
        <h1 style={{ fontSize: "1.8rem", margin: "0 0 0.75rem 0", letterSpacing: "0.01em" }}>About</h1>
        <p style={{ lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>
          Signal & Frame is a small, evolving garden of curation — books, films, tabs,
          and photos collected by Shanik Tanna. This site will soon include longer notes,
          image galleries, and links to projects.
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem 0", letterSpacing: "0.01em" }}>Contact</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
          <li><a href="mailto:hello@shaniktanna.com" style={{ color: "var(--ink)", textDecoration: "none" }}>hello@shaniktanna.com</a></li>
          <li><a href="https://shaniktanna.com" target="_blank" rel="noreferrer" style={{ color: "var(--ink)", textDecoration: "none" }}>shaniktanna.com</a></li>
        </ul>
      </section>
    </div>
  );
}

