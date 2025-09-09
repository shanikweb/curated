import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="brand-mark" aria-hidden>👁️</div>
        <Link to="/" className="sidebar-title">Shanik Tanna</Link>
        <div className="sidebar-sub">Shelf</div>
        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Books</Link>
          <Link to="/movies" className={location.pathname === "/movies" ? "active" : ""}>Movies</Link>
          <Link to="/bookmarks" className={location.pathname === "/bookmarks" ? "active" : ""}>Bookmarks</Link>
          <Link to="/photos" className={location.pathname === "/photos" ? "active" : ""}>Images</Link>
          <div className="nav-divider" aria-hidden="true" />
          <Link to="/tabs" className={location.pathname === "/tabs" ? "active" : ""}>Tabs</Link>
        </nav>
        <div className="sidebar-footer">
          <button className="theme-icon" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
        </div>
      </div>
    </aside>
  );
}
