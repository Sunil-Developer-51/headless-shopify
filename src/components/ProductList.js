// src/components/ProductList.js
import React from "react";
import { Link } from "react-router-dom";

function ProductList({ products, addToCart }) {
    console.log(addToCart)

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    
      {products.map(({ node }) => (
        <div key={node.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
          <Link to={`/product/${node.handle}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={node.images.edges[0]?.node.url} alt={node.title} style={{ width: "100%" }} />
            <h3>{node.title}</h3>
            <p>${node.priceRange.minVariantPrice.amount}</p>
          </Link>
          <button onClick={() => addToCart(node.variants.edges[0].node.id)}> Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
