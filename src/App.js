// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // import toast CSS
import Home from "./components/Home";
import Collection from "./components/Collection";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import Login from "./components/LogIn";
import Register from "./components/Register";
import Account from "./components/Account";
import { createCart, addToCart } from "./api";
import "./components/styles.css";  // Importing the external CSS file

function App() {
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [checkoutUrl, setCheckoutUrl] = useState(() => localStorage.getItem("checkoutUrl"));
  const [cartCount, setCartCount] = useState(() => Number(localStorage.getItem("cartCount")) || 0);

  // Save cart data to localStorage
  useEffect(() => {
    if (cartId) localStorage.setItem("cartId", cartId);
    if (checkoutUrl) localStorage.setItem("checkoutUrl", checkoutUrl);
    localStorage.setItem("cartCount", cartCount);
  }, [cartId, checkoutUrl, cartCount]);

  async function handleAddToCart(variantId) {
    try {
      if (!cartId) {
        const cart = await createCart(variantId);
        setCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);
      } else {
        const cart = await addToCart(cartId, variantId);
        setCheckoutUrl(cart.checkoutUrl);
      }
      setCartCount(prev => prev + 1);
      toast.success("Added to cart! 🛒", { position: "top-right" });
    } catch (error) {
      toast.error("Error adding to cart", { position: "top-right" });
      console.error("Cart Error:", error);
    }
  }

  return (
    <Router>
      <div style={{ padding: "0", margin: "0" }}>
        {/* Header Section */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 50px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          position: "sticky", top: 0, zIndex: 1000
        }}>
          
          {/* Logo Left */}
          <div>
            <Link to="/">
              <img
                src="https://cdn.shopify.com/s/files/1/0874/0297/1300/files/3667eda5-6355-41f8-854e-6281851f9071_removalai_preview.png?v=1745690463"
                alt="Logo"
                style={{ height: "50px" }}
              />
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
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
            <Link to="/cart" style={{ position: "relative", fontSize: "24px" }}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/account" style={{ fontSize: "24px" }}>
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
            <Route path="/product/:handle" element={<ProductPage addToCart={handleAddToCart} />} /> {/* 👈 add this */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
