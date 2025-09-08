import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import BooksFromLiteral from "./BooksFromLiteral";
import TabsPage from "./TabsPage";
import MoviesPage from "./MoviesPage";
import BookmarksPage from "./BookmarksPage";
import PhotosPage from "./PhotosPage";
import "./theme.css";

export default function App() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }, []);
  return (
    <Router>
      <div className="app-shell" style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<BooksFromLiteral />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/tabs" element={<TabsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
