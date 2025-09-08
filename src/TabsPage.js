import React from "react";
import { tabs } from "./tabs";

function TabsPage() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Tabs</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tabs.map((tab, i) => (
          <li key={i} style={{ marginBottom: "2rem", background: "#fff", padding: "1rem", borderRadius: "8px", boxShadow: "0 2px 8px #0001" }}>
            <h2>
              <a href={tab.url} target="_blank" rel="noopener noreferrer">{tab.title}</a>
            </h2>
            <p>{tab.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TabsPage;
