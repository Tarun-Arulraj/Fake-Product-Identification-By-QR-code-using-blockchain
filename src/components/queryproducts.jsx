import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import SellerRegistryABI from '../contracts/SellerRegistry.json';
import ProductRegistryABI from '../contracts/ProductRegistry.json';
import ProductSaleRegistryABI from '../contracts/ProductSaleRegistry.json';
import '../styles/queryproducts.css';

const QueryProducts = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [sellerCode, setSellerCode] = useState('');
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!window.ethereum) {
        alert("MetaMask is required.");
        return;
      }

      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const sellerRegistry = new web3.eth.Contract(
        SellerRegistryABI.abi,
        "0xe3af6F1100E2f07E6132c5cE6CECf519f72CC0A7"                            // Replace with your SellerRegistry address
      );
      const productRegistry = new web3.eth.Contract(
        ProductRegistryABI.abi,
        "0xA38E5b4D68E3716291fe1Bfa84ec7336d780F6B7"                           // Replace with your ProductRegistry address
      );
      const productSaleRegistry = new web3.eth.Contract(
        ProductSaleRegistryABI.abi,
        "0xB2B66b3c3cc06DF1e919e9d6320d927d5FDdf1cC"                      // Replace with your ProductSaleRegistry address
      );

      const seller = await sellerRegistry.methods.getSellerByCode(sellerCode).call();
      const manufacturerID = seller[6];

      const totalProducts = await productRegistry.methods.getProductListLength().call();
      const matchedProducts = [];

      for (let i = 0; i < totalProducts; i++) {
        const productSN = await productRegistry.methods.productList(i).call();
        const product = await productRegistry.methods.getProduct(productSN).call();

        if (product[0] === manufacturerID) {
          const isSold = await productSaleRegistry.methods.saleExists(productSN).call();
          matchedProducts.push({
            id: productSN,
            serialNumber: productSN,
            productName: product[1],
            brand: product[3],
            price: "$" + product[4],
            status: isSold ? "sold" : "registered"
          });
        }
      }

      setInventory(matchedProducts);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    return status === "registered"
      ? <span className="status-badge available">Available</span>
      : <span className="status-badge sold">Sold</span>;
  };

  return (
    <div className="query-products">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="logo">ChainVerify</Link>
          <div className={`nav-items ${isMenuActive ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/manufacturer">Manufacturer</Link>
            <Link to="/seller" className="active">Seller</Link>
            <Link to="/consumer">Consumer</Link>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div><div></div><div></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1 className="page-header">Seller Inventory Lookup</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <div className="input-wrapper">
              <label htmlFor="sellerCode">Seller Identification Code</label>
              <input
                type="text"
                id="sellerCode"
                placeholder="Enter seller code"
                value={sellerCode}
                onChange={(e) => setSellerCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="search-btn">
              {loading ? "Loading..." : "Load Inventory"}
            </button>
          </div>
        </form>

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
              {inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.serialNumber}</td>
                    <td>{item.productName}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{getStatusBadge(item.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">{loading ? "Fetching products..." : "No products to display."}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueryProducts;