import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/purchasehistory.css'; // We'll create this CSS file separately

const PurchaseHistory = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      productName: 'Premium Smartwatch',
      date: '2023-07-20',
      price: '$299.99',
      seller: 'TechStore Official',
      status: 'completed'
    },
    {
      id: 2,
      productName: 'Wireless Headphones',
      date: '2023-07-18',
      price: '$179.99',
      seller: 'AudioWorld',
      status: 'pending'
    },
    // Add more transactions as needed
  ];

  const userAddress = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      case 'pending':
        return <span className="status-badge pending">Pending</span>;
      case 'failed':
        return <span className="status-badge failed">Failed</span>;
      default:
        return <span className="status-badge">Unknown</span>;
    }
  };

  return (
    <div className="purchase-history">
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
            <Link to="/seller">Seller</Link>
            <Link to="/consumer" className="active">Consumer</Link>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h1 className="page-header">Purchase History</h1>
        
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header">
                <div className="product-name">{transaction.productName}</div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className="transaction-details">
                <div className="detail-item">
                  <span>Price:</span>
                  <span>{transaction.price}</span>
                </div>
                <div className="detail-item">
                  <span>Seller:</span>
                  <span>{transaction.seller}</span>
                </div>
                <div className="detail-item">
                  <span>Status:</span>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Address Section */}
        <div className="address-section">
          <div className="address-label">Blockchain Address:</div>
          <div className="address-value">{userAddress}</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;