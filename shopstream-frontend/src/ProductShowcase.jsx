import React from 'react';

const ProductShowcase = ({ currentImage, allProducts, activeProductId, onSelectProduct }) => {
  return (
    <div style={rightSideContainerStyle}>
      {/* Central Interactive Circle background */}
      <div style={circleBackgroundStyle}>
        <div style={glowOverlayStyle}></div>
        <img 
          src={currentImage || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400"} 
          alt="Featured Flower Arrangement" 
          style={productImageStyle} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400";
          }}
        />
        
        {/* Custom Badges */}
        <div style={{ ...badgeStyle, top: '12%', right: '-20px' }}>🌸 100% Handmade</div>
        <div style={{ ...badgeStyle, bottom: '18%', left: '-30px' }}>✨ Everlasting Chenille</div>
      </div>

      {/* Interactive Thumbnails Track */}
      <div style={thumbnailStackStyle}>
        {allProducts && allProducts.map((prod) => {
          const isActive = prod._id === activeProductId;
          return (
            <div 
              key={prod._id} 
              onClick={() => onSelectProduct && onSelectProduct(prod)}
              style={{ 
                ...thumbnailWrapperStyle, 
                border: isActive ? '3px solid #cd9b64' : '3px solid #ffffff',
                transform: isActive ? 'scale(1.12)' : 'scale(1)'
              }}
              title={prod.name}
            >
              <img 
                src={prod.image || prod.imageUrl || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=100"} 
                alt={prod.name} 
                style={thumbnailStyle} 
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=100";
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const rightSideContainerStyle = { position: 'relative', display: 'flex', alignItems: 'center', gap: '40px', minWidth: '450px', justifyContent: 'center' };
const circleBackgroundStyle = { width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#fcd3b6', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 45px rgba(217, 124, 164, 0.12)' };
const glowOverlayStyle = { position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 75%)' };
const productImageStyle = { width: '85%', height: '85%', objectFit: 'cover', borderRadius: '50%', zIndex: 2 };
const badgeStyle = { position: 'absolute', backgroundColor: '#ffffff', padding: '10px 20px', borderRadius: '25px', boxShadow: '0 8px 20px rgba(74, 63, 53, 0.06)', fontSize: '13px', fontWeight: '600', color: '#8d735b', zIndex: 3 };
const thumbnailStackStyle = { display: 'flex', flexDirection: 'column', gap: '15px', zIndex: 3 };
const thumbnailWrapperStyle = { width: '65px', height: '65px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 6px 15px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const thumbnailStyle = { width: '100%', height: '100%', objectFit: 'cover' };

export default ProductShowcase;