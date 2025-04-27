// src/components/Cart.js
import React from "react";

function Cart({ checkoutUrl }) {
  if (!checkoutUrl) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cart Ready!</h2>
      <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
        <button>Proceed to Checkout</button>
      </a>
    </div>
  );
}

export default Cart;
