import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import shopService from "../services/ShopService";
import { useCart } from "./CartProvider";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import "../styles/MenuList.css";

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

  // New: fetch from API
  const [shop, setShop] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loadingShop, setLoadingShop] = useState(true);

  const currentUser = authService.getCurrentUser();

  // Load shop and menu from API
  useEffect(() => {
    if (!shopId) return;
    setLoadingShop(true);
    Promise.all([
      shopService.getShop(Number(shopId)),
      shopService.getMenuByShop(Number(shopId)),
    ])
      .then(([shopData, menuData]) => {
        setShop(shopData);
        setMenu(menuData);
      })
      .catch(err => console.error("Failed to load shop/menu:", err))
      .finally(() => setLoadingShop(false));
  }, [shopId]);

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

  if (loadingShop) return (
    <div className="page">
      <Navbar />
      <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--muted)" }}>
        Loading shop...
      </div>
    </div>
  );

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
                          {item.emoji || "🍽️"}
                        </div>
                      </div>
                      <div className="menu-body-card">
                        <div className="menu-name">{item.name}</div>
                        <p className="menu-desc">{item.description || "A delicious campus favorite."}</p>
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
                        {item.emoji || "🍽️"} {item.name}
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