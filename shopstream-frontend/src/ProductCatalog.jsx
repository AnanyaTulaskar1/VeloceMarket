import React, { useEffect, useState } from 'react';
import API from './api';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#b28e6b' }}>
        Loading ShopStream Storefront...
      </div>
    );
  }

  const displayProduct = products[0] || {
    name: "Minimalist Lounge Chair",
    price: 299,
    description: "Support local everything. Super cozy accent chair with natural wooden architecture.",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
  };

  return (
    <div style={containerStyle}>
      {/* 1. Header Navigation Bar */}
      <header style={navStyle}>
        <div style={logoStyle}>🏠 <span style={{ fontWeight: '700' }}>ShopStream</span></div>
        <nav style={linksStyle}>
          <span style={{ color: '#b28e6b', fontWeight: '600', cursor: 'pointer' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Product</span>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </nav>
        <input type="text" placeholder="Type here to search..." style={searchStyle} />
      </header>

      {/* 2. Main Premium Content Body */}
      <main style={mainHeroStyle}>
        {/* Left Copy & Actions Side */}
        <div style={leftSideStyle}>
          <h1 style={heroTitleStyle}>e-commerce Website</h1>
          <p style={taglineStyle}>SUPPORT LOCAL EVERYTHING</p>
          <p style={descriptionStyle}>{displayProduct.description}</p>

          <div style={interactiveCardStyle}>
            <span style={{ fontSize: '14px', color: '#a79d93' }}>Choose quantity:</span>
            <div style={counterContainerStyle}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={counterBtnStyle}>-</button>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={counterBtnStyle}>+</button>
            </div>
          </div>

          <button style={buyButtonStyle} onClick={() => alert(`Processing order for ${quantity} item(s)!`)}>
            🛒 Buy Now — ${displayProduct.price * quantity}
          </button>
        </div>

        {/* Right Modern Circle Showcase Side */}
        <div style={rightSideStyle}>
          <div style={circleBackgroundStyle}>
            <img src={displayProduct.imageUrl} alt={displayProduct.name} style={productImageStyle} />
            <div style={{ ...badgeStyle, top: '20%', right: '-30px' }}>Minimalistic</div>
            <div style={{ ...badgeStyle, bottom: '15%', left: '-20px' }}>¡Super cozy!</div>
          </div>

          {/* Dynamic Thumbnails Stack */}
          <div style={thumbnailStackStyle}>
            {products.slice(0, 3).map((prod, idx) => (
              <img key={idx} src={prod.imageUrl} alt="thumbnail" style={thumbnailStyle} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- DEFINED STYLING OBJECTS --- */
const containerStyle = { backgroundColor: '#fff', borderRadius: '24px', padding: '30px 50px', width: '95vw', maxWidth: '1100px', boxShadow: '0 20px 40px rgba(181, 150, 122, 0.15)', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' };
const navStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '60px' };
const logoStyle = { fontSize: '22px', color: '#bd9672', display: 'flex', alignItems: 'center', gap: '8px' };
const linksStyle = { display: 'flex', gap: '30px', color: '#a29688', fontSize: '15px' };
const searchStyle = { border: 'none', backgroundColor: '#fcf6f0', padding: '10px 20px', borderRadius: '20px', width: '200px', outline: 'none', color: '#bd9672' };
const mainHeroStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' };
const leftSideStyle = { flex: '1', minWidth: '300px' };
const heroTitleStyle = { fontSize: '52px', fontWeight: '800', color: '#d97ca4', margin: '0 0 10px 0', lineHeight: '1.1' };
const taglineStyle = { fontSize: '15px', color: '#c5a07d', letterSpacing: '3px', margin: '0 0 20px 0', fontWeight: '500' };
const descriptionStyle = { color: '#8e8376', fontSize: '16px', lineHeight: '1.6', maxWidth: '400px', margin: '0 0 30px 0' };
const interactiveCardStyle = { backgroundColor: '#fdf7f2', padding: '12px 20px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '15px', marginBottom: '20px' };
const counterContainerStyle = { display: 'flex', alignItems: 'center', gap: '12px' };
const counterBtnStyle = { border: 'none', backgroundColor: '#ebd9ca', color: '#8d735b', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };
const buyButtonStyle = { display: 'block', padding: '16px 36px', fontSize: '18px', fontWeight: '600', backgroundColor: '#cd9b64', border: 'none', borderRadius: '25px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(205, 155, 100, 0.3)', color: '#ffffff' };
const rightSideStyle = { position: 'relative', display: 'flex', alignItems: 'center', gap: '40px' };
const circleBackgroundStyle = { width: '360px', height: '360px', borderRadius: '50%', backgroundColor: '#f7caa1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const productImageStyle = { width: '85%', height: '85%', objectFit: 'contain', borderRadius: '50%' };
const badgeStyle = { position: 'absolute', backgroundColor: '#ffffff', padding: '8px 20px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.04)', fontSize: '14px', fontWeight: '600', color: '#ad9278' };
const thumbnailStackStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const thumbnailStyle = { width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' };

export default ProductCatalog;