import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="home-container">
      {/* ✅ Hero / Search Section */}
      <div className="hero-section">
        <h1 className="hero-title">Explore Blogs</h1>
        <p className="hero-subtitle">
          Read stories, share thoughts & engage with writers
        </p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search blogs"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
      </div>
    </div>
  );
}
