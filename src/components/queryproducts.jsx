import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/queryproducts.css'; // We'll create this CSS file separately

const QueryProducts = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [sellerCode, setSellerCode] = useState('');
  const [inventory, setInventory] = useState([
    {
      id: '#12345',
      serialNumber: 'SN-2023-001',
      productName: 'Premium Smartwatch',
      brand: 'TechBrand X',
      price: '$299.99',
      status: 'available'
    },
    {
      id: '#12346',
      serialNumber: 'SN-2023-002',
      productName: 'Wireless Headphones',
      brand: 'AudioMaster Pro',
      price: '$179.99',
      status: 'sold'
    },
    // Additional inventory items can be added here
  ]);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically fetch inventory data from your blockchain
    console.log('Searching for seller code:', sellerCode);
    // For now, we'll just use the sample data
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="status-badge available">Available</span>;
      case 'sold':
        return <span className="status-badge sold">Sold</span>;
      default:
        return <span className="status-badge">Unknown</span>;
    }
  };

  const userAddress = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b';

  return (
    <div className="query-products">
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

      {/* Main Content */}
      <div className="container">
        <h1 className="page-header">Seller Inventory</h1>

        {/* Search Form */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <div className="input-wrapper">
              <label htmlFor="sellerCode">Seller Identification Code</label>
              <input
                type="text"
                id="sellerCode"
                placeholder="Enter your seller code"
                value={sellerCode}
                onChange={(e) => setSellerCode(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              Load Inventory
            </button>
          </div>
        </form>

        {/* Inventory Table */}
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Serial Number</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.productName}</td>
                  <td>{item.brand}</td>
                  <td>{item.price}</td>
                  <td>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default QueryProducts;