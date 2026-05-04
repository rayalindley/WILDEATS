import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
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
          <button className="nav-btn" onClick={handleLogout}>Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;