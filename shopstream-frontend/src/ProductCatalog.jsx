import React from 'react';

const ProductCatalog = ({ products, onAddToCart }) => {
  return (
    // Ensured target anchor ID is assigned here
    <section id="shop-collections" style={{ paddingTop: '20px', scrollMarginTop: '20px' }}>
      <div style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '2rem', color: '#4a3f35', margin: '0 0 5px 0', fontFamily: 'serif' }}>Explore Our Collection</h2>
        <p style={{ color: '#8e8376', margin: 0 }}>Showing {products.length} beautiful boutique flower arrangements</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }}>
        {products && products.map((flower) => (
          <div 
            key={flower._id} 
            style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #FDF4EE', 
              borderRadius: '24px', 
              padding: '16px', 
              boxShadow: '0px 10px 25px rgba(194,149,110,0.03)', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '390px'
            }}
          >
            <div>
              <div style={{ width: '100%', height: '180px', borderRadius: '18px', overflow: 'hidden', backgroundColor: '#FFF5EF', marginBottom: '12px' }}>
                <img 
                  src={flower.image || flower.imageUrl || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400"} 
                  alt={flower.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400";
                  }}
                />
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#4a3f35', margin: '0 0 4px 0', height: '24px', overflow: 'hidden' }}>{flower.name}</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#cd9b64', margin: '0 0 8px 0' }}>${flower.price?.toFixed(2)}</p>
              <p style={{ fontSize: '0.8rem', color: '#8e8376', lineHeight: '1.4', margin: '0 0 15px 0', height: '36px', overflow: 'hidden' }}>{flower.description}</p>
            </div>

            <button 
              onClick={() => onAddToCart && onAddToCart(flower)} 
              style={addToCartBtnGridStyle}
            >
              🛒 Add to Basket
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const addToCartBtnGridStyle = { width: '100%', backgroundColor: '#fdf6f0', border: '1px solid #ebd9ca', padding: '11px', borderRadius: '12px', color: '#8d735b', fontWeight: '600', fontSize: '13px', cursor: 'pointer', outline: 'none' };

export default ProductCatalog;