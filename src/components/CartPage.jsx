// src/components/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, shopifyFetch } from "../api";
import './CartPage.css';  // <-- Import the CSS file

function CartPage({ cartId, setCheckoutUrl }) {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      fetchCartItems(cartId);
    }
  }, [cartId]);

  async function fetchCartItems(cartId) {
    const query = `
      query CartQuery($cartId: ID!) {
        cart(id: $cartId) {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                    }
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const variables = { cartId };
    const data = await shopifyFetch(query, variables);

    setCartItems(data.cart.lines.edges);
  }

  async function updateQuantity(lineId, newQty) {
    const cart = await addToCart(cartId, lineId, newQty);
    setCartItems(cart.lines.edges);
    showToast(`Updated quantity to ${newQty}`);
  }

  function showToast(message) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  }

  return (
    <div className="cart-page-container">
      {toastMessage && (
        <div className="toast-message">
          {toastMessage}
        </div>
      )}

      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(({ node }) => (
            <div key={node.id} className="cart-item">
              <div className="cart-item-img">
                <img src={node.merchandise.image.url} alt={node.merchandise.title} />
              </div>
              <div className="cart-item-details">
                <h3>{node.merchandise.title}</h3>
                <p className="price">${node.merchandise.priceV2.amount}</p>
                <div className="quantity-control">
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(node.id, node.quantity - 1)} 
                    disabled={node.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{node.quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(node.id, node.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-actions">
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
