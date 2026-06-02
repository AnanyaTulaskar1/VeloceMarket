import React, { useState } from 'react';
import API from './api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const response = await API.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      setStatus({ type: 'success', message: `🎉 Welcome, ${response.data.name}! Account created.` });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Registration failed. Try a different email!' 
      });
    }
  };

  return (
    <div style={cardStyle}>
      <div style={headerContainer}>
        <h2 style={titleStyle}>ShopStream</h2>
        <p style={subtitleStyle}>Create your marketplace account</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Account Role</label>
          <select name="role" onChange={handleChange} style={inputStyle}>
            <option value="customer">🛒 Customer (Standard User)</option>
            <option value="admin">⚡ Admin (Store Manager)</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Create Account
        </button>
      </form>

      {status.message && (
        <div style={{
          ...messageBoxStyle,
          backgroundColor: status.type === 'success' ? '#ef444415' : '#ef444415',
          color: status.type === 'success' ? '#22c55e' : '#ef4444',
          border: `1px solid ${status.type === 'success' ? '#22c55e30' : '#ef444430'}`
        }}>
          {status.message}
        </div>
      )}
    </div>
  );
};

/* --- PREMIUM STYLING OBJECTS --- */
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  width: '100%',
  maxWidth: '420px',
  boxSizing: 'border-box',
  animation: 'fadeIn 0.4s ease-out',
};

const headerContainer = {
  textAlign: 'center',
  marginBottom: '28px',
};

const titleStyle = {
  margin: '0 0 6px 0',
  fontSize: '28px',
  fontWeight: '800',
  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const subtitleStyle = {
  margin: '0',
  color: '#64748b',
  fontSize: '14px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#475569',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: '15px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  color: '#1e293b',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
  marginTop: '10px',
  transition: 'transform 0.1s ease',
};

const messageBoxStyle = {
  marginTop: '20px',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '14px',
  fontWeight: '500',
};

export default Register;