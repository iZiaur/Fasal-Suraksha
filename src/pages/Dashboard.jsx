import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './Dashboard.css';
import UPIPayoutModal from '../components/UPIPayoutModal';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Simulation States
  const [flashMessage, setFlashMessage] = useState('');
  const [simulationStep, setSimulationStep] = useState(0); 

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/weather/plot-2');
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      
      // We no longer automatically trigger the modal here during fetch.
      // We control it manually during the simulation sequence for dramatic effect.
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Poll every 5 seconds
    const interval = setInterval(fetchWeather, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateDrought = async () => {
    // Disable button to prevent double clicks
    setSimulationStep(1);
    
    // Step 1: Scanning
    setFlashMessage('🛰️ Scanning satellite & weather nodes for Barmer...');
    
    setTimeout(() => {
      // Step 2: Analyzing
      setFlashMessage('⚙️ Analyzing parametric triggers (Rainfall & Moisture)...');
      setSimulationStep(2);

      setTimeout(async () => {
        // Step 3: Trigger backend
        setFlashMessage('🚨 ALERT: 40-Day Drought Threshold Breached!');
        setSimulationStep(3);
        
        await fetch('http://localhost:3000/api/simulate-trigger', { method: 'POST' });
        await fetchWeather(); // Force immediate update to red state
        
        setTimeout(() => {
          // Step 4: Payout processing
          setFlashMessage('💸 Executing Smart Contract & Initiating UPI Transfer...');
          setSimulationStep(4);
          
          setTimeout(() => {
            // Step 5: Modal
            setFlashMessage('');
            setShowUPIModal(true);
          }, 2000);
        }, 2500);
      }, 3000);
    }, 3000);
  };

  const handleResetSimulation = async () => {
    try {
      await fetch('http://localhost:3000/api/reset-simulation', { method: 'POST' });
      await fetchWeather();
      setShowUPIModal(false);
      setSimulationStep(0);
      setFlashMessage('');
    } catch (error) {
      console.error('Error resetting simulation:', error);
    }
  };

  const isCritical = weatherData?.status === 'CRITICAL';
  const isScanning = simulationStep > 0 && simulationStep < 3;

  return (
    <div className="dashboard">
      {flashMessage && (
        <div className="demo-flash-message">
          {flashMessage}
        </div>
      )}

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
            <p>Here's your farm overview for today — {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="topbar-actions">
            {!isCritical && simulationStep === 0 ? (
               <button 
                onClick={handleSimulateDrought} 
                className="btn-primary" 
                style={{ backgroundColor: 'var(--color-danger)', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              >
                🌩️ Simulate Drought (Demo)
              </button>
            ) : simulationStep > 0 && simulationStep < 4 ? (
              <button 
                disabled
                className="btn-primary" 
                style={{ backgroundColor: '#666', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'not-allowed', fontWeight: 600 }}
              >
                ⏳ Processing...
              </button>
            ) : (
              <button 
                onClick={handleResetSimulation} 
                className="btn-primary" 
                style={{ backgroundColor: 'var(--color-primary)', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
              >
                🔄 Reset Demo
              </button>
            )}
            <div className="notification-bell">
              🔔
              {isCritical && <span className="notification-badge" style={{position:'absolute', top:'-5px', right:'-5px', background:'red', color:'white', borderRadius:'50%', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>1</span>}
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stat-cards">
          <div className="stat-card stat-card--green">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <label>Active Policies</label>
              <strong>2</strong>
            </div>
          </div>
          <div className="stat-card stat-card--dark">
            <div className="stat-icon">₹</div>
            <div className="stat-info">
              <label>Total Coverage</label>
              <strong>₹50,000</strong>
            </div>
          </div>
          <div className={`stat-card ${isCritical ? 'stat-card--amber' : 'stat-card--green'}`}>
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <label>Weather Alerts</label>
              <strong>{isCritical ? '⚠ 1 Critical' : '✓ All Clear'}</strong>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="dashboard-map-section">
          <header className="section-header">
            <h3>📍 Ramesh's Registered Plots — Barmer District</h3>
          </header>
          <div className={`map-container ${isScanning ? 'map-radar' : ''}`}>
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
                  {isCritical ? (
                    <div className="popup-critical" style={{ color: 'red' }}>
                      <strong>⚠️ Plot 2 — Barmer</strong><br />
                      40 days no rain<br />
                      <strong>Drought trigger breached</strong>
                    </div>
                  ) : (
                    <div>
                       <strong>Plot 2 — Barmer</strong><br />
                       Healthy
                    </div>
                  )}
                </Popup>
              </Marker>
              
              {/* Radar highlight effect during scanning or critical */}
              {(isScanning || isCritical) && (
                <Circle 
                  center={[25.75, 71.39]} 
                  pathOptions={{ 
                    fillColor: isCritical ? 'red' : 'blue', 
                    color: isCritical ? 'red' : 'blue',
                    fillOpacity: isScanning ? 0.2 : 0.4 
                  }} 
                  radius={isScanning ? 30000 : 15000} 
                />
              )}
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
                {isCritical && (
                  <tr style={{ animation: 'fadeInUp 0.5s ease' }}>
                    <td>{new Date().toLocaleDateString('en-GB')}</td>
                    <td>Plot 2 — Barmer</td>
                    <td className="text-danger" style={{ color: 'red' }}>Drought &gt;40 days no rain</td>
                    <td className="amount">₹25,000</td>
                    <td><span className="status-badge success" style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                  </tr>
                )}
                <tr>
                  <td>15 May 2026</td>
                  <td>Plot 1 — Jodhpur</td>
                  <td>Heatwave &gt;45°C for 7 days</td>
                  <td className="amount">₹5,000</td>
                  <td><span className="status-badge success" style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
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
          
          {loading ? (
            <div>Loading live weather...</div>
          ) : (
            <>
              <div className={isCritical ? "temperature-critical" : "temperature-normal"} style={{ fontSize: '3rem', fontWeight: 'bold', color: isCritical ? 'red' : '#2D6A4F', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {weatherData?.data?.temp}°<span className="unit" style={{ fontSize: '1.5rem'}}>C</span>
                {isCritical && <span className="badge-critical" style={{ background: 'red', color: 'white', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px'}}>Critical</span>}
              </div>
              <div className="weather-details" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Rainfall (last 30 days)</span>
                  <span className={`value ${isCritical ? 'danger' : ''}`} style={{ fontWeight: 600, color: isCritical ? 'red' : 'inherit' }}>{weatherData?.data?.rainfall30Days} mm</span>
                </div>
                <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Soil Moisture</span>
                  <span className={`value ${isCritical ? 'danger' : ''}`} style={{ fontWeight: 600, color: isCritical ? 'red' : 'inherit' }}>{weatherData?.data?.soilMoisture}%</span>
                </div>
                <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#666' }}>Status Message</span>
                  <span className="value" style={{ fontWeight: 600, maxWidth: '120px', textAlign: 'right' }}>{weatherData?.data?.message}</span>
                </div>
              </div>
              
              <div className="trigger-progress" style={{ marginTop: '20px', padding: '15px', background: isCritical ? '#FEF2F2' : '#F0FDF4', borderRadius: '10px' }}>
                <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 'bold', color: isCritical ? 'red' : '#166534' }}>
                  <span>Drought Trigger</span>
                  <span>{weatherData?.data?.droughtDays}/{weatherData?.data?.droughtThreshold} days</span>
                </div>
                <div className="progress-bar-container" style={{ background: isCritical ? '#FECACA' : '#BBF7D0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className={`progress-bar ${isCritical ? 'critical' : ''}`} style={{ width: `${(weatherData?.data?.droughtDays / weatherData?.data?.droughtThreshold) * 100}%`, background: isCritical ? 'red' : '#16a34a', height: '100%', transition: 'width 0.5s ease' }}></div>
                </div>
                <div className="progress-message" style={{ fontSize: '0.8rem', marginTop: '8px', color: isCritical ? 'red' : '#166534', fontWeight: 600 }}>
                  {isCritical ? '100% reached — Payout triggered' : 'Safe levels'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Active Coverage Card */}
        <div className="rightbar-card coverage-card" style={{ marginTop: '20px' }}>
          <div className="card-header" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#666', marginBottom: '15px' }}>
            ACTIVE COVERAGE
          </div>
          <div className="coverage-item" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div className="coverage-info">
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#111' }}>Plot 1 — Jodhpur</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Wheat</p>
            </div>
            <div className="coverage-amount" style={{ fontWeight: 'bold', color: '#16a34a' }}>₹25,000</div>
          </div>
          <div className="coverage-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="coverage-info">
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#111' }}>Plot 2 — Barmer</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Bajra</p>
            </div>
            <div className="coverage-amount" style={{ fontWeight: 'bold', color: '#16a34a' }}>₹25,000</div>
          </div>
        </div>
      </aside>

      <UPIPayoutModal 
        isOpen={showUPIModal} 
        onClose={() => setShowUPIModal(false)}
        amount={25000}
        farmerName="Ramesh Patel"
        triggerEvent="40 Days Without Rain (Drought)"
      />
    </div>
  );
}
