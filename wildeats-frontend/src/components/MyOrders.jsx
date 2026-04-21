import { useState } from "react";
import Navbar from "./NavBar";
import "../App.css";
import "../styles/MyOrders.css";

const ordersData = [
  {
    id: 1,
    shop: "Brew & Bites",
    emoji: "☕",
    items: [
      { name: "Latte", qty: 1, price: 90 },
      { name: "Sandwich", qty: 2, price: 120 }
    ],
    status: "Delivered",
    date: "April 7, 2026",
    total: 330
  },
  {
    id: 2,
    shop: "Grill House",
    emoji: "🍢",
    items: [
      { name: "Isaw", qty: 5, price: 10 },
      { name: "BBQ", qty: 2, price: 25 }
    ],
    status: "Preparing",
    date: "April 8, 2026",
    total: 100
  },
  {
    id: 3,
    shop: "Munchies Corner",
    emoji: "🧁",
    items: [
      { name: "Kakanin", qty: 3, price: 20 }
    ],
    status: "Pending",
    date: "April 8, 2026",
    total: 60
  }
];

export default function MyOrders() {
  const [orders] = useState(ordersData);

  return (
    <div className="page">
      <Navbar />

      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        <p className="orders-sub">Track your recent food orders</p>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No orders yet 🍽️</h3>
            <p>Start ordering your favorite meals!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">

                {/* HEADER */}
                <div className="order-header">
                  <div className="order-shop">
                    <span className="order-emoji">{order.emoji}</span>
                    <div>
                      <h3>{order.shop}</h3>
                      <p>{order.date}</p>
                    </div>
                  </div>

                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <span>{item.name} x{item.qty}</span>
                      <span>₱{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="order-footer">
                  <strong>Total: ₱{order.total}</strong>
                  <button className="reorder-btn">Reorder</button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}