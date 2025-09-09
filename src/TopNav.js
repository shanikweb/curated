import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./TopNav.css";

export default function TopNav() {
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
    <header className="topnav">
      <div className="topnav-inner">
        <div className="brand">
          <Link className="brand-logo" to="/">
            {(() => {
              const base = process.env.PUBLIC_URL || '';
              const src = theme === 'dark' ? `${base}/logo-dark.png` : `${base}/logo-light.png`;
              return <img src={src} alt="Signal & Frame" />;
            })()}
          </Link>
        </div>

        <nav className="top-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Books</Link>
          <Link to="/movies" className={location.pathname === "/movies" ? "active" : ""}>Films</Link>
          <Link to="/tabs" className={location.pathname === "/tabs" ? "active" : ""}>Tabs</Link>
          <Link to="/photos" className={location.pathname === "/photos" ? "active" : ""}>Photos</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        </nav>

        <button className="mode-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>
      </div>
    </header>
  );
}
