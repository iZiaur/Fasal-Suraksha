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
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Simulation States
  const [flashMessage, setFlashMessage] = useState('');
  const [simulationStep, setSimulationStep] = useState(0); 

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await fetch('/api/weather/plot-2');
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

  const handleSimulateTrigger = async (type, label) => {
    // Disable button to prevent double clicks
    setSimulationStep(1);
    
    // Step 1: Scanning
    setFlashMessage('🛰️ Scanning satellite & weather nodes for Barmer...');
    
    setTimeout(() => {
      // Step 2: Analyzing
      setFlashMessage(`⚙️ Analyzing parametric triggers (${label})...`);
      setSimulationStep(2);

      setTimeout(async () => {
        // Step 3: Trigger backend
        setFlashMessage(`🚨 ALERT: ${label} Threshold Breached!`);
        setSimulationStep(3);
        
        await fetch('/api/simulate-trigger', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type })
        });
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
      await fetch('/api/reset-simulation', { method: 'POST' });
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
          <button type="button" className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button type="button" className={`sidebar-nav-item ${activeTab === 'farms' ? 'active' : ''}`} onClick={() => setActiveTab('farms')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">🗺️</span>
            My Farms
          </button>
          <button type="button" className={`sidebar-nav-item ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">🛡️</span>
            My Policies
          </button>
          <button type="button" className={`sidebar-nav-item ${activeTab === 'payouts' ? 'active' : ''}`} onClick={() => setActiveTab('payouts')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">💸</span>
            Payout History
          </button>
          <button type="button" className={`sidebar-nav-item ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">☁️</span>
            Weather Alerts
          </button>
          <button type="button" className={`sidebar-nav-item ${activeTab === 'help' ? 'active' : ''}`} onClick={() => setActiveTab('help')} style={{cursor: 'pointer', background: 'none', border: 'none', width: '100%', textAlign: 'left', fontFamily: 'inherit'}}>
            <span className="nav-icon">❓</span>
            Help
          </button>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">RP</div>
          <div className="sidebar-user-info">
            <h4>Ramesh Patel</h4>
            <p>Barmer, Rajasthan</p>
          </div>
        </div>
      </aside>

      {/* DYNAMIC CONTENT AREA */}
      {activeTab === 'dashboard' && (
        <>
          {/* MAIN CONTENT */}
          <main className="dashboard-main">
            <header className="dashboard-topbar">
          <div className="topbar-greeting">
            <h1>Namaste, Ramesh Ji 🙏</h1>
            <p>Here's your farm overview for today — {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="topbar-actions">
            {!isCritical && simulationStep === 0 ? (
               <div style={{ display: 'flex', gap: '10px' }}>
                 <button 
                  onClick={() => handleSimulateTrigger('drought', 'Drought')} 
                  className="btn-primary" 
                  style={{ backgroundColor: '#D97706', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                >
                  🌩️ Drought
                </button>
                <button 
                  onClick={() => handleSimulateTrigger('heatwave', 'Heatwave')} 
                  className="btn-primary" 
                  style={{ backgroundColor: '#DC2626', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                >
                  🔥 Heatwave
                </button>
                <button 
                  onClick={() => handleSimulateTrigger('flood', 'Flood')} 
                  className="btn-primary" 
                  style={{ backgroundColor: '#2563EB', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-md)', color: 'white', cursor: 'pointer', fontWeight: 600 }}
                >
                  🌊 Flood
                </button>
               </div>
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
                      <strong>{weatherData?.triggerType?.toUpperCase()} trigger breached</strong>
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
                    <td className="text-danger" style={{ color: 'red', textTransform: 'capitalize' }}>{weatherData?.triggerType} Protocol Breached</td>
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
      <aside className="dashboard-right">
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
                  <span style={{ textTransform: 'capitalize' }}>{weatherData?.triggerType || 'Drought'} Trigger</span>
                  <span>{isCritical ? '100' : '30'}%</span>
                </div>
                <div className="progress-bar-container" style={{ background: isCritical ? '#FECACA' : '#BBF7D0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className={`progress-bar ${isCritical ? 'critical' : ''}`} style={{ width: isCritical ? '100%' : '30%', background: isCritical ? 'red' : '#16a34a', height: '100%', transition: 'width 0.5s ease' }}></div>
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
      </>
      )}

      {activeTab === 'farms' && (
        <main className="dashboard-main" style={{ flex: 1 }}>
          <header className="dashboard-topbar">
            <div className="topbar-greeting">
              <h1>My Farms 🗺️</h1>
              <p>Manage your registered plots and GPS coordinates.</p>
            </div>
          </header>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '20px' }}>My Registered Plots</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 1 — Jodhpur</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Wheat <br/>Area: 2 Hectares <br/>Lat/Lon: 26.2389, 73.0243</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 2 — Barmer</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Bajra <br/>Area: 3 Hectares <br/>Lat/Lon: 25.7500, 71.3900</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 3 — Jaisalmer</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Jowar <br/>Area: 5 Hectares <br/>Lat/Lon: 26.9157, 70.9083</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 4 — Bikaner</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Wheat <br/>Area: 4 Hectares <br/>Lat/Lon: 28.0229, 73.3119</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 5 — Kota</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Soybean <br/>Area: 2 Hectares <br/>Lat/Lon: 25.1814, 75.8322</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 6 — Jaipur</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Barley <br/>Area: 1.5 Hectares <br/>Lat/Lon: 26.9124, 75.7873</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 7 — Pali</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Sesame <br/>Area: 3 Hectares <br/>Lat/Lon: 25.7711, 73.3234</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 8 — Ajmer</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Maize <br/>Area: 4 Hectares <br/>Lat/Lon: 26.4499, 74.6399</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 9 — Alwar</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Mustard <br/>Area: 2.5 Hectares <br/>Lat/Lon: 27.5530, 76.6346</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
              <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px' }}>
                <h4>Plot 10 — Sikar</h4>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Crop: Gram <br/>Area: 3 Hectares <br/>Lat/Lon: 27.6094, 75.1398</p>
                <div style={{ marginTop: '10px', color: '#16a34a', fontWeight: 'bold' }}>Status: Active Monitored</div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeTab === 'policies' && (
        <main className="dashboard-main" style={{ flex: 1 }}>
          <header className="dashboard-topbar">
            <div className="topbar-greeting">
              <h1>My Policies 🛡️</h1>
              <p>Your active parametric insurance covers.</p>
            </div>
          </header>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee' }}>
                  <th style={{ padding: '10px' }}>Policy ID</th>
                  <th style={{ padding: '10px' }}>Plot</th>
                  <th style={{ padding: '10px' }}>Coverage Type</th>
                  <th style={{ padding: '10px' }}>Premium Paid</th>
                  <th style={{ padding: '10px' }}>Max Payout</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-901</td>
                  <td style={{ padding: '15px 10px' }}>Plot 1 — Jodhpur</td>
                  <td style={{ padding: '15px 10px' }}>Heatwave Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹99</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹15,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-902</td>
                  <td style={{ padding: '15px 10px' }}>Plot 2 — Barmer</td>
                  <td style={{ padding: '15px 10px' }}>Drought Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹149</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹25,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-903</td>
                  <td style={{ padding: '15px 10px' }}>Plot 3 — Jaisalmer</td>
                  <td style={{ padding: '15px 10px' }}>Flood Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹199</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹50,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-904</td>
                  <td style={{ padding: '15px 10px' }}>Plot 4 — Bikaner</td>
                  <td style={{ padding: '15px 10px' }}>Drought Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹120</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹20,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-905</td>
                  <td style={{ padding: '15px 10px' }}>Plot 5 — Kota</td>
                  <td style={{ padding: '15px 10px' }}>Flood Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹180</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹35,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-906</td>
                  <td style={{ padding: '15px 10px' }}>Plot 6 — Jaipur</td>
                  <td style={{ padding: '15px 10px' }}>Heatwave Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹89</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹12,500</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-907</td>
                  <td style={{ padding: '15px 10px' }}>Plot 7 — Pali</td>
                  <td style={{ padding: '15px 10px' }}>Drought Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹110</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹18,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-908</td>
                  <td style={{ padding: '15px 10px' }}>Plot 8 — Ajmer</td>
                  <td style={{ padding: '15px 10px' }}>Flood Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹160</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹40,000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-909</td>
                  <td style={{ padding: '15px 10px' }}>Plot 9 — Alwar</td>
                  <td style={{ padding: '15px 10px' }}>Heatwave Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹79</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹10,000</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>#FS-2026-910</td>
                  <td style={{ padding: '15px 10px' }}>Plot 10 — Sikar</td>
                  <td style={{ padding: '15px 10px' }}>Drought Shield</td>
                  <td style={{ padding: '15px 10px' }}>₹130</td>
                  <td style={{ padding: '15px 10px', color: '#16a34a', fontWeight: 'bold' }}>₹22,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      )}

      {activeTab === 'payouts' && (
        <main className="dashboard-main" style={{ flex: 1 }}>
          <header className="dashboard-topbar">
            <div className="topbar-greeting">
              <h1>Payout History 💸</h1>
              <p>Record of all automated smart contract settlements.</p>
            </div>
          </header>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', color: '#666', fontSize: '12px' }}>
                  <th style={{ padding: '10px' }}>DATE</th>
                  <th style={{ padding: '10px' }}>FARM</th>
                  <th style={{ padding: '10px' }}>TRIGGER EVENT</th>
                  <th style={{ padding: '10px' }}>AMOUNT</th>
                  <th style={{ padding: '10px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {isCritical && (
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 10px' }}>{new Date().toLocaleDateString('en-GB')}</td>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 2 — Barmer</td>
                    <td style={{ padding: '15px 10px', color: 'red' }}>Drought &gt;40 days no rain</td>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹25,000</td>
                    <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                  </tr>
                )}
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px' }}>15 May 2026</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 1 — Jodhpur</td>
                  <td style={{ padding: '15px 10px' }}>Heatwave &gt;45°C for 7 days</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹15,000</td>
                  <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px' }}>10 Apr 2026</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 4 — Bikaner</td>
                  <td style={{ padding: '15px 10px' }}>Drought &gt;40 days no rain</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹20,000</td>
                  <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px' }}>02 Mar 2026</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 5 — Kota</td>
                  <td style={{ padding: '15px 10px' }}>Flood &gt;200mm rainfall</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹35,000</td>
                  <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px' }}>18 Feb 2026</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 6 — Jaipur</td>
                  <td style={{ padding: '15px 10px' }}>Heatwave &gt;45°C for 7 days</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹12,500</td>
                  <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                </tr>
                <tr>
                  <td style={{ padding: '15px 10px' }}>05 Jan 2026</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>Plot 8 — Ajmer</td>
                  <td style={{ padding: '15px 10px' }}>Flood &gt;200mm rainfall</td>
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹40,000</td>
                  <td style={{ padding: '15px 10px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize:'12px', fontWeight:'bold' }}>✓ Paid via UPI</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      )}

      {activeTab === 'alerts' && (
        <main className="dashboard-main" style={{ flex: 1 }}>
          <header className="dashboard-topbar">
            <div className="topbar-greeting">
              <h1>Weather Alerts ☁️</h1>
              <p>Live satellite monitoring and early warnings for your district.</p>
            </div>
          </header>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {isCritical && (
               <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '20px', borderRadius: '10px' }}>
                 <h3 style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>🚨 CRITICAL: Severe {weatherData?.triggerType} Detected</h3>
                 <p style={{ color: '#991B1B', margin: 0 }}>Barmer District has surpassed the critical threshold for {weatherData?.triggerType}. Payouts have been authorized for affected plots.</p>
                 <div style={{ marginTop: '10px', fontSize: '12px', color: '#DC2626', fontWeight: 'bold' }}>{new Date().toLocaleString()}</div>
               </div>
            )}
             <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '20px', borderRadius: '10px' }}>
                 <h3 style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 10px 0' }}>⚠️ WARNING: Heatwave Approaching</h3>
                 <p style={{ color: '#B45309', margin: 0 }}>Temperatures in Jodhpur expected to exceed 42°C next week. Ensure adequate irrigation.</p>
                 <div style={{ marginTop: '10px', fontSize: '12px', color: '#D97706', fontWeight: 'bold' }}>Yesterday, 14:30 PM</div>
             </div>
          </div>
        </main>
      )}

      {activeTab === 'help' && (
        <main className="dashboard-main" style={{ flex: 1 }}>
          <header className="dashboard-topbar">
            <div className="topbar-greeting">
              <h1>Support & Help ❓</h1>
              <p>We are here for you.</p>
            </div>
          </header>
          <div style={{ background: 'white', padding: '30px', borderRadius: '15px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3>Frequently Asked Questions</h3>
            <div style={{ marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <h4 style={{ color: '#1B4332' }}>How are payouts triggered?</h4>
              <p style={{ color: '#666', marginTop: '5px', lineHeight: '1.5' }}>Our smart contracts are directly linked to OpenWeatherMap API and satellite data. When conditions match your policy parameters, funds are automatically sent.</p>
            </div>
            <div style={{ marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
              <h4 style={{ color: '#1B4332' }}>Do I need to file a claim?</h4>
              <p style={{ color: '#666', marginTop: '5px', lineHeight: '1.5' }}>No. The process is 100% automatic and zero-touch. You will receive an SMS and a UPI credit immediately.</p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#1B4332' }}>Contact Kisan Helpline</h4>
              <p style={{ color: '#666', marginTop: '5px', fontWeight: 'bold' }}>📞 1800-120-XXXX (Toll Free)</p>
            </div>
          </div>
        </main>
      )}

      <UPIPayoutModal 
        isOpen={showUPIModal} 
        onClose={() => setShowUPIModal(false)}
        amount={25000}
        farmerName="Ramesh Patel"
        triggerEvent={`${weatherData?.triggerType?.toUpperCase() || 'DROUGHT'} Protocol Breached`}
      />
    </div>
  );
}
