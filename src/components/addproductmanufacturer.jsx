import Web3 from 'web3';
import ProductRegistry from '../contracts/ProductRegistry.json';
import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles/addproductmanufacturer.css';

const AddProductManufacturer = () => {
  const [formData, setFormData] = useState({
    manufacturerID: '',
    productName: '',
    productSN: '',
    productBrand: '',
    productPrice: ''
  });
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const qrRef = useRef(null);

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
        ProductRegistry.abi,
        '0xcc03F57c77440114Ed4E191a22Cc1FbF20b77319' //DEPLOYED ADDRESS HERE
      );
  
      const { manufacturerID, productName, productSN, productBrand, productPrice } = formData;
  
      // Check if product already exists
      const existing = await contract.methods.getProduct(productSN).call();
      if (existing && existing[2]) {
        alert("❌ Product with this Serial Number already exists.");
        return;
      }
  
      // Proceed with registration
      await contract.methods
        .registerProduct(manufacturerID, productName, productSN, productBrand, productPrice)
        .send({ from: accounts[0] });
  
      alert('✅ Product registered on blockchain!');
      setQrCodeData(JSON.stringify({ manufacturerID, productName, productSN, productBrand, productPrice }));
  
    } catch (error) {
      console.error('❌ ERROR:', error);
      alert('Transaction Error: ' + (error?.message || 'Unexpected error.'));
    }
  };
  

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-links">
          <a href="/" className="logo">ChainVerify</a>
          <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
            <a href="/">Home</a>
            <a href="/manufacturer" className="active">Manufacturer</a>
            <a href="/seller">Seller</a>
            <a href="/consumer">Consumer</a>
          </div>
          <div className="hamburger" onClick={() => setIsMenuActive(!isMenuActive)}>
            <div></div><div></div><div></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2 className="title">Add New Product</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="manufacturerID">Manufacturer ID</label>
                <input type="text" id="manufacturerID" value={formData.manufacturerID} onChange={handleChange} required />
              </div>
              <div className="input-wrapper">
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" value={formData.productName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="productSN">Serial Number</label>
                <input type="text" id="productSN" value={formData.productSN} onChange={handleChange} required />
              </div>
              <div className="input-wrapper">
                <label htmlFor="productBrand">Brand</label>
                <input type="text" id="productBrand" value={formData.productBrand} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="productPrice">Price</label>
                <input type="number" id="productPrice" value={formData.productPrice} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit">Register Product on Blockchain</button>
          </form>
        </div>

        {qrCodeData && (
          <div className="qr-section">
            <h3 className="qr-title">Generated QR Code:</h3>
            <div className="qr-code" ref={qrRef}>
              <QRCodeCanvas value={qrCodeData} size={200} />
            </div>
            <button className="download-btn" onClick={downloadQRCode}>Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductManufacturer;  