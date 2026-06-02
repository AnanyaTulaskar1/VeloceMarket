import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Register with role: 'customer' by default
      await API.post('/auth/register', { 
        name, 
        email, 
        password, 
        role: 'customer' 
      });
      
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAD6C0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 10px', fontFamily: '"Poppins", sans-serif', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', width: '100%', maxWidth: '480px', boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.05)', padding: '45px 50px', boxSizing: 'border-box', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.4rem', color: '#4a3f35', fontFamily: 'serif', margin: '0 0 10px 0' }}>Join VeloceMarket</h2>
        <p style={{ color: '#8e8376', fontSize: '14px', lineHeight: '1.6', margin: '0 0 35px 0' }}>
          Create an account to begin your journey with our hand-crafted floral collection.
        </p>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '8px' }}>Full Name</label>
            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required style={contactInputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '8px' }}>Email Address</label>
            <input type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required style={contactInputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4a3f35', marginBottom: '8px' }}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={contactInputStyle} />
          </div>

          <button type="submit" disabled={loading} style={{ ...contactSubmitBtnStyle, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating Account... ⏳" : "Create Account ✨"}
          </button>
        </form>

        <div style={{ marginTop: '25px', fontSize: '13px' }}>
          <p style={{ color: '#8e8376' }}>Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#bd9672', cursor: 'pointer', fontWeight: '600' }}>Login here</span></p>
        </div>
      </div>
    </div>
  );
}

// Reusing same styles for consistent UI
const contactInputStyle = { width: '100%', border: '1px solid #ebd9ca', backgroundColor: '#ffffff', padding: '14px 18px', borderRadius: '12px', outline: 'none', fontSize: '14px', color: '#4a3f35', boxSizing: 'border-box' };
const contactSubmitBtnStyle = { width: '100%', backgroundColor: '#bd9672', color: '#ffffff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '15px' };

export default Register;