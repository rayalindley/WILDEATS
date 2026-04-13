import React from "react";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="home-container">
        <div className="home-hero">
          <h1 className="home-title">Welcome to WILDEATS</h1>
          <p className="home-subtitle">
            Order your favorite meals from campus stalls — fast and easy.
          </p>

          <button 
            className="btn btn-pink home-btn"
            onClick={() => navigate("/browse")}
          >
            Browse Shops
          </button>
        </div>

        {/* FEATURES SECTION */}
        <div className="home-features">

          <div className="card feature-card">
            <h3 className="text-pink">🍽 Browse Shops</h3>
            <p className="text-muted">
              Explore different food stalls and menus available on campus.
            </p>
          </div>

          <div className="card feature-card">
            <h3 className="text-pink">🛒 Easy Ordering</h3>
            <p className="text-muted">
              Add items to your cart and place orders in just a few clicks.
            </p>
          </div>

          <div className="card feature-card">
            <h3 className="text-pink">📦 Track Orders</h3>
            <p className="text-muted">
              Monitor your order status in real-time from preparation to pickup.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Home;