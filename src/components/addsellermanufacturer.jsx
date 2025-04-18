import Web3 from 'web3';
import SellerRegistry from '../contracts/SellerRegistry.json';
import React, { useState } from 'react';
import '../styles/addsellermanufacturer.css'; // We'll create this CSS file separately

const AddSellerManufacturer = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerBrand: '',
    sellerCode: '',
    sellerPhone: '',
    sellerManager: '',
    sellerAddress: '',
    manufacturerID: ''
  });

  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(
      SellerRegistry.abi,
      '0xC8182514889D9462C65a5A7584485D59cC09BEb1' //DEPLOYED SellerRegistry contract address
    );

    const {
      sellerName, sellerBrand, sellerCode,
      sellerPhone, sellerManager, sellerAddress, manufacturerID
    } = formData;

    await contract.methods
      .registerSeller(
        sellerName,
        sellerBrand,
        sellerCode,
        sellerPhone,
        sellerManager,
        sellerAddress,
        manufacturerID
      )
      .send({ from: accounts[0] });

    alert('✅ Seller registered on blockchain!');

    // RESET FORM HERE
    setFormData({
      sellerName: '',
      sellerBrand: '',
      sellerCode: '',
      sellerPhone: '',
      sellerManager: '',
      sellerAddress: '',
      manufacturerID: ''
    });

  } catch (error) {
    console.error('❌ ERROR:', error);
    alert('Transaction Error: ' + (error?.message || 'Unexpected error.'));
  }
};


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
            <a href="/manufacturer" className="active">Manufacturer</a>
            <a href="/seller" >Seller</a>
            <a href="/consumer">Consumer</a>
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
        <h2>Register New Seller</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-wrapper">
                <label htmlFor="sellerName">Seller Name</label>
                <input 
                  type="text" 
                  id="sellerName" 
                  value={formData.sellerName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="sellerBrand">Brand</label>
                <input 
                  type="text" 
                  id="sellerBrand" 
                  value={formData.sellerBrand}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper">
                <label htmlFor="sellerCode">Seller Code</label>
                <input 
                  type="text" 
                  id="sellerCode" 
                  value={formData.sellerCode}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="sellerPhone">Phone Number</label>
                <input 
                  type="tel" 
                  id="sellerPhone" 
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  required 
                  pattern="[0-9]{10}"
                  title="Phone number should be 10 digits"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper">
                <label htmlFor="sellerManager">Manager</label>
                <input 
                  type="text" 
                  id="sellerManager" 
                  value={formData.sellerManager}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="sellerAddress">Address</label>
                <textarea 
                  id="sellerAddress" 
                  value={formData.sellerAddress}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper">
                <label htmlFor="manufacturerID">Manufacturer ID</label>
                <input 
                  type="text" 
                  id="manufacturerID" 
                  value={formData.manufacturerID}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <button type="submit">Register Seller on Blockchain</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSellerManufacturer;