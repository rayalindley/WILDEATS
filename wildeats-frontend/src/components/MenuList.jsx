import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import menuData from "../data/menu.json";
import { useCart } from "./CartProvider";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import "../styles/MenuList.css";

const shops = [
  { id: 1, name: "The Canteen", emoji: "🍱", cuisine: "Rice Meals · All-Day", tag: "Best Seller" },
  { id: 2, name: "Munchies Corner", emoji: "🧁", cuisine: "Snacks · Kakanin · Drinks", tag: "Student Fave" },
  { id: 3, name: "Brew & Bites", emoji: "☕", cuisine: "Coffee · Sandwiches · Pastries", tag: "Top Rated" },
  { id: 4, name: "Grill House", emoji: "🍢", cuisine: "BBQ · Isaw · Ihaw-Ihaw", tag: "Open Late" },
  { id: 5, name: "Noodle Bar", emoji: "🍜", cuisine: "Mami · Pansit · Lugaw", tag: "Opens 10AM" },
  { id: 6, name: "Sip & Chill", emoji: "🧋", cuisine: "Milk Tea · Fruit Shakes · Soda", tag: "Fan Favorite" },
  { id: 7, name: "Bread & Co", emoji: "🍞", cuisine: "Breads · Pastries · Cakes", tag: "Fresh Daily" },
];

const descriptions = {
  1: "Tender chicken slow-cooked in soy sauce, vinegar, garlic, and bay leaves.",
  2: "Rich and sour pork soup with fresh vegetables and tamarind broth.",
  3: "Crispy golden fried chicken seasoned to perfection. Best paired with rice.",
  4: "Juicy beef steak marinated in calamansi and soy sauce, topped with caramelized onions.",
  5: "Fresh mixed vegetables stir-fried in garlic and oyster sauce.",
  6: "Steaming white rice — the perfect companion to any viand.",
  7: "Creamy coconut milk pudding topped with toasted coconut.",
  8: "Soft and chewy cassava cake with a golden custard topping.",
  9: "Sticky purple rice cake served with butter and grated coconut.",
  10: "Deep-fried caramelized bananas on a stick. Sweet and crunchy.",
  11: "Smooth and creamy classic milk tea with your choice of toppings.",
  12: "Taro-flavored milk tea with a sweet, nutty taste.",
  13: "Chilled brewed coffee sweetened to your taste.",
  14: "Warm espresso with steamed milk. Rich and comforting.",
  15: "Blended chocolate frappe — thick, creamy, and indulgent.",
  16: "Sweet and smoky pork barbecue on a stick, chargrilled to perfection.",
  17: "Inasal-style grilled chicken marinated in lemongrass and annatto.",
  18: "Grilled beef patty with melted cheese on a toasted bun.",
  19: "Grilled tuna belly steak seasoned with garlic and herbs.",
  20: "Sweet cured beef tapa — great for any time of day.",
  21: "Classic street-style fish balls with sweet or spicy sauce.",
  22: "Orange-coated hard-boiled quail eggs, deep-fried with dipping sauce.",
  23: "Chewy squid balls skewered on a stick with your choice of sauce.",
  24: "Caramelized fried bananas on a stick. Sweet and crispy.",
  25: "Crispy banana spring rolls with langka filling.",
  26: "Refreshing wintermelon-flavored milk tea with subtle sweetness.",
  27: "Premium matcha milk tea with a rich, earthy flavor.",
  28: "Creamy Hokkaido-style milk tea with a smooth caramel finish.",
  29: "A trendy blend of strawberry and matcha latte.",
  30: "Freshly baked soft bread rolls. Best enjoyed warm.",
  31: "Fluffy brioche-style bread topped with cheese and sugar.",
  32: "Sweet bread roll with a buttery sugar filling.",
  33: "Rich and moist chocolate cake slice.",
};

const emojiFallback = {
  1: "🍗", 2: "🍲", 3: "🍗", 4: "🥩", 5: "🥦", 6: "🍚",
  7: "🍮", 8: "🍰", 9: "🍡", 10: "🍌",
  11: "🧋", 12: "🧋", 13: "☕", 14: "☕", 15: "🥤",
  16: "🍖", 17: "🍗", 18: "🍔", 19: "🐟", 20: "🥩",
  21: "🐟", 22: "🥚", 23: "🦑", 24: "🍌", 25: "🌯",
  26: "🧋", 27: "🍵", 28: "🧋", 29: "🍓",
  30: "🍞", 31: "🥐", 32: "🍞", 33: "🍫",
};

export default function MenuList() {
  const { shopId } = useParams();
  const { addToCart, cart } = useCart();
  const [activeTab, setActiveTab] = useState("menu");
  const [reviews, setReviews] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const shop = shops.find(s => s.id === Number(shopId));
  const menu = menuData.filter(item => item.shopId === Number(shopId));
  const currentUser = authService.getCurrentUser();

  // Load all reviews for this shop on mount
  useEffect(() => {
    if (!shopId) return;
    setLoadingReviews(true);
    reviewService.getByShop(Number(shopId))
      .then(data => {
        // Group reviews by itemId
        const grouped = {};
        data.forEach(r => {
          if (!grouped[r.itemId]) grouped[r.itemId] = [];
          grouped[r.itemId].push(r);
        });
        setReviews(grouped);
      })
      .catch(err => console.error("Failed to load reviews:", err))
      .finally(() => setLoadingReviews(false));
  }, [shopId]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const isInCart = (id) => cart.some(i => i.id === id);

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`${item.name} added to cart! 🛒`);
  };

  const openReviews = (item) => {
    setSelectedItem(item);
    setNewRating(0);
    setNewComment("");
  };

  const closeModal = () => setSelectedItem(null);

  const getAvgRating = (itemId) => {
    const r = reviews[itemId];
    if (!r || r.length === 0) return null;
    return (r.reduce((sum, rv) => sum + rv.rating, 0) / r.length).toFixed(1);
  };

  const handleSubmitReview = async () => {
    if (!newRating || !newComment.trim()) return;
    setSubmitting(true);
    try {
      const userName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : "Anonymous";

      const saved = await reviewService.submit({
        itemId: selectedItem.id,
        shopId: Number(shopId),
        rating: newRating,
        comment: newComment.trim(),
        userName,
      });

      // Update local state immediately
      setReviews(prev => ({
        ...prev,
        [selectedItem.id]: [...(prev[selectedItem.id] || []), saved],
      }));

      setNewRating(0);
      setNewComment("");
      showToast("Review submitted! Thanks 🎉");
    } catch (err) {
      console.error("Failed to submit review:", err);
      showToast("Failed to submit review. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
  };

  if (!shop) return (
    <div className="page">
      <Navbar />
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: "'Unbounded',sans-serif", color: "var(--red)" }}>Shop not found</h2>
      </div>
    </div>
  );

  return (
    <div className="page">
      <Navbar />

      {/* HEADER */}
      <div className="menu-header">
        <div className="container">
          <div className="mh-inner">
            <div className="mh-emoji">{shop.emoji}</div>
            <div>
              <div className="mh-eyebrow">🐾 Campus Stall</div>
              <h1 className="mh-title">
                {shop.name}
                <span className="mh-tag">{shop.tag}</span>
              </h1>
              <p className="mh-sub">{shop.cuisine} · {menu.length} items available</p>
            </div>
          </div>
          <div className="menu-tabs">
            <button className={`tab${activeTab === "menu" ? " on" : ""}`} onClick={() => setActiveTab("menu")}>
              🍽️ Menu
            </button>
            <button className={`tab${activeTab === "reviews" ? " on" : ""}`} onClick={() => setActiveTab("reviews")}>
              ⭐ All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="menu-body">
        <div className="container">

          {/* MENU TAB */}
          {activeTab === "menu" && (
            <>
              <p className="item-count">{menu.length} item{menu.length !== 1 ? "s" : ""} available</p>
              <div className="menu-grid">
                {menu.map(item => {
                  const avg = getAvgRating(item.id);
                  const reviewCount = (reviews[item.id] || []).length;
                  const added = isInCart(item.id);
                  return (
                    <div className="menu-card" key={item.id}>
                      <div className="menu-img-wrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="menu-img"
                          onError={e => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="menu-img-fallback" style={{ display: "none" }}>
                          {emojiFallback[item.id] || "🍽️"}
                        </div>
                      </div>
                      <div className="menu-body-card">
                        <div className="menu-name">{item.name}</div>
                        <p className="menu-desc">{descriptions[item.id] || "A delicious campus favorite."}</p>
                        <div className="menu-footer">
                          <div>
                            <div className="menu-price">₱{item.price}</div>
                            {avg ? (
                              <div className="review-mini">
                                <span className="star-gold">★</span>
                                {avg} ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
                              </div>
                            ) : (
                              <div className="review-mini">No reviews yet</div>
                            )}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                            <button
                              className={added ? "btn-added" : "btn-add"}
                              onClick={() => handleAddToCart(item)}
                            >
                              {added ? "✓ Added" : "+ Add"}
                            </button>
                            <button
                              onClick={() => openReviews(item)}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: ".72rem", color: "var(--red)", fontWeight: 600, textDecoration: "underline" }}
                            >
                              {reviewCount > 0 ? `${reviewCount} review${reviewCount !== 1 ? "s" : ""}` : "Add review"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ALL REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div style={{ maxWidth: 600 }}>
              <p className="item-count">All reviews for {shop.name}</p>
              {loadingReviews ? (
                <div className="loading">Loading reviews...</div>
              ) : menu.every(item => (reviews[item.id] || []).length === 0) ? (
                <div className="no-reviews">No reviews yet for this stall. Be the first! 🌟</div>
              ) : (
                menu.map(item => {
                  const itemReviews = reviews[item.id] || [];
                  if (itemReviews.length === 0) return null;
                  return (
                    <div key={item.id} style={{ marginBottom: 32 }}>
                      <h3 style={{ fontFamily: "'Unbounded',sans-serif", fontSize: ".85rem", fontWeight: 900, color: "var(--text)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                        {emojiFallback[item.id]} {item.name}
                        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: ".72rem", color: "var(--muted)" }}>
                          ({itemReviews.length} review{itemReviews.length !== 1 ? "s" : ""})
                        </span>
                      </h3>
                      <div className="reviews-list">
                        {itemReviews.map(r => (
                          <div className="review-card" key={r.id}>
                            <div className="review-top">
                              <span className="review-user">{r.userName}</span>
                              <span className="review-date">{formatDate(r.createdAt)}</span>
                            </div>
                            <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                            <p className="review-comment">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>
      </div>

      {/* REVIEW MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Reviews — {selectedItem.name}</span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-body">

              {/* Existing Reviews */}
              {(reviews[selectedItem.id] || []).length === 0 ? (
                <div className="no-reviews">No reviews yet. Be the first! 🌟</div>
              ) : (
                <div className="reviews-list">
                  {(reviews[selectedItem.id] || []).map(r => (
                    <div className="review-card" key={r.id}>
                      <div className="review-top">
                        <span className="review-user">{r.userName}</span>
                        <span className="review-date">{formatDate(r.createdAt)}</span>
                      </div>
                      <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                      <p className="review-comment">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write a Review */}
              <div className="review-form-title">
                {currentUser ? `Review as ${currentUser.firstName}` : "Write a Review"}
              </div>

              <div className="star-picker">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} className="star-btn" onClick={() => setNewRating(n)}>
                    {n <= newRating ? "★" : "☆"}
                  </button>
                ))}
                {newRating > 0 && (
                  <span style={{ fontSize: ".8rem", color: "var(--muted)", alignSelf: "center", marginLeft: 4 }}>
                    {["", "Awful", "Poor", "Okay", "Good", "Excellent!"][newRating]}
                  </span>
                )}
              </div>

              <textarea
                className="review-input"
                placeholder="Share your experience..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />

              {!currentUser && (
                <p style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: 12 }}>
                  💡 <a href="/login" style={{ color: "var(--red)", fontWeight: 600 }}>Log in</a> to post reviews with your name.
                </p>
              )}

              <button
                className="btn-submit"
                onClick={handleSubmitReview}
                disabled={!newRating || !newComment.trim() || submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}