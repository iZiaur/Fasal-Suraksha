import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [threshold, setThreshold] = useState(40);
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  const handleUpdateThreshold = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/settings/threshold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newThreshold: Number(threshold) })
      });
      const data = await response.json();
      if (data.success) {
        setFlashMessage('✅ Threshold updated successfully. Smart contracts adjusted.');
        setTimeout(() => setFlashMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to update threshold', error);
      setFlashMessage('❌ Error updating threshold.');
      setTimeout(() => setFlashMessage(''), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="admin-dashboard">
      {flashMessage && (
        <div className="admin-flash-message">
          {flashMessage}
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="admin-sidebar">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{ background: '#FFD166' }}>
            🏛️
          </div>
          <div className="sidebar-logo-text">
            Fasal Suraksha
            <span>Admin Portal</span>
          </div>
        </Link>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-item active">
             <span className="nav-icon">📈</span> Overview
          </div>
          <div className="sidebar-nav-item">
             <span className="nav-icon">📜</span> All Policies
          </div>
          <div className="sidebar-nav-item">
             <span className="nav-icon">💸</span> Payout Ledgers
          </div>
          <div className="sidebar-nav-item">
             <span className="nav-icon">⚙️</span> Settings
          </div>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{ background: '#118AB2' }}>AD</div>
          <div className="sidebar-user-info">
            <h4>Admin User</h4>
            <p>Insurance Co. Ltd.</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-greeting">
            <h1>Parametric Overview 🌍</h1>
            <p>Live monitoring of national agricultural policies and trigger events.</p>
          </div>
          <div className="topbar-actions">
            <button className="btn-logout" onClick={() => window.location.href='/login'}>Logout</button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <div className="stat-info">
              <label>Total Active Policies</label>
              <strong>12,450</strong>
            </div>
          </div>
          <div className="stat-card stat-card-blue">
            <div className="stat-icon">₹</div>
            <div className="stat-info">
              <label>Total Capital Locked</label>
              <strong>₹3.2 Cr</strong>
            </div>
          </div>
          <div className="stat-card stat-card-alert">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <label>Active Weather Threats</label>
              <strong>3 Regions</strong>
            </div>
          </div>
        </div>

        {/* Global Settings Panel */}
        <section className="admin-section">
          <header className="section-header">
            <h3>⚙️ Parametric Contract Settings</h3>
            <p>Adjust the global smart contract thresholds.</p>
          </header>
          <div className="settings-panel">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Drought Trigger Threshold (Days)</h4>
                <p>Number of consecutive days with &lt;20mm rainfall required to automatically trigger a drought payout.</p>
              </div>
              <form onSubmit={handleUpdateThreshold} className="setting-action">
                <input 
                  type="number" 
                  value={threshold} 
                  onChange={(e) => setThreshold(e.target.value)} 
                  min="10" 
                  max="100" 
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Trigger'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Recent Payouts Ledger */}
        <section className="admin-section">
          <header className="section-header">
            <h3>💸 Automated Payout Ledger</h3>
            <p>Recent smart contract disbursements requiring audit/verification.</p>
          </header>
          <div className="table-responsive">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>TRANSACTION ID</th>
                  <th>FARMER</th>
                  <th>TRIGGER EVENT</th>
                  <th>AMOUNT</th>
                  <th>VERIFICATION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TXN-884920</td>
                  <td>Ramesh Patel (Plot 2)</td>
                  <td className="text-danger">Drought Protocol Breached</td>
                  <td className="amount">₹25,000</td>
                  <td><button className="btn-verify">Verify Details</button></td>
                </tr>
                <tr>
                  <td>TXN-884919</td>
                  <td>Sunil Kumar (Plot 1)</td>
                  <td className="text-danger">Heatwave Protocol Breached</td>
                  <td className="amount">₹15,000</td>
                  <td><span className="badge-verified">✓ Verified</span></td>
                </tr>
                <tr>
                  <td>TXN-884918</td>
                  <td>Anil Sharma (Plot 4)</td>
                  <td className="text-danger">Heatwave Protocol Breached</td>
                  <td className="amount">₹5,000</td>
                  <td><span className="badge-verified">✓ Verified</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
