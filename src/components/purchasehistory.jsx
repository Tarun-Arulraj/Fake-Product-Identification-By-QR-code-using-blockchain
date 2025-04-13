import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import ProductSaleRegistry from '../contracts/ProductSaleRegistry.json';
import ProductRegistry from '../contracts/ProductRegistry.json';
import '../styles/purchasehistory.css';

const PurchaseHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const saleRegistryAddress = '0xB2B66b3c3cc06DF1e919e9d6320d927d5FDdf1cC';
  const productRegistryAddress = '0xA38E5b4D68E3716291fe1Bfa84ec7336d780F6B7';

  const sampleSerials = ['1', '2', 'SN003'];  // Replace with serials you want to check.

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!window.ethereum) {
        alert('Please install MetaMask.');
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const saleContract = new web3.eth.Contract(ProductSaleRegistry.abi, saleRegistryAddress);
        const productContract = new web3.eth.Contract(ProductRegistry.abi, productRegistryAddress);

        const detailedTransactions = await Promise.all(
          sampleSerials.map(async (serial) => {
            const product = await productContract.methods.getProduct(serial).call();
            const sale = await saleContract.methods.getSale(serial).call();

            return {
              serialNumber: serial,
              productName: product[1],
              productBrand: product[3],
              price: product[4],
              manufacturerID: product[0],
              status: sale.exists ? 'completed' : 'available',
              seller: sale.exists ? sale.seller : 'N/A',
              buyer: sale.exists ? sale.buyer : 'N/A',
              date: sale.exists ? sale.date : 'N/A'
            };
          })
        );

        setTransactions(detailedTransactions);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch data from blockchain.');
      }
    };

    fetchTransactionData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge completed">Completed</span>;
      case 'available':
        return <span className="status-badge available">Available</span>;
      default:
        return <span className="status-badge">Unknown</span>;
    }
  };

  const userAddress = '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b';

  return (
    <div className="purchase-history">
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
            <div></div><div></div><div></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1 className="page-header">Purchase History</h1>

        <div className="transaction-list">
          {transactions.length === 0 ? (
            <p>Loading purchase history from blockchain...</p>
          ) : (
            transactions.map((txn, index) => (
              <div key={index} className="transaction-card">
                <div className="transaction-header">
                  <div className="product-name">{txn.productName} ({txn.productBrand})</div>
                  <div className="transaction-date">{txn.date}</div>
                </div>
                <div className="transaction-details">
                  <div className="detail-item"><span>Serial:</span><span>{txn.serialNumber}</span></div>
                  <div className="detail-item"><span>Price:</span><span>{txn.price}</span></div>
                  <div className="detail-item"><span>Seller:</span><span>{txn.seller}</span></div>
                  <div className="detail-item"><span>Buyer:</span><span>{txn.buyer}</span></div>
                  <div className="detail-item"><span>Status:</span>{getStatusBadge(txn.status)}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="address-section">
          <div className="address-label">Blockchain Address:</div>
          <div className="address-value">{userAddress}</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
