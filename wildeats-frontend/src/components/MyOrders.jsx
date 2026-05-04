import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import orderService from "../services/orderService";
import authService from "../services/authService";
import "../App.css";
import "../styles/MyOrders.css";

const shopsMap = {
  1: { name: "The Canteen", emoji: "🍱" },
  2: { name: "Munchies Corner", emoji: "🧁" },
  3: { name: "Brew & Bites", emoji: "☕" },
  4: { name: "Grill House", emoji: "🍢" },
  5: { name: "Noodle Bar", emoji: "🍜" },
  6: { name: "Sip & Chill", emoji: "🧋" },
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await orderService.getByUser(currentUser.id);
        // Sort orders by newest first (descending by ID or createdAt)
        setOrders(data.sort((a, b) => b.id - a.id));
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="page">
      <Navbar />

      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        <p className="orders-sub">Track your recent food orders</p>

        {loading ? (
          <div className="empty-orders">
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No orders yet 🍽️</h3>
            <p>Start ordering your favorite meals!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const shopInfo = shopsMap[order.shopId] || { name: `Shop #${order.shopId}`, emoji: "🏪" };

              return (
                <div key={order.id} className="order-card">
                  {/* HEADER */}
                  <div className="order-header">
                    <div className="order-shop">
                      <span className="order-emoji">{shopInfo.emoji}</span>
                      <div>
                        <h3>{shopInfo.name}</h3>
                        <p>{formatDate(order.createdAt)}</p>
                      </div>
                    </div>

                    <span className={`order-status ${(order.status || "PENDING").toLowerCase()}`}>
                      {order.status || "PENDING"}
                    </span>
                  </div>

                  {/* ITEMS */}
                  <div className="order-items">
                    {order.items?.map((item, i) => (
                      <div key={i} className="order-item">
                        <span>{item.itemName} x{item.quantity}</span>
                        <span>₱{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="order-footer">
                    <strong>Total: ₱{order.total}</strong>
                    <button className="reorder-btn" onClick={() => navigate(`/menu-list/${order.shopId}`)}>
                      Order Again
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}