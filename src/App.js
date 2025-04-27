// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Collection from "./components/Collection";
import CartPage from "./components/CartPage";
import { createCart, addToCart } from "./api";

function App() {
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  async function handleAddToCart(variantId) {
    if (!cartId) {
      const cart = await createCart(variantId);
      setCartId(cart.id);
      setCheckoutUrl(cart.checkoutUrl);
    } else {
      const cart = await addToCart(cartId, variantId);
      setCheckoutUrl(cart.checkoutUrl);
    }
  }

  return (
    <Router>
      <div style={{ padding: "0", margin: "0" }}>
        {/* Header Section */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 50px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 1000 }}>
          
          {/* Logo Left */}
          <div>
            <Link to="/">
              <img src="https://cdn.shopify.com/s/files/1/0874/0297/1300/files/3667eda5-6355-41f8-854e-6281851f9071_removalai_preview.png?v=1745690463" alt="Logo" style={{ height: "50px" }} />
            </Link>
          </div>

          {/* Menu Center */}
          <nav style={{ display: "flex", gap: "30px", fontWeight: "600", fontSize: "16px" }}>
            <Link to="/">Home</Link>
            <Link to="/collection/frontpage">Collections</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </nav>

          {/* Icons Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/cart">
              🛒
            </Link>
            <Link to="/account">
              👤
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection/:handle" element={<Collection addToCart={handleAddToCart} />} />
            <Route path="/cart" element={<CartPage cartId={cartId} setCheckoutUrl={setCheckoutUrl} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
