import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');

  const toggleLang = () => setLang(l => l === 'en' ? 'hi' : 'en');

  return (
    <div className="login-container">
      <Link to="/" className="login-back">← Back to Home</Link>
      
      <div className="login-header">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M12 2L8.5 8.5L2 12L8.5 15.5L12 22L15.5 15.5L22 12L15.5 8.5L12 2Z" fill="#D8F3DC"/>
            <path d="M12 6L10 10L6 12L10 14L12 18L14 14L18 12L14 10L12 6Z" fill="#95D5B2"/>
            <circle cx="12" cy="12" r="2.5" fill="white"/>
          </svg>
        </div>
        <h1>Welcome to Fasal Suraksha</h1>
        <p>Select your portal to continue</p>
      </div>

      <div className="login-cards">
        {/* Farmer Portal Card */}
        <div className="login-card farmer-card" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', background: '#f0f0f0', borderRadius: '20px', overflow: 'hidden', border: '1px solid #ddd' }}>
            <button onClick={() => setLang('en')} style={{ padding: '4px 10px', fontSize: '12px', background: lang === 'en' ? '#1a3622' : 'transparent', color: lang === 'en' ? 'white' : '#666', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>EN</button>
            <button onClick={() => setLang('hi')} style={{ padding: '4px 10px', fontSize: '12px', background: lang === 'hi' ? '#1a3622' : 'transparent', color: lang === 'hi' ? 'white' : '#666', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>HI</button>
          </div>
          <div className="card-icon">👨‍🌾</div>
          <h2>{lang === 'en' ? 'Farmer Portal' : 'किसान पोर्टल'}</h2>
          <p>{lang === 'en' ? 'Access your parametric policies, view satellite data, and manage your registered plots.' : 'अपनी पैरामीट्रिक पॉलिसियों तक पहुंचें, सैटेलाइट डेटा देखें और अपने पंजीकृत खेतों का प्रबंधन करें।'}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/dashboard" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>{lang === 'en' ? 'Login as Farmer' : 'किसान के रूप में लॉगिन करें'}</Link>
          </div>
        </div>

        {/* Admin Portal Card */}
        <div className="login-card admin-card">
          <div className="card-icon">🏛️</div>
          <h2>Insurance Admin</h2>
          <p>Oversee automated payouts, manage parametric triggers, and audit smart contract performance.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/admin" className="btn-secondary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Login as Administrator</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
