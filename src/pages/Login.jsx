import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleFarmerLogin = (e) => {
    e.preventDefault();
    // MVP mock login
    navigate('/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // MVP mock login
    navigate('/admin');
  };

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
        <div className="login-card farmer-card">
          <div className="card-icon">👨‍🌾</div>
          <h2>Farmer Portal</h2>
          <p>Access your parametric policies, view satellite data, and manage your registered plots.</p>
          <form onSubmit={handleFarmerLogin}>
            <div className="input-group">
              <label>Phone Number (Registered)</label>
              <input type="text" defaultValue="+91 98765 43210" disabled className="mock-input" />
            </div>
            <div className="input-group">
              <label>OTP</label>
              <input type="text" defaultValue="1234" disabled className="mock-input" />
            </div>
            <button type="submit" className="btn-primary">Login as Farmer</button>
          </form>
        </div>

        {/* Admin Portal Card */}
        <div className="login-card admin-card">
          <div className="card-icon">🏛️</div>
          <h2>Insurance Admin</h2>
          <p>Oversee automated payouts, manage parametric triggers, and audit smart contract performance.</p>
          <form onSubmit={handleAdminLogin}>
             <div className="input-group">
              <label>Admin ID</label>
              <input type="text" defaultValue="admin@fasalsuraksha.in" disabled className="mock-input" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" defaultValue="********" disabled className="mock-input" />
            </div>
            <button type="submit" className="btn-secondary">Login as Administrator</button>
          </form>
        </div>
      </div>
    </div>
  );
}
