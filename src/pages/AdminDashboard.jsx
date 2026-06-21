import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [thresholdDrought, setThresholdDrought] = useState(40);
  const [thresholdHeatwave, setThresholdHeatwave] = useState(45);
  const [thresholdFlood, setThresholdFlood] = useState(200);
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');

  const handleUpdateThreshold = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/settings/threshold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          drought: Number(thresholdDrought),
          heatwave: Number(thresholdHeatwave),
          flood: Number(thresholdFlood)
        })
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
          <div className={`sidebar-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')} style={{cursor: 'pointer'}}>
             <span className="nav-icon">📈</span> Overview
          </div>
          <div className={`sidebar-nav-item ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')} style={{cursor: 'pointer'}}>
             <span className="nav-icon">📜</span> All Policies
          </div>
          <div className={`sidebar-nav-item ${activeTab === 'payouts' ? 'active' : ''}`} onClick={() => setActiveTab('payouts')} style={{cursor: 'pointer'}}>
             <span className="nav-icon">💸</span> Payout Ledgers
          </div>
          <div className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')} style={{cursor: 'pointer'}}>
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
        {activeTab === 'overview' && (
          <>
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

            {/* Recent Payouts Ledger Preview */}
            <section className="admin-section">
              <header className="section-header">
                <h3>💸 Recent Automated Payouts</h3>
              </header>
              <div className="table-responsive">
                <table className="ledger-table">
                  <thead>
                    <tr>
                      <th>TRANSACTION ID</th>
                      <th>FARMER</th>
                      <th>TRIGGER EVENT</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TXN-884920</td>
                      <td>Ramesh Patel (Plot 2)</td>
                      <td className="text-danger">Drought Protocol Breached</td>
                      <td className="amount">₹25,000</td>
                      <td><span className="badge-verified">✓ Disbursed</span></td>
                    </tr>
                    <tr>
                      <td>TXN-884919</td>
                      <td>Sunil Kumar (Plot 1)</td>
                      <td className="text-danger">Heatwave Protocol Breached</td>
                      <td className="amount">₹15,000</td>
                      <td><span className="badge-verified">✓ Disbursed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'policies' && (
          <>
            <header className="admin-topbar">
              <div className="topbar-greeting">
                <h1>All Policies 📜</h1>
                <p>Manage all parametric insurance contracts.</p>
              </div>
            </header>
            <section className="admin-section">
               <div className="table-responsive">
                <table className="ledger-table">
                  <thead>
                    <tr>
                      <th>POLICY ID</th>
                      <th>FARMER</th>
                      <th>COVERAGE TYPE</th>
                      <th>MAX PAYOUT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FS-2026-901</td>
                      <td>Sunil Kumar</td>
                      <td>Heatwave Shield</td>
                      <td className="amount">₹15,000</td>
                      <td><span className="badge-verified">Active</span></td>
                    </tr>
                    <tr>
                      <td>FS-2026-902</td>
                      <td>Ramesh Patel</td>
                      <td>Drought Shield</td>
                      <td className="amount">₹25,000</td>
                      <td><span className="badge-verified">Active</span></td>
                    </tr>
                    <tr>
                      <td>FS-2026-903</td>
                      <td>Anil Sharma</td>
                      <td>Flood Shield</td>
                      <td className="amount">₹50,000</td>
                      <td><span className="badge-verified">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'payouts' && (
          <>
            <header className="admin-topbar">
              <div className="topbar-greeting">
                <h1>Payout Ledgers 💸</h1>
                <p>Complete audit log of all smart contract disbursements.</p>
              </div>
            </header>
            <section className="admin-section">
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
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <header className="admin-topbar">
              <div className="topbar-greeting">
                <h1>Settings ⚙️</h1>
                <p>Configure global parameters for smart contract execution.</p>
              </div>
            </header>
            <section className="admin-section">
              <header className="section-header">
                <h3>Parametric Contract Thresholds</h3>
                <p>Adjust the global environmental triggers. Modifying these will instantly affect active policy monitoring.</p>
              </header>
              <form onSubmit={handleUpdateThreshold} className="settings-panel">
                <div className="setting-item" style={{ marginBottom: '20px' }}>
                  <div className="setting-info">
                    <h4>Drought Trigger (Days)</h4>
                    <p>Consecutive days with &lt;20mm rainfall.</p>
                  </div>
                  <div className="setting-action">
                    <input 
                      type="number" 
                      value={thresholdDrought} 
                      onChange={(e) => setThresholdDrought(e.target.value)} 
                      min="10" 
                      max="100" 
                      required
                    />
                  </div>
                </div>

                <div className="setting-item" style={{ marginBottom: '20px' }}>
                  <div className="setting-info">
                    <h4>Heatwave Trigger (°C)</h4>
                    <p>Peak daytime temperature threshold.</p>
                  </div>
                  <div className="setting-action">
                    <input 
                      type="number" 
                      value={thresholdHeatwave} 
                      onChange={(e) => setThresholdHeatwave(e.target.value)} 
                      min="35" 
                      max="60" 
                      required
                    />
                  </div>
                </div>

                <div className="setting-item" style={{ marginBottom: '30px' }}>
                  <div className="setting-info">
                    <h4>Flood Trigger (mm)</h4>
                    <p>Cumulative rainfall over 30 days.</p>
                  </div>
                  <div className="setting-action">
                    <input 
                      type="number" 
                      value={thresholdFlood} 
                      onChange={(e) => setThresholdFlood(e.target.value)} 
                      min="50" 
                      max="1000" 
                      required
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <button type="submit" disabled={loading} style={{ background: '#0B2545', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                    {loading ? 'Saving...' : 'Save All Thresholds'}
                  </button>
                </div>
              </form>
            </section>
          </>
        )}

      </main>
    </div>
  );
}
