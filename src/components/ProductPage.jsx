// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByHandle } from "../api";

function ProductPage({ addToCart }) {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const prod = await getProductByHandle(handle);
      setProduct(prod);
      if (prod?.variants?.edges?.[0]?.node?.id) {
        setSelectedVariantId(prod.variants.edges[0].node.id);
      }
    }
    fetchProduct();
  }, [handle]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    if (selectedVariantId) {
      for (let i = 0; i < quantity; i++) {
        addToCart(selectedVariantId);
      }
    }
  };

  const handleBuyNow = () => {
    if (selectedVariantId) {
        const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN;
      // Redirect to checkout with variant
      const checkoutUrl = `https://${shopifyDomain}/cart/${selectedVariantId}:${quantity}`;
      window.location.href = checkoutUrl;
    }
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.edges.length) % product.images.edges.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.edges.length);
  };
 
  return (
    <div style={{ padding: "50px", display: "flex", gap: "40px" }}>
      {/* Image Slider */}
      <div style={{ flex: 1, position: "relative" }}>
        {product.images.edges.length > 0 ? (
          <>
            <img
              src={product.images.edges[currentImageIndex].node.url}
              alt={product.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            {product.images.edges.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    fontSize: "24px",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    fontSize: "24px",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                >
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div style={{ background: "#eee", height: "400px" }} />
        )}
      </div>

      {/* Product Info */}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>{product.title}</h1>
        <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
          ₹{product.priceRange.minVariantPrice.amount}
        </p>

        {/* Variant Selector */}
        {product.variants.edges.length > 1 && (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px" }}>Choose Variant:</label>
            <select
              onChange={(e) => setSelectedVariantId(e.target.value)}
              value={selectedVariantId}
              style={{ padding: "10px", fontSize: "16px" }}
            >
              {product.variants.edges.map((variant) => (
                <option key={variant.node.id} value={variant.node.id}>
                  {variant.node.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "60px", padding: "5px", fontSize: "16px" }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "15px 30px",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            style={{
              padding: "15px 30px",
              backgroundColor: "#ff6600",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div style={{ fontSize: "16px", color: "#555" }}>
          <h3>Description:</h3>
          <p>{product.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
