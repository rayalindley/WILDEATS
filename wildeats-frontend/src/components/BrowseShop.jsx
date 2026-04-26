import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "../styles/BrowseShop.css";
const shops = [
  { id:1, name:"The Canteen", cuisine:"Rice Meals · All-Day", description:"Your go-to for hearty Filipino comfort food. Hot meals served fresh every day.", emoji:"🍱", rating:4.8, reviewCount:312, deliveryTime:"10–15 min", isOpen:true, tag:"Best Seller", priceRange:"₱40–₱120", category:"Rice Meals", location:"Building A, Ground Floor" },
  { id:2, name:"Munchies Corner", cuisine:"Snacks · Kakanin · Drinks", description:"Affordable snacks and local sweets perfect for those in-between class cravings.", emoji:"🧁", rating:4.7, reviewCount:198, deliveryTime:"5–10 min", isOpen:true, tag:"Student Fave", priceRange:"₱15–₱60", category:"Snacks", location:"Building B, Lobby" },
  { id:3, name:"Brew & Bites", cuisine:"Coffee · Sandwiches · Pastries", description:"Artisan coffee and fresh sandwiches to power through your study sessions.", emoji:"☕", rating:4.9, reviewCount:445, deliveryTime:"8–12 min", isOpen:true, tag:"Top Rated", priceRange:"₱35–₱120", category:"Café", location:"Library Building, G/F" },
  { id:4, name:"Grill House", cuisine:"BBQ · Isaw · Ihaw-Ihaw", description:"Classic Filipino street grill favorites. Perfectly charred, always satisfying.", emoji:"🍢", rating:4.6, reviewCount:267, deliveryTime:"15–20 min", isOpen:true, tag:"Open Late", priceRange:"₱10–₱80", category:"Grill", location:"Back Court Area" },
  { id:5, name:"Noodle Bar", cuisine:"Mami · Pansit · Lugaw", description:"Warm noodle soups and stir-fries that hit different on a long school day.", emoji:"🍜", rating:4.5, reviewCount:153, deliveryTime:"10–18 min", isOpen:false, tag:"Opens 10AM", priceRange:"₱35–₱95", category:"Noodles", location:"Covered Court, Stall 3" },
  { id:6, name:"Sip & Chill", cuisine:"Milk Tea · Fruit Shakes · Soda", description:"Cold drinks for hot days. Build your own milk tea or grab a fresh shake.", emoji:"🧋", rating:4.7, reviewCount:389, deliveryTime:"5–10 min", isOpen:true, tag:"Fan Favorite", priceRange:"₱30–₱85", category:"Drinks", location:"Building C, G/F" },
];

const CATS = ["All","Rice Meals","Snacks","Café","Grill","Noodles","Drinks"];


function Stars({ r }) {
  return <span className="stars">{"★".repeat(Math.floor(r))}{r%1>=.5?"½":""} <span className="rev">({r}) · {shops.find(s=>s.rating===r)?.reviewCount || ""} reviews</span></span>;
}

export default function BrowseStalls() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => shops.filter(s => {
    const ms = s.name.toLowerCase().includes(search.toLowerCase()) || s.cuisine.toLowerCase().includes(search.toLowerCase());
    const mc = cat === "All" || s.category === cat;
    const mo = !openOnly || s.isOpen;
    return ms && mc && mo;
  }), [search, cat, openOnly]);

  const openCount = shops.filter(s => s.isOpen).length;
  const navigate = useNavigate();

  const handleView = (shop) => {
    if (!shop.isOpen) return;
    navigate(`/menu-list/${shop.id}`, { state: { shop } });
  };

  return (
    <>
      {toast && (
        <div style={{position:'fixed',top:80,left:'50%',transform:'translateX(-50%)',background:'#1C1C1C',color:'#fff',padding:'12px 24px',borderRadius:12,fontWeight:600,fontSize:'.88rem',zIndex:9999,boxShadow:'0 8px 28px rgba(0,0,0,.25)',whiteSpace:'nowrap'}}>
          {toast}
        </div>
      )}
      <div className="page">

        <Navbar />

        {/* BROWSE HEADER */}
        <div className="browse-header">
          <div className="container">
            <div className="bh-inner">
              <div>
                <div className="bh-eyebrow">🐾 On Campus</div>
                <h1 className="bh-title">Browse Stalls</h1>
                <p className="bh-sub">
                  <span className="open-dot" />
                  {openCount} stalls open right now
                </p>
              </div>
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  placeholder="Search stalls or cuisine…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
              </div>
            </div>

            <div className="filter-bar">
              <div className="cats">
                {CATS.map(c => (
                  <button key={c} className={`cat-pill${cat===c?" on":""}`} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
              <div className="toggle-wrap" onClick={() => setOpenOnly(!openOnly)}>
                <div className={`toggle${openOnly?" on":""}`}><div className="thumb" /></div>
                <span className="t-label">Open only</span>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="browse-body">
          <div className="container">
            <p className="result-count">
              {filtered.length === 0 ? "No stalls found" : `${filtered.length} stall${filtered.length!==1?"s":""} found`}
            </p>

            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🍽️</div>
                <h3 className="empty-title">No stalls match your search</h3>
                <p className="empty-sub">Try a different keyword or reset the filters.</p>
                <button className="btn btn-outline" style={{width:'auto',marginTop:8}} onClick={() => { setSearch(""); setCat("All"); setOpenOnly(false); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid">
                {filtered.map(shop => (
                  <div key={shop.id} className={`stall-card${!shop.isOpen?" closed":""}`} onClick={() => handleView(shop)}>
                    <div className="stall-cover">
                      {!shop.isOpen && <div className="closed-overlay">Closed</div>}
                      <span className="badge">{shop.tag}</span>
                      <div className="stall-emoji">{shop.emoji}</div>
                    </div>
                    <div className="stall-body">
                      <div className="stall-top">
                        <div>
                          <div className="stall-name">{shop.name}</div>
                          <div className="stall-cuisine">{shop.cuisine}</div>
                        </div>
                        <span className={`status ${shop.isOpen?"s-open":"s-closed"}`}>
                          {shop.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <p className="stall-desc">{shop.description}</p>
                      <div>
                        <span className="stars">{"★".repeat(Math.floor(shop.rating))}{shop.rating%1>=.5?"½":""}</span>
                        <span className="rev"> {shop.rating} · {shop.reviewCount} reviews</span>
                      </div>
                      <div className="pills">
                        <span className="pill">🕐 {shop.deliveryTime}</span>
                        <span className="pill">📍 {shop.location}</span>
                        <span className="pill pill-price">{shop.priceRange}</span>
                      </div>
                      <button
                        className={`btn ${shop.isOpen?"btn-red":"btn-dis"}`}
                        disabled={!shop.isOpen}
                        onClick={e => { e.stopPropagation(); handleView(shop); }}
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
    </>
  );
}