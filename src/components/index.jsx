import React, { useState } from 'react';
import '../styles/index.css'; // We'll create this CSS file separately

const Index = () => {
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
            <a href="/" className="active">Home</a>
            <a href="/manufacturer">Manufacturer</a>
            <a href="/seller">Seller</a>
            <a href="/consumer">Consumer</a>
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
        <p id="head">Blockchain-Powered Product Authentication</p>
        <p>Secure your supply chain and verify product authenticity using decentralized blockchain technology</p>
        <a href="/manufacturer" className="cta-button">
          About Us
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <a href="/manufacturer" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>Manufacturer Portal</h3>
              <p>Securely register products on the blockchain and manage your digital product passports</p>
            </div>
          </a>
          
          <a href="/seller" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Seller Portal</h3>
              <p>Validate your inventory and provide transparent product history to customers</p>
            </div>
          </a>
          
          <a href="/consumer" className="feature-link">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 8l-8 8M8 8l8 8"></path>
                </svg>
              </div>
              <h3>Consumer Portal</h3>
              <p>Instant product verification using blockchain records to ensure authenticity</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;