import React from 'react';

const HeroSection = ({ product, onAddToCart }) => {
  return (
    <div style={{ flex: '1', minWidth: '320px', paddingRight: '20px' }}>
      <span style={{ backgroundColor: '#FDF4EE', color: '#bd9672', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', display: 'inline-block', marginBottom: '15px' }}>
        ✨ Premium Collection
      </span>
      
      <h1 style={{ fontSize: '3rem', color: '#4a3f35', fontFamily: 'serif', margin: '0 0 20px 0', lineHeight: '1.1' }}>
        {product.name}
      </h1>
      
      <p style={{ color: '#8e8376', lineHeight: '1.6', fontSize: '15px', margin: '0 0 30px 0' }}>
        {product.description}
      </p>

      
    </div>
  );
};

export default HeroSection;