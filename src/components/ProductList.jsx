// src/components/ProductList.js
import React from "react";
import { Link } from "react-router-dom";
import '../style/ProductList.css'; // Importing the CSS for the component

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map(({ node }) => (
        <div key={node.id} className="product-card">
          <Link to={`/product/${node.handle}`} className="product-link">
            <img src={node.images.edges[0]?.node.url} alt={node.title} className="product-image" />
            <h3>{node.title}</h3>
            <p>${node.priceRange.minVariantPrice.amount}</p>
          </Link>
          <button className="add-to-cart-btn" onClick={() => addToCart(node.variants.edges[0].node.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
