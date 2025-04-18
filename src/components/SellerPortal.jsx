import { Html5QrcodeScanner } from "html5-qrcode";
import Web3 from "web3";
import React, { useState, useEffect, useRef } from "react";
import SaleRegistry from '../contracts/ProductSaleRegistry.json';
import ProductRegistry from '../contracts/ProductRegistry.json';
import "../styles/SellerPortal.css";

const SellerPortal = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [productSN, setProductSN] = useState("");
  const [consumerCode, setConsumerCode] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (cameraActive) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scannerRef.current.render(
          (decodedText) => {
            try {
              const parsedData = JSON.parse(decodedText);
              if (parsedData.productSN) {
                setProductSN(parsedData.productSN);
              } else {
                console.error("QR Code does not contain productSN");
              }
            } catch (error) {
              console.error("Invalid QR Code format", error);
            }
            scannerRef.current.clear().then(() => {
              scannerRef.current = null;
              setCameraActive(false);
            }).catch(err => console.error("Cleanup error:", err));
          },
          (error) => console.error("QR Scanner Error:", error)
        );
      }
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          scannerRef.current = null;
        }).catch(err => console.error("Cleanup error:", err));
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          scannerRef.current = null;
        }).catch(err => console.error("Cleanup error:", err));
      }
    };
  }, [cameraActive]);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);
  const toggleCamera = () => setCameraActive(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();

      const productContract = new web3.eth.Contract(
        ProductRegistry.abi,
        '0x4766fBD378cE15D22AA4f0C425a2804543787caf' // Your ProductRegistry address
      );

      const saleContract = new web3.eth.Contract(
        SaleRegistry.abi,
        '0x66BE04222116520a1218B649A20E887B6D96d9e2' // Replace with ProductSaleRegistry address
      );

      // Check if product exists
      const productData = await productContract.methods.getProduct(productSN).call();
      if (!productData || productData[2] === "") {
        alert("❌ Product Serial Number does not exist on the blockchain.");
        return;
      }

      // Check if sale already exists
      const exists = await saleContract.methods.saleExists(productSN).call();
      if (exists) {
        alert("❌ Sale for this product has already been recorded.");
        return;
      }

      // Record the sale
      await saleContract.methods
        .recordSale(productSN, consumerCode)
        .send({ from: accounts[0] });

      alert("✅ Product sale recorded on blockchain!");
      setProductSN("");
      setConsumerCode("");

    } catch (error) {
      console.error("❌ Transaction Error:", error);
      alert("Error: " + (error?.message || "Unexpected blockchain error."));
    }
  };

  return (
    <div className="seller-portal">
      <nav className="navbar">
        <div className="nav-links">
          <a href="/" className="logo">ChainVerify</a>
          <div className={`nav-items ${isMenuActive ? "active" : ""}`}>
            <a href="/">Home</a>
            <a href="/manufacturer">Manufacturer</a>
            <a href="/seller" className="active">Seller</a>
            <a href="/consumer">Consumer</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div><div></div><div></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2>Complete Product Sale</h2>
        <div className="transaction-interface">
          <div className="camera-preview">
            {cameraActive ? <div id="qr-reader" style={{ width: "100%" }}></div> : <p>Camera is turned off</p>}
            <button type="button" className="camera-toggle-btn" onClick={toggleCamera}>
              {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="productSN">Product Serial Number</label>
                <input
                  type="text"
                  id="productSN"
                  placeholder="Scan or enter product SN"
                  value={productSN}
                  onChange={(e) => setProductSN(e.target.value)}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="consumerCode">Consumer Code</label>
                <input
                  type="text"
                  id="consumerCode"
                  placeholder="Enter consumer code"
                  value={consumerCode}
                  onChange={(e) => setConsumerCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Confirm Sale</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerPortal;