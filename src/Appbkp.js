// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Collection from "./components/Collection";
import Cart from "./components/Cart";
import { createCart, addToCart } from "./api";
import CartPage from "./components/CartPage";

function App() {
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  async function handleAddToCart(variantId) {
    if (!cartId) {
      console.log(variantId)
      const cart = await createCart(variantId);
      setCartId(cart.id);         // 💥 Error here if cart is undefined
      setCheckoutUrl(cart.checkoutUrl);
    } else {
      const cart = await addToCart(cartId, variantId);
      setCheckoutUrl(cart.checkoutUrl);
    }
  }

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:handle" element={<Collection addToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartId={cartId} setCheckoutUrl={setCheckoutUrl} />} />
        </Routes>

        <Cart checkoutUrl={checkoutUrl} />
      </div>
    </Router>
  );
}

export default App;
