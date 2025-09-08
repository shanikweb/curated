import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Link to="/" className="sidebar-title">Shanik Tanna</Link>
        <div className="sidebar-sub">Curated Picks</div>
        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Books</Link>
          <Link to="/movies" className={location.pathname === "/movies" ? "active" : ""}>Movies</Link>
          <Link to="/bookmarks" className={location.pathname === "/bookmarks" ? "active" : ""}>Bookmarks</Link>
          <Link to="/photos" className={location.pathname === "/photos" ? "active" : ""}>Images</Link>
          <div className="nav-divider" aria-hidden="true" />
          <Link to="/tabs" className={location.pathname === "/tabs" ? "active" : ""}>Tabs</Link>
        </nav>
        <div className="sidebar-footer">
          <span>creative producer &amp; community builder</span>
        </div>
      </div>
    </aside>
  );
}
