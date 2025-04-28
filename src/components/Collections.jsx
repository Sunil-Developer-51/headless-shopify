import { getCollections } from "../api";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
 function CollectionList() {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        async function fetchCollections() {
            const collectionData = await getCollections();
            setCollections(collectionData);
        }
        fetchCollections();
    },[])

    return (
      <div className="product-list">
        {collections.map(({ node }) => (
          <div key={node.id} className="product-card">
            <Link to={`/collection/${node.handle}`} className="product-link">
              <img src={node.image?.url||'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-1_large.png?v=1530129113'} alt={node.title} className="product-image collection-image" />
              <h3>{node.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    );
  }
  export default CollectionList;
