import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import BooksFromLiteral from "./BooksFromLiteral";
import TabsPage from "./TabsPage";
import MoviesPage from "./MoviesPage";
import BookmarksPage from "./BookmarksPage";
import PhotosPage from "./PhotosPage";

export default function App() {
  return (
    <Router>
      <div className="app-shell" style={{ display: "flex", minHeight: "100vh", background: "#faf7f2" }}>
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
