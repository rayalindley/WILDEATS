import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import shops from "../data/shops.json";
import "../styles/BrowseShop.css";
import "../App.css";

const CATEGORIES = ["All", "Rice Meals", "Snacks", "Café", "Grill", "Noodles", "Drinks"];

function StarRating({ rating }) {
  return (
    <span className="star-rating">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="star-count">({rating})</span>
    </span>
  );
}

function BrowseShop() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const filtered = useMemo(() => {
    return shops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.cuisine.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || shop.category === category;
      const matchesOpen = !showOpenOnly || shop.isOpen;
      return matchesSearch && matchesCategory && matchesOpen;
    });
  }, [search, category, showOpenOnly]);

  const openCount = shops.filter((s) => s.isOpen).length;

  return (
    <div className="page">
      <Navbar />

      {/* PAGE HEADER */}
      <div className="browse-header">
        <div className="container">
          <div className="browse-header__inner">
            <div>
              <div className="browse-header__eyebrow">🐾 On Campus</div>
              <h1 className="browse-header__title">Browse Stalls</h1>
              <p className="browse-header__sub">
                <span className="open-dot" /> {openCount} stalls open right now
              </p>
            </div>

            {/* SEARCH */}
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search stalls or cuisine…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
          </div>

          {/* FILTERS */}
          <div className="filter-bar">
            <div className="filter-bar__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill ${category === cat ? "cat-pill--active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="toggle-wrap">
              <div
                className={`toggle ${showOpenOnly ? "toggle--on" : ""}`}
                onClick={() => setShowOpenOnly(!showOpenOnly)}
              >
                <div className="toggle-thumb" />
              </div>
              <span className="toggle-label">Open only</span>
            </label>
          </div>
        </div>
      </div>

      {/* STALL GRID */}
      <div className="browse-body section">
        <div className="container">
          {/* Result count */}
          <p className="result-count">
            {filtered.length === 0
              ? "No stalls found"
              : `${filtered.length} stall${filtered.length > 1 ? "s" : ""} found`}
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">🍽️</div>
              <h3 className="empty-state__title">No stalls match your search</h3>
              <p className="empty-state__sub">Try a different keyword or reset the filters.</p>
              <button
                className="btn btn-outline"
                onClick={() => { setSearch(""); setCategory("All"); setShowOpenOnly(false); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid g3">
              {filtered.map((shop) => (
                <div
                  key={shop.id}
                  className={`card stall-card ${!shop.isOpen ? "stall-card--closed" : ""}`}
                  onClick={() => shop.isOpen && navigate(`/menu-list/${shop.id}`)}
                  title={!shop.isOpen ? "This stall is currently closed" : ""}
                >
                  {/* Cover */}
                  <div className="stall-cover">
                    {!shop.isOpen && <div className="stall-closed-overlay">Closed</div>}
                    <span className="stall-badge">{shop.tag}</span>
                    <div className="stall-emoji">{shop.emoji}</div>
                  </div>

                  {/* Body */}
                  <div className="stall-body">
                    <div className="stall-body__top">
                      <div>
                        <h3 className="stall-name">{shop.name}</h3>
                        <p className="stall-cuisine">{shop.cuisine}</p>
                      </div>
                      <div className={`stall-status ${shop.isOpen ? "stall-status--open" : "stall-status--closed"}`}>
                        {shop.isOpen ? "Open" : "Closed"}
                      </div>
                    </div>

                    <p className="stall-desc">{shop.description}</p>

                    <div className="stall-meta">
                      <span className="meta-item">
                        <StarRating rating={shop.rating} />
                        <span className="meta-reviews">· {shop.reviewCount} reviews</span>
                      </span>
                    </div>

                    <div className="stall-pills">
                      <span className="mpill">🕐 {shop.deliveryTime}</span>
                      <span className="mpill">📍 {shop.location}</span>
                      <span className="mpill mpill-price">{shop.priceRange}</span>
                    </div>

                    <button
                      className={`btn btn-full ${shop.isOpen ? "btn-red" : "btn-disabled"}`}
                      disabled={!shop.isOpen}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (shop.isOpen) navigate(`/menu-list/${shop.id}`);
                      }}
                    >
                      {shop.isOpen ? "View Menu →" : "Currently Closed"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseShop;