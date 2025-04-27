// src/components/Collection.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCollection } from "../api";
import ProductList from "./ProductList";

function Collection({ addToCart }) {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsByCollection(handle);
      setProducts(data);
    }
    fetchProducts();
  }, [handle]);
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
}

export default Collection;
