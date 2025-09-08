import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import BooksFromLiteral from "./BooksFromLiteral";
import TabsPage from "./TabsPage";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh", background: "#faf7f2" }}>
        <Sidebar />
        <main style={{ marginLeft: 260, flex: 1 }}>
          <Routes>
            <Route path="/" element={<BooksFromLiteral />} />
            <Route path="/tabs" element={<TabsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
