import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCart } from "./CartProvider";
import orderService from "../services/orderService";
import authService from "../services/authService";
import "../styles/Cart.css";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const currentUser = authService.getCurrentUser();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Group cart by shopId (use first shop if mixed)
  const shopId = cart.length > 0 ? (cart[0].shopId || 1) : 1;

  const handleCheckout = async () => {
    if (!currentUser) {
      showToast("Please log in to checkout.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    setPlacing(true);
    try {
      await orderService.checkout({
        userId: currentUser.id,
        shopId,
        total,
        items: cart.map(item => ({
          itemId: item.id,
          itemName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Checkout failed:", err);
      showToast("Checkout failed. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="cart-page">
      <NavBar />

      {/* HEADER */}
      <div className="cart-header">
        <div className="container">
          <div className="cart-header-inner">
            <div className="cart-eyebrow">🛒 Your Order</div>
            <h1 className="cart-title">Cart</h1>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="cart-body">
        <div className="container">

          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <h3 className="cart-empty-title">Your cart is empty</h3>
              <p className="cart-empty-sub">Browse campus stalls and add your favorites!</p>
              <Link to="/browse-shop" className="btn-browse">Browse Stalls 🐾</Link>
            </div>
          ) : (
            <div className="cart-layout">

              {/* ITEMS */}
              <div className="cart-items-section">
                <p className="cart-section-title">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-img">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={e => e.target.style.display = "none"}
                      />
                    </div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">₱{item.price} each</div>
                    </div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                      <span className="qty-num">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <div className="cart-item-total">₱{item.price * item.quantity}</div>
                    <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="cart-summary">
                <div className="summary-title">Order Summary</div>
                <div className="summary-row">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>₱{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Service fee</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₱{total}</span>
                </div>
                <button
                  className="btn-checkout"
                  onClick={() => setShowCheckout(true)}
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </button>
                {!currentUser && (
                  <p style={{ fontSize: ".75rem", color: "var(--muted)", textAlign: "center", marginTop: 10 }}>
                    <Link to="/login" style={{ color: "var(--red)", fontWeight: 600 }}>Log in</Link> to place your order.
                  </p>
                )}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="checkout-overlay" onClick={() => !placing && setShowCheckout(false)}>
          <div className="checkout-modal" onClick={e => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <span className="checkout-modal-title">
                {success ? "Order Placed! 🎉" : "Confirm Order"}
              </span>
              {!success && (
                <button className="checkout-modal-close" onClick={() => setShowCheckout(false)}>✕</button>
              )}
            </div>
            <div className="checkout-modal-body">
              {success ? (
                <div className="checkout-success">
                  <div className="success-icon">🎉</div>
                  <h3 className="success-title">Order Placed Successfully!</h3>
                  <p className="success-sub">
                    Your order has been received. We'll notify you when it's ready for pickup!
                  </p>
                  <button
                    className="btn-confirm"
                    style={{ marginTop: 20 }}
                    onClick={() => { setShowCheckout(false); setSuccess(false); navigate("/my-orders"); }}
                  >
                    View My Orders
                  </button>
                </div>
              ) : (
                <>
                  <div className="checkout-items">
                    {cart.map(item => (
                      <div className="checkout-item-row" key={item.id}>
                        <span>{item.name} x{item.quantity}</span>
                        <span>₱{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-total">
                    <span>Total</span>
                    <span>₱{total}</span>
                  </div>
                  <button
                    className="btn-confirm"
                    onClick={handleCheckout}
                    disabled={placing}
                  >
                    {placing ? "Placing Order..." : "Confirm Order"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}