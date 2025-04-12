import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/index"
import Consumer from "./components/consumer";
import Manufacturer from "./components/manufacturer";
import PurchaseHistory from "./components/purchasehistory";
import QueryProducts from "./components/queryproducts";
import Seller from "./components/seller";
import SellerPortal from "./components/SellerPortal";
import SellProductManufacturer from "./components/sellproductmanufacturer";
import VerifyProduct from "./components/VerifyProduct";
import AddProductManufacturer from "./components/addproductmanufacturer";
import AddSellerManufacturer from "./components/addsellermanufacturer";

import "./styles/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/index" element={<Index />} />
        <Route path="/consumer" element={<Consumer />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/consumer/purchasehistory" element={<PurchaseHistory />} />
        <Route path="/seller/view-inventory" element={<QueryProducts />} />        
        <Route path="/seller/seller-portal" element={<SellerPortal />} />
        <Route path="/manufacturer/sell-product" element={<SellProductManufacturer />} />
        <Route path="/consumer/verifyProducts" element={<VerifyProduct />} />
        <Route path="/manufacturer/add-product" element={<AddProductManufacturer />} />
        <Route path="/manufacturer/add-seller" element={<AddSellerManufacturer />} />
      </Routes>
    </Router>
  );
}

export default App;