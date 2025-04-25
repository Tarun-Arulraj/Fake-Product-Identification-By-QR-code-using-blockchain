import React, { useState } from 'react';
import '../styles/consumer.css'; // We'll create this CSS file separately

const Consumer = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className="app">
      {/* Modern Navigation */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="/" className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
            ChainVerify
          </a>
          <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
            <a href="/">Home</a>
            <a href="/manufacturer">Manufacturer</a>
            <a href="/seller">Seller</a>
            <a href="/consumer" className="active">Consumer</a>
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
        <p id="head">Consumer Portal</p>
        <p>Verify product authenticity and view your purchase history securely using blockchain technology</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          {/* <a href="/consumer/purchasehistory" className="feature-card">
            <div className="feature-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Purchase History</h3>
            <p>View your complete blockchain-verified purchase history</p>
          </a> */}

          <a href="/consumer/verifyProducts" className="feature-card">
            <div className="feature-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8l-8 8M8 8l8 8"></path>
              </svg>
            </div>
            <h3>Product Verification</h3>
            <p>Instantly verify product authenticity using blockchain records</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Consumer;