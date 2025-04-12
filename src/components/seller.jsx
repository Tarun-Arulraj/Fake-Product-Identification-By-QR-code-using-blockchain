import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/seller.css'; // We'll create this CSS file separately

const SellerPortal = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className="seller-portal">
      {/* Modern Navigation */}
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            ChainVerify
          </Link>
          <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/manufacturer">Manufacturer</Link>
            <Link to="/seller" className="active">Seller</Link>
            <Link to="/consumer">Consumer</Link>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Seller Portal</h1>
        <p>Manage your product sales and inventory through blockchain technology</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <Link to="/seller/seller-portal" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Sell Products</h3>
              <p>Record product sales to consumers with blockchain verification</p>
            </div>
          </Link>

          <Link to="/seller/view-inventory" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3>View Inventory</h3>
              <p>Check your current product inventory and sales history</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SellerPortal;