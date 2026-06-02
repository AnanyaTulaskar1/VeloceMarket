import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import ProductCatalog from './ProductCatalog'; // ✅ Import your beautiful storefront

function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center', padding: '20px' }}>
      
      {isAuthenticated ? (
        // ✅ Renders the dynamic earth-tone landing page upon successful login
        <ProductCatalog />
      ) : (
        <>
          {isLoginView ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register />
          )}

          <button 
            onClick={() => setIsLoginView(!isLoginView)} 
            style={{ marginTop: '20px', background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px', fontWeight: '500' }}
          >
            {isLoginView ? "Don't have an account? Register here" : "Already have an account? Login here"}
          </button>
        </>
      )}

    </div>
  );
}

export default App;