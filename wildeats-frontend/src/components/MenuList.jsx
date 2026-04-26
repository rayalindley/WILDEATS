import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import menuData from "../data/menu.json";
import { useCart } from "./CartProvider";

import "../styles/MenuList.css";

function MenuList() {
  const { shopId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("menu");
  const [toast, setToast] = useState(null);
  
  // Using shop data passed via state, or a fallback if navigated directly
  const shop = location.state?.shop || {
    id: shopId,
    name: "Stall " + shopId,
    description: "Welcome to our stall! Check out our menu below.",
    rating: 4.5,
    reviewCount: 120
  };

  const menu = menuData.filter(item => item.shopId === Number(shopId));

  const initialReviews = [
    { id: 1, author: "Alex S.", date: "2 days ago", rating: 5, text: "The food here is consistently amazing! Always hot and fresh. My go-to spot between classes." },
    { id: 2, author: "Maria T.", date: "1 week ago", rating: 4, text: "Great portions for the price. The line can get long during lunch but it moves fast." },
    { id: 3, author: "John D.", date: "2 weeks ago", rating: 5, text: "Best value on campus. Highly recommended!" }
  ];

  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddToCart = (item) => {
    addToCart(item);
    setToast(`Added ${item.name} to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const handleReviewSubmit = () => {
    if (!newReviewText.trim()) {
      setToast("Please write something for your review!");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    const newReview = {
      id: Date.now(),
      author: "You",
      date: "Just now",
      rating: newReviewRating,
      text: newReviewText
    };
    setReviews([newReview, ...reviews]);
    setNewReviewText("");
    setNewReviewRating(5);
    setToast("Review submitted successfully!");
    setTimeout(() => setToast(null), 2000);
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

        <div className="shop-header">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <button className="back-btn" onClick={() => navigate('/browse-shop')}>
              ← Back to Stalls
            </button>
            <h1 className="sh-title">{shop.name}</h1>
            <p className="sh-desc">{shop.description}</p>
            <div className="sh-meta">
              <span>⭐ {shop.rating} ({shop.reviewCount} Reviews)</span>
              {shop.cuisine && <span>🍽️ {shop.cuisine}</span>}
              {shop.location && <span>📍 {shop.location}</span>}
            </div>
          </div>
        </div>

        <div className="tabs-wrap">
          <div className="container">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Menu
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
        </div>

        <div className="content-area">
          <div className="container">
            {activeTab === 'menu' && (
              <div className="menu-grid">
                {menu.length === 0 ? (
                  <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6E6E6E'}}>
                    <h3>No menu items available for this stall.</h3>
                  </div>
                ) : (
                  menu.map(item => (
                    <div key={item.id} className="menu-card">
                      <h3 className="mc-name">{item.name}</h3>
                      <p className="mc-price">₱{item.price}</p>
                      <button className="add-btn" onClick={() => handleAddToCart(item)}>
                        + Add to Cart
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-section">
                <div className="write-review">
                  <h3>Write a Review</h3>
                  <div className="star-select">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star-btn ${star <= newReviewRating ? 'on' : ''}`}
                        onClick={() => setNewReviewRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea 
                    rows="3" 
                    placeholder="Share your experience..." 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                  ></textarea>
                  <button className="submit-btn" onClick={handleReviewSubmit}>Submit Review</button>
                </div>
                
                <h3 style={{fontFamily: "'Unbounded', sans-serif", marginBottom: 20}}>Customer Reviews</h3>
                {reviews.map(r => (
                  <div key={r.id} className="review-card">
                    <div className="rc-head">
                      <span className="rc-author">{r.author}</span>
                      <span className="rc-date">{r.date}</span>
                    </div>
                    <div className="rc-rating">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                    <p className="rc-text">{r.text}</p>
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

export default MenuList;