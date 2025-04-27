// src/components/CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCartDetails, removeFromCart } from "../api";

function CartPage({ cartId, setCheckoutUrl }) {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    async function fetchCart() {
      if (cartId) {
        const cart = await getCartDetails(cartId);
        setCartData(cart);
        setCheckoutUrl(cart.checkoutUrl); // update checkoutUrl also
      }
    }
    fetchCart();
  }, [cartId, setCheckoutUrl]);

  async function handleRemove(lineId) {
    const updatedCart = await removeFromCart(cartId, lineId);
    setCartData(updatedCart);
    setCheckoutUrl(updatedCart.checkoutUrl);
  }

  if (!cartData) {
    return <div>Loading cart...</div>;
  }

  if (cartData.lines.edges.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartData.lines.edges.map((item) => (
        <div key={item.node.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <img src={item.node.merchandise.image?.url} alt="" width="80" />
          <h4>{item.node.merchandise.product.title}</h4>
          <p>Quantity: {item.node.quantity}</p>
          <button onClick={() => handleRemove(item.node.id)}>Remove</button>
        </div>
      ))}
      <a href={cartData.checkoutUrl}>
        <button style={{ marginTop: "20px" }}>Proceed to Checkout</button>
      </a>
    </div>
  );
}

export default CartPage;
