import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./TopNav";
import BooksFromLiteral from "./BooksFromLiteral";
import TabsPage from "./TabsPage";
import MoviesPage from "./MoviesPage";
import BookmarksPage from "./BookmarksPage";
import PhotosPage from "./PhotosPage";
import AboutPage from "./AboutPage";
import "./theme.css";

export default function App() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const theme = stored || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);
  return (
    <Router>
      <div className="app-shell" style={{ minHeight: "100vh" }}>
        <TopNav />
        <main className="main">
          <Routes>
            <Route path="/" element={<BooksFromLiteral />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/tabs" element={<TabsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
