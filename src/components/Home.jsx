import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner">
        <h1>Welcome to Our Store</h1>
        <Link to="/collection/your-collection-handle">
          <button className="shop-now-btn">Shop Now</button>
        </Link>
      </section>

      {/* Collection List */}
      <section className="collections">
        <h2>Shop by Collection</h2>
        <div className="collection-grid">
          {[{ name: "frontpage", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
            { name: "accessories", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "frontpage", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
            { name: "Skincare", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }]
            .map((collection, index) => (
              <Link to={`/collection/${collection.name}`} key={index} className="collection-card">
                <div>
                  <img src={collection.image} alt={collection.name} />
                  <h3>{collection.name}</h3>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Image with Text Section */}
      <section className="promo-section">
        <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" alt="Promo" />
        <div>
          <h2>Stylish Collections</h2>
          <p>Discover a wide range of fashion products for every style. Shop the latest trends with exclusive offers available only at our store.</p>
          <button>Discover Now</button>
        </div>
      </section>

      {/* Rich Text Section */}
      <section className="rich-text-section">
        <h2>Our Story</h2>
        <p>
          We started with a simple vision: to bring quality fashion products to the world. Every item is crafted with love and attention to detail.
        </p>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div>
          "Absolutely love the quality and fast delivery! Will shop again soon!" <br />
          — Happy Customer
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2>Subscribe to our Newsletter</h2>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Sunil Store. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
