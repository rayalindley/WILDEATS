import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = (() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  })();
  const isAdmin = user?.role === "ADMIN";
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <div className="logo-mark">🐾</div>
          <span>Wild<b>Eats</b></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse-shop" className="nav-link">Browse Stalls</Link>
          <Link to="/my-orders" className="nav-link">My Orders</Link>
          <Link to="/cart" className="nav-link">🛒 <span className="cbadge">2</span></Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link" style={{ color: "#F4C522", fontWeight: 800 }}>⚙️ Admin</Link>
          )}
          {isLoggedIn ? (
            <button className="nav-btn" onClick={handleLogout}>Sign Out</button>
          ) : (
            <button className="nav-btn" onClick={() => navigate("/login")}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;