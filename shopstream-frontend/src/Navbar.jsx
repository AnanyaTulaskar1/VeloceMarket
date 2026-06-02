import React from 'react';
import { getAuthUser } from './api';

const Navbar = ({ cartCount, onCartClick, onLogout }) => {
  const user = getAuthUser();
  const userInitial = user && user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogoutClick = () => {
    // 1. Clear the authentication token from browser storage
    localStorage.removeItem('token');
    
    // 2. Alert the parent app component to update its state immediately
    if (onLogout) {
      onLogout();
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={navStyle}>
      <div style={logoStyle} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span style={logoIconStyle}>🌸</span>
        <span style={{ fontWeight: '700' }}>VeloceMarket</span>
      </div>
      
      <nav style={linksStyle}>
        <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={activeLinkStyle}>Home</span>
        <span onClick={() => scrollToSection('shop-collections')} style={linkItemStyle}>Product</span>
        <span onClick={() => scrollToSection('about-us-section')} style={linkItemStyle}>About</span>
        <span onClick={() => scrollToSection('contact-us-section')} style={linkItemStyle}>Contact</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Cart Widget */}
        <div onClick={onCartClick} style={cartWidgetStyle}>
          <span style={{ fontSize: '18px' }}>🛒</span>
          {cartCount > 0 && (
            <span style={cartCounterBadgeStyle}>{cartCount}</span>
          )}
        </div>
        
        {/* Clean Logout Button */}
        <button onClick={handleLogoutClick} style={logoutBtnStyle}>
          Logout 🏃‍♂️
        </button>

        {/* Dynamic User Avatar Circle */}
        <div title={user ? `Logged in as ${user.name}` : 'User Profile'} style={profileAvatarStyle}>
          {userInitial}
        </div>
      </div>
    </header>
  );
};

/* --- STYLE SPECS --- */
const navStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #f3eade' };
const logoStyle = { fontSize: '22px', color: '#bd9672', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' };
const logoIconStyle = { fontSize: '24px' };
const linksStyle = { display: 'flex', gap: '35px', color: '#a29688', fontSize: '15px', fontWeight: '500' };
const activeLinkStyle = { color: '#bd9672', fontWeight: '700', cursor: 'pointer' };
const linkItemStyle = { cursor: 'pointer', transition: 'color 0.2s' };
const cartWidgetStyle = { position: 'relative', cursor: 'pointer', backgroundColor: '#fcf6f0', padding: '10px 14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const cartCounterBadgeStyle = { position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#cd9b64', color: '#ffffff', borderRadius: '50%', padding: '2px 7px', fontSize: '11px', fontWeight: 'bold' };
const profileAvatarStyle = { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ebd9ca', color: '#8d735b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px', cursor: 'default', textTransform: 'uppercase' };

// Sophisticated minimalist button style that fits the pastel theme
const logoutBtnStyle = { background: 'none', border: '1px solid #ebd9ca', color: '#8e8376', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', backgroundColor: '#fdfaf7' };

export default Navbar;