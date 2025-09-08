import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-title">Shanik Tanna</div>
        <nav>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Books</Link>
          <Link to="/tabs" className={location.pathname === "/tabs" ? "active" : ""}>Tabs</Link>
        </nav>
        <div className="sidebar-footer">
          <span>creative producer &amp; community builder</span>
        </div>
      </div>
    </aside>
  );
}
