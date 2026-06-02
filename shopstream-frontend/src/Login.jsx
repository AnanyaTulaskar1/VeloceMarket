import React, { useState } from 'react';
import API from './api';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      // Hits your backend login API route
      const response = await API.post('/auth/login', formData);
      
      // Save the new session token in the web browser
      localStorage.setItem('token', response.data.token);
      
      setStatus({ type: 'success', message: '🔒 Login Successful! Redirecting...' });
      
      // Let the main App know we are officially logged in
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Invalid email or password.' 
      });
    }
  };

  return (
    <div style={cardStyle}>
      <div style={headerContainer}>
        <h2 style={titleStyle}>ShopStream</h2>
        <p style={subtitleStyle}>Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={inputStyle} />
        </div>

        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
      </form>

      {status.message && (
        <div style={{
          ...messageBoxStyle,
          backgroundColor: status.type === 'success' ? '#e2fbe8' : '#fdeded',
          color: status.type === 'success' ? '#1b5e20' : '#d32f2f',
          border: `1px solid ${status.type === 'success' ? '#a5d6a7' : '#ef9a9a'}`
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
};

/* --- CLEAN DESIGN OBJECTS --- */
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  width: '100%',
  maxWidth: '420px',
  boxSizing: 'border-box',
};
const headerContainer = { textAlign: 'center', marginBottom: '28px' };
const titleStyle = { margin: '0 0 6px 0', fontSize: '28px', fontWeight: '800', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const subtitleStyle = { margin: '0', color: '#64748b', fontSize: '14px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' };
const inputStyle = { width: '100%', padding: '12px 14px', fontSize: '15px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#f8fafc', boxSizing: 'border-box', outline: 'none' };
const buttonStyle = { width: '100%', padding: '14px', fontSize: '16px', fontWeight: '600', color: '#ffffff', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)', marginTop: '10px' };
const messageBoxStyle = { marginTop: '20px', padding: '12px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', fontWeight: '500' };

export default Login;