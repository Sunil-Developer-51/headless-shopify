// src/components/Home.js
import React, { useEffect, useState } from "react";
import { getCollections } from "../api";
import { Link } from "react-router-dom";

function Home() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function fetchCollections() {
      const data = await getCollections();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Collections</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {collections.map(({ node }) => (
          <Link key={node.id} to={`/collection/${node.handle}`} style={{ textDecoration: "none" }}>
            <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={node.image?.url} alt={node.title} style={{ width: "100%" }} />
              <h3>{node.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
