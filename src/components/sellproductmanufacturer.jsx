import Web3 from 'web3';
import SellerRegistry from '../contracts/SellerRegistry.json';
import ProductRegistry from '../contracts/ProductRegistry.json';
import SalesRegistry from '../contracts/SalesRegistry.json';
import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/sellproductmanufacturer.css";

const SellProductManufacturer = () => {
    const [productSN, setProductSN] = useState("");
    const [sellerCode, setSellerCode] = useState("");
    const [cameraActive, setCameraActive] = useState(false);
    const scannerRef = useRef(null);
    const navItemsRef = useRef(null);

    useEffect(() => {
        if (cameraActive) {
            if (!scannerRef.current) {
                scannerRef.current = new Html5QrcodeScanner("qr-reader", {
                    fps: 10,
                    qrbox: 250,
                });

                scannerRef.current.render(
                    (decodedText) => {
                        try {
                            const parsedData = JSON.parse(decodedText);
                            if (parsedData.productSN) {
                                setProductSN(parsedData.productSN); // Extract only productSN
                            } else {
                                console.error("QR Code does not contain productSN");
                            }
                        } catch (error) {
                            console.error("Invalid QR Code format", error);
                        }

                        // Stop scanning after success
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
    }, [cameraActive]);

    const toggleMenu = () => {
        if (navItemsRef.current) {
            navItemsRef.current.classList.toggle("active");
        }
    };

    const toggleCamera = () => setCameraActive((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
      
          const sellerRegistry = new web3.eth.Contract(SellerRegistry.abi, '0x522Fa3669C410c25A81Cc11226FA49EaC3515367');  //DEPLOYED SellerRegistry contract address
          const productRegistry = new web3.eth.Contract(ProductRegistry.abi, '0x392602A14d90Abdedd93cd1a18892f7F5A466674');  //DEPLOYED ProductRegistry contract address
      
          const productExists = await productRegistry.methods.productExists(productSN).call();
          const sellerExists = await sellerRegistry.methods.sellerExists(sellerCode).call();
      
          if (!productExists) {
            alert("❌ Product not found on blockchain.");
            return;
          }
      
          if (!sellerExists) {
            alert("❌ Seller not found on blockchain.");
            return;
          }

          // ✅ Record sale on blockchain
        const salesRegistry = new web3.eth.Contract(SalesRegistry.abi, '0x72b6611f81D2297f2057aA9fb59b4eb04Ae7C8ef');  //DEPLOYED SalesRegistry contract address
        await salesRegistry.methods.recordSale(sellerCode, productSN).send({ from: accounts[0] });
      
          alert("✅ Product sold successfully!");
      
        } catch (error) {
          console.error("Transaction Error:", error);
          alert("Error: " + (error?.message || "Something went wrong."));
        }
      };
      
    

    return (
        <div className="sell-product-manufacturer">
            {/* Modern Navigation */}
            <nav className="navbar">
                <div className="nav-links">
                    <a href="/" className="logo">ChainVerify</a>
                    <div className="nav-items" ref={navItemsRef}>
                        <a href="/">Home</a>
                        <a href="/manufacturer" className="active">Manufacturer</a>
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

            {/* Main Content */}
            <div className="container">
                <h2>Sell Product to Seller</h2>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        {/* QR Scanner */}
                        <div className="camera-preview">
                            {cameraActive ? <div id="qr-reader" style={{ width: "100%" }}></div> : <p>Camera is turned off</p>}
                            <button type="button" className="camera-toggle-btn" onClick={toggleCamera}>
                                {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="form-row">
                            <div className="input-wrapper">
                                <label htmlFor="productSN">Product Serial Number</label>
                                <input type="text" id="productSN" value={productSN} onChange={(e) => setProductSN(e.target.value)} required />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="sellerCode">Seller Code</label>
                                <input type="text" id="sellerCode" value={sellerCode} onChange={(e) => setSellerCode(e.target.value)} required />
                            </div>
                        </div>

                        <button type="submit">Complete Transaction</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellProductManufacturer;