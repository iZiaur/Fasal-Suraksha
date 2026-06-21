import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './Dashboard.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* LEFT SIDEBAR */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path d="M12 2L8.5 8.5L2 12L8.5 15.5L12 22L15.5 15.5L22 12L15.5 8.5L12 2Z" fill="#D8F3DC"/>
              <path d="M12 6L10 10L6 12L10 14L12 18L14 14L18 12L14 10L12 6Z" fill="#95D5B2"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
            </svg>
          </div>
          <div className="sidebar-logo-text">
            Fasal Suraksha
            <span>फसल सुरक्षा</span>
          </div>
        </Link>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </div>
          <div className="sidebar-nav-item">
            <span className="nav-icon">🗺️</span>
            My Farms
          </div>
          <div className="sidebar-nav-item">
            <span className="nav-icon">🛡️</span>
            My Policies
          </div>
          <div className="sidebar-nav-item">
            <span className="nav-icon">💸</span>
            Payout History
          </div>
          <div className="sidebar-nav-item">
            <span className="nav-icon">☁️</span>
            Weather Alerts
          </div>
          <div className="sidebar-nav-item">
            <span className="nav-icon">❓</span>
            Help
          </div>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">RP</div>
          <div className="sidebar-user-info">
            <h4>Ramesh Patel</h4>
            <p>Barmer, Rajasthan</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-greeting">
            <h1>Namaste, Ramesh Ji 🙏</h1>
            <p>Here's your farm overview for today — 18 June 2026</p>
          </div>
          <div className="topbar-actions">
            <div className="notification-bell">
              🔔
              <span className="notification-badge">2</span>
            </div>
            <div className="alerts-pill">
              ⚠️ 2 new alerts
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="dashboard-stats-row">
          <div className="stat-card stat-card-green">
            <div className="stat-card-icon">✓</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Active Policies</span>
              <span className="stat-card-value">2</span>
            </div>
          </div>
          <div className="stat-card stat-card-darkgreen">
            <div className="stat-card-icon">₹</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Total Coverage</span>
              <span className="stat-card-value">₹50,000</span>
            </div>
          </div>
          <div className="stat-card stat-card-orange">
            <div className="stat-card-icon">⚠️</div>
            <div className="stat-card-content">
              <span className="stat-card-label">Weather Alerts</span>
              <span className="stat-card-value text-white">⚠ 1 Critical</span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="dashboard-map-section">
          <header className="section-header">
            <h3>📍 Ramesh's Registered Plots — Barmer District</h3>
          </header>
          <div className="map-container">
            <MapContainer center={[25.75, 71.39]} zoom={8} scrollWheelZoom={false} style={{ height: '350px', width: '100%', borderRadius: 'var(--radius-lg)', zIndex: 0 }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[26.2389, 73.0243]}>
                <Popup>
                  <strong>Plot 1 — Jodhpur</strong><br />
                  Healthy
                </Popup>
              </Marker>
              <Marker position={[25.75, 71.39]}>
                <Popup>
                  <div className="popup-critical">
                    <strong>⚠️ Plot 2 — Barmer</strong><br />
                    39 days no rain<br />
                    <span className="text-danger">Drought trigger at 40 days</span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* Recent Payouts */}
        <section className="dashboard-payouts-section">
          <header className="section-header">
            <h3>Recent Payouts</h3>
            <a href="#view-all" className="link-view-all">View all →</a>
          </header>
          <div className="table-responsive">
            <table className="payouts-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>FARM</th>
                  <th>TRIGGER EVENT</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15 May 2026</td>
                  <td>Plot 1 — Jodhpur</td>
                  <td>Heatwave &gt;45°C for 7 days</td>
                  <td className="amount">₹5,000</td>
                  <td><span className="status-badge success">✓ Paid via UPI</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="dashboard-rightbar">
        {/* Live Weather Card */}
        <div className="rightbar-card weather-card">
          <div className="card-header">
            <span className="icon">📡</span> LIVE WEATHER
          </div>
          <div className="location">Barmer, Rajasthan</div>
          <div className="temperature-critical">
            46°<span className="unit">C</span>
            <span className="badge-critical">Critical</span>
          </div>
          <div className="weather-details">
            <div className="detail-row">
              <span>Rainfall (last 30 days)</span>
              <span className="value danger">0.0 mm</span>
            </div>
            <div className="detail-row">
              <span>Soil Moisture</span>
              <span className="value danger">12%</span>
            </div>
            <div className="detail-row">
              <span>Next Forecast</span>
              <span className="value">No rain — 5 days</span>
            </div>
          </div>
          
          <div className="trigger-progress">
            <div className="progress-header">
              <span>Drought Trigger</span>
              <span>39/40 days</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar critical" style={{ width: '97.5%' }}></div>
            </div>
            <div className="progress-message">97.5% reached — Payout imminent</div>
          </div>
        </div>

        {/* Active Coverage Card */}
        <div className="rightbar-card coverage-card">
          <div className="card-header">
            ACTIVE COVERAGE
          </div>
          <div className="coverage-item">
            <div className="coverage-info">
              <h4>Plot 1 — Jodhpur</h4>
              <p>Wheat</p>
            </div>
            <div className="coverage-amount">₹25,000</div>
          </div>
          <div className="coverage-item">
            <div className="coverage-info">
              <h4>Plot 2 — Barmer</h4>
              <p>Bajra</p>
            </div>
            <div className="coverage-amount">₹25,000</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
