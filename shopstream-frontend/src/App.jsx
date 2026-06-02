import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import API from './api';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ProductShowcase from './ProductShowcase';
import ProductCatalog from './ProductCatalog';

// =========================================================================
// PHASE 2: ADMIN PANEL COMPONENT
// =========================================================================
const AdminPanel = ({ onProductCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('5');
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Multi-part form data initialization for image file uploads (Cloudinary)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('stock', stock);
      formData.append('image', imageFile); 

      await API.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      alert('✨ Product uploaded and deployed successfully!');
      
      // Reset input fields
      setName(''); setDescription(''); setPrice(''); setCategory(''); setImageFile(null);
      
      // Trigger instant storefront refresh across parent components
      if (onProductCreated) onProductCreated();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing cloud catalog submission.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FDF8F5', padding: '35px', borderRadius: '24px', border: '2px dashed #bd9672', marginBottom: '40px' }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#4a3f35', fontFamily: 'serif', fontSize: '1.6rem' }}>Studio Catalog Manager (Admin Mode) 🛠️</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#8e8376' }}>Direct deployment integration tracking database values + Cloudinary URL returns.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required style={contactInputStyle} />
          <input type="number" placeholder="Price ($)" value={price} onChange={e => setPrice(e.target.value)} required style={contactInputStyle} />
          <input type="text" placeholder="Category (e.g., Tulips, Roses)" value={category} onChange={e => setCategory(e.target.value)} required style={contactInputStyle} />
          <input type="number" placeholder="Initial Stock" value={stock} onChange={e => setStock(e.target.value)} required style={contactInputStyle} />
        </div>
        <textarea placeholder="Product Description..." value={description} onChange={e => setDescription(e.target.value)} required rows="3" style={{ ...contactInputStyle, resize: 'none' }}></textarea>
        
        <div style={{ backgroundColor: '#FFFFFF', padding: '15px', borderRadius: '12px', border: '1px solid #ebd9ca' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '5px' }}>Upload Asset Image File:</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required style={{ fontSize: '13px' }} />
        </div>

        <button type="submit" disabled={submitting} style={{ ...contactSubmitBtnStyle, backgroundColor: '#4a3f35', width: '200px', alignSelf: 'flex-start' }}>
          {submitting ? 'Uploading to cloud...' : 'Deploy Product ✨'}
        </button>
      </form>
    </div>
  );
};

// =========================================================================
// MAIN STOREFRONT LAYOUT
// =========================================================================
const StorefrontLayout = ({ products, loading, error, onLogout, refreshCatalog,userRole }) => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch initial products AND the authenticated user's cart
  useEffect(() => {
    if (products && products.length > 0) {
      setActiveProduct(products[0]);
    }
    
    const fetchUserCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // GET /api/cart expects an Authorization Bearer header
        const response = await API.get('/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Map backend data structure into your local state
        if (response.data && response.data.items) {
          const formattedCart = response.data.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image || item.product.imageUrl,
            quantity: item.quantity
          }));
          setCart(formattedCart);
        }
      } catch (err) {
        console.error("Error fetching cart from database:", err);
      }
    };

    fetchUserCart();
  }, [products]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', color: '#bd9672', fontFamily: 'sans-serif' }}>Loading your beautiful flower collection...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '100px', color: 'red', fontFamily: 'sans-serif' }}>{error}</div>;

  const currentProduct = activeProduct || {
    name: "Signature Pastel Tulip Bouquet",
    description: "Exquisitely hand-crafted premium chenille pipe cleaner flower arrangement. Soft, durable, and everlasting art piece.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400"
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      await API.post('/cart', 
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prevCart) => {
        const isItemInCart = prevCart.find((item) => item._id === product._id);
        if (isItemInCart) {
          return prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      
      setIsCartOpen(true);
    } catch (err) {
      alert("Could not sync added item to your cloud cart.");
    }
  };

  const updateQuantity = async (id, amount) => {
    try {
      const token = localStorage.getItem('token');
      const currentItem = cart.find(item => item._id === id);
      if (!currentItem) return;

      const newQty = currentItem.quantity + amount;

      if (newQty <= 0) {
        await API.delete(`/cart/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCart(prevCart => prevCart.filter(item => item._id !== id));
      } else {
        await API.post('/cart', 
          { productId: id, quantity: amount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCart(prevCart =>
          prevCart.map(item => item._id === id ? { ...item, quantity: newQty } : item)
        );
      }
    } catch (err) {
      console.error("Failed adjusting server cart records:", err);
    }
  };

  const totalCartPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
return (
    <div style={{ backgroundColor: '#FAD6C0', minHeight: '100vh', padding: '30px 10px', fontFamily: '"Poppins", sans-serif', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', maxWidth: '1280px', margin: '0 auto', boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.05)', padding: '35px 50px', overflow: 'hidden' }}>
        
        <Navbar cartCount={totalItemsCount} onCartClick={() => setIsCartOpen(true)} onLogout={onLogout} />
        
        {/* Main Banner Showcase */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0 60px 0' }}>
          <HeroSection product={currentProduct} onAddToCart={addToCart} /> 
          <ProductShowcase 
            currentImage={currentProduct.image || currentProduct.imageUrl}
            allProducts={products ? products.slice(0, 3) : []} 
            activeProductId={currentProduct._id}
            onSelectProduct={(prod) => setActiveProduct(prod)}
          />
        </div>

        {/* Dynamic Catalog Section Grid */}
        <div style={{ borderTop: '2px solid #FFF2EA', paddingTop: '30px', marginBottom: '60px' }}>
          
          {/* 2. CHANGER HERE: Wrap the Admin Panel inside this logical AND (&&) verification statement */}
          {userRole === 'admin' && (
            <AdminPanel onProductCreated={refreshCatalog} />
          )}

          <ProductCatalog products={products || []} onAddToCart={addToCart} />
        </div>

        {/* About Us Section */}
        <section id="about-us-section" style={{ borderTop: '2px solid #FFF2EA', paddingTop: '50px', paddingBottom: '50px', scrollMarginTop: '30px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#4a3f35', fontFamily: 'serif', margin: '0 0 15px 0' }}>Our Story & Craftsmanship</h2>
              <p style={{ color: '#8e8376', lineHeight: '1.7', fontSize: '15px', margin: '0 0 15px 0' }}>
                Welcome to VeloceMarket, where timeless artistry meets sustainable beauty. Every item in our catalog is meticulously handcrafted by dedicated artisans using premium chenille pipe cleaner yarn strands. 
              </p>
            </div>
            <div style={{ flex: '1', minWidth: '300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ backgroundColor: '#FDF4EE', padding: '25px', borderRadius: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>💝</span>
                <h4 style={{ margin: '10px 0 5px 0', color: '#4a3f35' }}>100% Handmade</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#8e8376' }}>Crafted meticulously node by node with absolute love.</p>
              </div>
              <div style={{ backgroundColor: '#FDF4EE', padding: '25px', borderRadius: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🌿</span>
                <h4 style={{ margin: '10px 0 5px 0', color: '#4a3f35' }}>Everlasting Art</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#8e8376' }}>No wilting or watering required. Premium durable quality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact-us-section" style={{ borderTop: '2px solid #FFF2EA', paddingTop: '50px', paddingBottom: '20px', scrollMarginTop: '30px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#4a3f35', fontFamily: 'serif', margin: '0 0 30px 0', textAlign: 'center' }}>Connect With Our Studio</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
            <div style={{ flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#fcf6f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📍</div>
                <div>
                  <h4 style={{ margin: 0, color: '#4a3f35' }}>Studio Address</h4>
                  <p style={{ margin: 0, color: '#8e8376', fontSize: '14px' }}>742 Creative Artisan Boulevard, Suite 100, NY</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#fcf6f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>✉️</div>
                <div>
                  <h4 style={{ margin: 0, color: '#4a3f35' }}>Email Inquiry</h4>
                  <p style={{ margin: 0, color: '#8e8376', fontSize: '14px' }}>support@velocemarket.com</p>
                </div>
              </div>
            </div>

            <div style={{ flex: '1.5', minWidth: '320px', backgroundColor: '#FDF8F5', padding: '30px', borderRadius: '24px', border: '1px solid #FAF0E6' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#4a3f35', fontSize: '1.2rem' }}>Drop Us a Quick Message</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); e.target.reset(); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="Your Name" required style={contactInputStyle} />
                  <input type="email" placeholder="Email Address" required style={contactInputStyle} />
                </div>
                <textarea placeholder="Write down your requests..." required rows="4" style={{ ...contactInputStyle, resize: 'none' }}></textarea>
                <button type="submit" style={contactSubmitBtnStyle}>Send Message ✨</button>
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* Slide-out Sidebar Drawer Overlay */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(74, 63, 53, 0.4)', zIndex: 998 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '380px', height: '100vh', backgroundColor: '#FFFFFF', zIndex: 999, padding: '30px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 40px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid #f9ebd9', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#4a3f35', fontFamily: 'serif', fontSize: '1.5rem' }}>Your Basket 🛒</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8e8376' }}>✕</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#a29688', marginTop: '50px' }}>Your basket is empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item._id} style={{ display: 'flex', gap: '15px', alignItems: 'center', backgroundColor: '#fdfaf7', padding: '12px', borderRadius: '16px' }}>
                    <img src={item.image || item.imageUrl} alt="" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', color: '#4a3f35', fontSize: '13px' }}>{item.name}</h4>
                      <p style={{ margin: 0, color: '#cd9b64', fontWeight: '700', fontSize: '13px' }}>${(item.price * item.quantity).toFixed(2)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                        <button onClick={() => updateQuantity(item._id, -1)} style={{ border: 'none', backgroundColor: '#ebd9ca', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>−</button>
                        <span style={{ fontSize: '13px' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} style={{ border: 'none', backgroundColor: '#ebd9ca', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '2px dashed #ebd9ca' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span style={{ fontWeight: '600' }}>Total:</span>
                    <span style={{ fontWeight: '800', color: '#cd9b64', fontSize: '1.2rem' }}>${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button onClick={() => alert('Proceeding to checkout...')} style={{ width: '100%', backgroundColor: '#bd9672', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Secure Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const contactInputStyle = { width: '100%', border: '1px solid #ebd9ca', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '12px', outline: 'none', fontSize: '14px', color: '#4a3f35', boxSizing: 'border-box' };
const contactSubmitBtnStyle = { width: '100%', backgroundColor: '#bd9672', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '5px' };

// =========================================================================
// PARENT APPLICATION COMPONENT
// =========================================================================
// =========================================================================
// PARENT APPLICATION COMPONENT (UPDATED FOR ROLE MANAGEMENT)
// =========================================================================
// =========================================================================
// PARENT APPLICATION COMPONENT (ROUTING & AUTHRORIZATION FIX)
// =========================================================================
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Clean state tracking checked against active storage items
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  const fetchBoutiqueCatalog = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Could not stream boutique items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBoutiqueCatalog();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Executed instantly when Login.jsx passes up server metadata
  const handleLoginSuccess = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      
      // Fallback safely to customer role if backend value is undefined [cite: 42]
      const role = userData.role || 'customer'; 
      localStorage.setItem('userRole', role);
      
      setUserRole(role);
      setIsLoggedIn(true);
    }
  };
// ... inside your App component ...
  return (
    <Router>
      <Routes>
        {/* Add it here, right alongside your Login route */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        
        {/* THIS IS THE LINE TO ADD: */}
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />} />
        
        <Route 
  path="/dashboard" 
  element={
    isLoggedIn ? (
      <StorefrontLayout 
        products={products} 
        loading={loading} 
        userRole={userRole}
        onLogout={() => {
          localStorage.clear(); // Clear everything
          setIsLoggedIn(false); // Force state change
          setUserRole(null);
          window.location.href = '/login'; // Force a hard redirect
        }} 
      />
    ) : (
      <Navigate to="/login" replace />
    )
  } 
/>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
// ...
}

export default App;