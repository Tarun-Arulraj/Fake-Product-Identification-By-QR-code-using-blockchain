import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import ProductSaleRegistry from "../contracts/ProductSaleRegistry.json"; 
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/VerifyProduct.css";

const VerifyProduct = () => {
  const [formData, setFormData] = useState({
    productSN: "",
    consumerCode: ""
  });
  const [verificationStatus, setVerificationStatus] = useState({
    icon: "🔍",
    text: "Scan product to verify authenticity",
    isGenuine: null
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const scannerRef = useRef(null);
  const [isMenuActive, setIsMenuActive] = useState(false);

  // Initialize Web3 and Contract
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(
    ProductSaleRegistry.abi,
    "0x66BE04222116520a1218B649A20E887B6D96d9e2" // Deployed ProductSaleRegistry contract address
  );

  useEffect(() => {
    if (cameraActive) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5QrcodeScanner("qr-reader", {
          fps: 10,
          qrbox: 250
        });
  
        scannerRef.current.render(
          (decodedText) => {
            try {
              const parsedData = JSON.parse(decodedText);
              if (parsedData.productSN) {
                setFormData({ ...formData, productSN: parsedData.productSN });
              } else {
                console.error("QR Code does not contain productSN");
              }
            } catch (error) {
              console.error("Invalid QR Code format", error);
            }
  
            // Stop scanning after successful scan
            scannerRef.current.clear().then(() => {
              scannerRef.current = null;
              setCameraActive(false);
            }).catch((err) => console.error("Cleanup error:", err));
          },
          (error) => console.error("QR Scanner Error:", error)
        );
      }
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          scannerRef.current = null;
        }).catch((err) => console.error("Cleanup error:", err));
      }
    }
  
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().then(() => {
          scannerRef.current = null;
        }).catch((err) => console.error("Cleanup error:", err));
      }
    };
  }, [cameraActive, formData]);  // <-- Add formData as a dependency
  

  const toggleMenu = () => setIsMenuActive(!isMenuActive);
  const toggleCamera = () => setCameraActive((prev) => !prev);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationStatus({
      icon: "⏳",
      text: "Verifying...",
      isGenuine: null
    });

    try {
      // Get the product details from the ProductSaleRegistry using the product serial number
      const { productSN, consumerCode } = formData;
      const saleDetails = await contract.methods.getSale(productSN).call();

      if (!saleDetails || !saleDetails[0]) {
        setVerificationStatus({
          icon: "❌",
          text: "Product does not exist in the sale registry.",
          isGenuine: false
        });
        setIsVerifying(false);
        return;
      }

      // Verify if the consumer code matches
      const storedConsumerCode = saleDetails[1]; // Assuming consumer code is at index 1
      const isGenuine = storedConsumerCode === consumerCode;

      setVerificationStatus({
        icon: isGenuine ? "✅" : "❌",
        text: isGenuine ? "Genuine Product Verified!" : "Fake Product Detected!",
        isGenuine
      });
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationStatus({
        icon: "❌",
        text: "Verification failed. Please try again.",
        isGenuine: false
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="verify-product">
      <nav className="navbar">
        <div className="nav-links">
          <a href="/" className="logo">ChainVerify</a>
          <div className={`nav-items ${isMenuActive ? "active" : ""}`}>
            <a href="/">Home</a>
            <a href="/manufacturer">Manufacturer</a>
            <a href="/seller">Seller</a>
            <a href="/consumer" className="active">Consumer</a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div><div></div><div></div>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2 className="title">Verify Product</h2>
        <div className="verification-interface">
          <div className="scan-section">
            {/* QR Scanner */}
            <div className="camera-preview">
              {cameraActive ? (
                <div id="qr-reader" style={{ width: "100%" }}></div>
              ) : (
                <p>Camera is turned off</p>
              )}
              <button type="button" className="camera-toggle-btn" onClick={toggleCamera}>
                {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
              </button>
            </div>

            {/* Input Section */}
            <div className="input-section">
              <form onSubmit={handleVerify}>
                <div className="input-group">
                  <label htmlFor="productSN">Product Serial Number</label>
                  <input
                    type="text"
                    id="productSN"
                    placeholder="Scan or enter product SN"
                    required
                    value={formData.productSN}
                    onChange={(e) => setFormData({ ...formData, productSN: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="consumerCode">Consumer Code</label>
                  <input
                    type="text"
                    id="consumerCode"
                    placeholder="Enter consumer code"
                    required
                    value={formData.consumerCode}
                    onChange={(e) => setFormData({ ...formData, consumerCode: e.target.value })}
                  />
                </div>

                <button type="submit" className="verify-btn" disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify Authenticity"}
                </button>
              </form>
            </div>
          </div>

          {/* Verification Result */}
          <div className={`verification-result ${verificationStatus.isGenuine !== null ? 
              (verificationStatus.isGenuine ? "genuine" : "fake") : ""}`}>
            <div className="result-icon">{verificationStatus.icon}</div>
            <div className="result-text">{verificationStatus.text}</div>
            {verificationStatus.isGenuine === false && (
              <p className="report-text">Report this product to authorities</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyProduct;