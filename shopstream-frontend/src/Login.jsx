import React, { useState } from 'react';
import API from './api';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
    
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        
        // REMOVE OR COMMENT OUT THIS LINE:
        // alert(`Welcome back, ${response.data.name}! ✨`);
        
        // The onLoginSuccess() call handles the redirect to your dashboard automatically
        onLoginSuccess(response.data);
      }
    } catch (err) {
      console.error("Login Error details:", err);
      if (!err.response) {
        alert("Network Error: Cannot connect to your Node server.");
      } else {
        alert(err.response.data.message || "Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAD6C0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 10px', fontFamily: '"Poppins", sans-serif', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', width: '100%', maxWidth: '480px', boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.05)', padding: '45px 50px', boxSizing: 'border-box', textAlign: 'center' }}>
        
        {/* Custom Brand Logo / Header matching original styling */}
        <h2 style={{ fontSize: '2.4rem', color: '#4a3f35', fontFamily: 'serif', margin: '0 0 10px 0' }}>VeloceMarket</h2>
        <p style={{ color: '#8e8376', fontSize: '14px', lineHeight: '1.6', margin: '0 0 35px 0' }}>
          Welcome back to our artisan studio portal. Please authenticate to step into your flower dashboard.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '8px' }}>
              Username / Email Address
            </label>
            <input 
              type="email" 
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={contactInputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '8px' }}>
              Account Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={contactInputStyle}
            />
          </div>

          {/* Secure Login Button themed with boutique aesthetic colors */}
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              ...contactSubmitBtnStyle, 
              opacity: loading ? 0.7 : 1, 
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '15px'
            }}
          >
            {loading ? "Verifying Credentials... ⏳" : "Secure Login ✨"}
          </button>
        </form>

        {/* Studio Footer Subtext */}
        {/* ... Inside your Return Statement, below the </form> ... */}

<div style={{ marginTop: '25px', fontSize: '13px', textAlign: 'center' }}>
  <p style={{ color: '#8e8376' }}>
    Don't have an account yet?{' '}
    <span 
      onClick={() => window.location.href = '/register'} 
      style={{ 
        color: '#bd9672', 
        cursor: 'pointer', 
        fontWeight: '600',
        textDecoration: 'underline' 
      }}
    >
      Sign up here
    </span>
  </p>
</div>

      </div>
    </div>
  );
}

// Visual layout constants matched exactly with your main layout parameters
const contactInputStyle = { 
  width: '100%', 
  border: '1px solid #ebd9ca', 
  backgroundColor: '#ffffff', 
  padding: '14px 18px', 
  borderRadius: '12px', 
  outline: 'none', 
  fontSize: '14px', 
  color: '#4a3f35', 
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

const contactSubmitBtnStyle = { 
  width: '100%', 
  backgroundColor: '#bd9672', 
  color: '#ffffff', 
  border: 'none', 
  padding: '16px', 
  borderRadius: '12px', 
  fontWeight: '600', 
  fontSize: '15px', 
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(189, 150, 114, 0.2)'
};

export default Login;