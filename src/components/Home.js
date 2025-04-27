// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Banner Section */}
      <section style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff')", backgroundSize: "cover", backgroundPosition: "center", height: "500px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1 style={{ fontSize: "50px", marginBottom: "20px" }}>Welcome to Our Store</h1>
        <Link to="/collection/your-collection-handle">
          <button style={{ padding: "10px 20px", fontSize: "18px", background: "#000", color: "#fff", border: "none" }}>Shop Now</button>
        </Link>
      </section>

      {/* Collection List */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Shop by Collection</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "30px" }}>
          {/* Replace with real images */}
          {[
            { name: "frontend", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
            { name: "Accessories", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Frontend", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Skincare", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
          ].map((collection, index) => (
            <Link to={`/collection/${collection.name}`} key={index} style={{ textDecoration: "none", color: "#000" }}>
              <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "10px", overflow: "hidden", background: "#fff" }}>
                <img src={collection.image} alt={collection.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
                <h3 style={{ marginTop: "10px" }}>{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Image with Text Section */}
      <section style={{ display: "flex", alignItems: "center", padding: "60px 20px", gap: "40px" }}>
        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" alt="Promo" style={{ width: "50%", borderRadius: "10px" }} />
        <div>
          <h2>Stylish Collections</h2>
          <p>Discover a wide range of fashion products for every style. Shop the latest trends with exclusive offers available only at our store.</p>
          <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none" }}>Discover Now</button>
        </div>
      </section>

      {/* Rich Text Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
        <h2>Our Story</h2>
        <p style={{ maxWidth: "800px", margin: "20px auto" }}>
          We started with a simple vision: to bring quality fashion products to the world. Every item is crafted with love and attention to detail.
        </p>
      </section>

      {/* Testimonial Section */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>What Our Customers Say</h2>
        <div style={{ marginTop: "30px", fontStyle: "italic" }}>
          "Absolutely love the quality and fast delivery! Will shop again soon!" <br />
          — Happy Customer
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: "60px 20px", backgroundColor: "#eee", textAlign: "center" }}>
        <h2>Subscribe to our Newsletter</h2>
        <input type="email" placeholder="Enter your email" style={{ padding: "10px", marginTop: "20px", width: "300px" }} />
        <br />
        <button style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none" }}>Subscribe</button>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 20px", backgroundColor: "#222", color: "#aaa", textAlign: "center" }}>
        &copy; {new Date().getFullYear()} Sunil Store. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
