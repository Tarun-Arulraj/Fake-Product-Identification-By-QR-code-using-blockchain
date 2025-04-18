import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/manufacturer.css'; // We'll create this CSS file separately

const Manufacturer = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className="manufacturer-portal">
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
            <Link to="/manufacturer" className="active">Manufacturer</Link>
            <Link to="/seller">Seller</Link>
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
        <p id="head">Manufacturer Portal</p>
        <p>Manage your products, sellers, and transactions securely using blockchain technology.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <Link to="/manufacturer/add-product" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Add Product to Blockchain</h3>
              <p>Register new products on the blockchain to ensure authenticity and traceability.</p>
            </div>
          </Link>

          <Link to="/manufacturer/add-seller" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                </svg>
              </div>
              <h3>Add Seller</h3>
              <p>Authorize sellers to distribute your products with secure blockchain records.</p>
            </div>
          </Link>

          <Link to="/manufacturer/sell-product" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Sell Product to Seller</h3>
              <p>Transfer products to sellers with transparent and immutable blockchain transactions.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Manufacturer;