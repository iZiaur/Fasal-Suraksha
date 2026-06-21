import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <img
          src="/images/hero-bg.png"
          alt="Indian farmer in a lush green agricultural field at sunset"
          loading="eager"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-content">
        {/* Left Side — Glassmorphic Widgets */}
        <div className="hero-widgets">
          {/* Live Weather Widget */}
          <div className="weather-widget glass-card">
            <div className="weather-widget-header">
              <div>
                <div className="weather-widget-label">Live Weather</div>
                <div className="weather-widget-location">Barmer, Rajasthan</div>
              </div>
              <div className="weather-widget-icon">☀️</div>
            </div>
            <div className="weather-temp">
              +47°<sub>C</sub>
            </div>
            <div className="weather-alert">Extreme Heat Alert</div>
            <div className="weather-stats">
              <div>
                <div className="weather-stat-label">Humidity</div>
                <div className="weather-stat-value">28%</div>
              </div>
              <div>
                <div className="weather-stat-label">Rainfall</div>
                <div className="weather-stat-value">0.0 mm</div>
              </div>
              <div>
                <div className="weather-stat-label">Wind</div>
                <div className="weather-stat-value">18 km/h</div>
              </div>
            </div>
          </div>

          {/* NDVI / Crop Health Widget */}
          <div className="ndvi-widget glass-card">
            <div className="ndvi-header">
              <div>
                <div className="ndvi-title">Crop Health Index</div>
                <div className="ndvi-subtitle">NDVI — Wheat Field A3</div>
              </div>
              <div className="ndvi-value">
                <span className="ndvi-value-number">0.45</span>
                <span className="ndvi-value-arrow">↓</span>
              </div>
            </div>
            <div className="ndvi-bars">
              <div className="ndvi-bar healthy" style={{ height: '85%' }}></div>
              <div className="ndvi-bar healthy" style={{ height: '90%' }}></div>
              <div className="ndvi-bar healthy" style={{ height: '80%' }}></div>
              <div className="ndvi-bar healthy" style={{ height: '75%' }}></div>
              <div className="ndvi-bar warning" style={{ height: '55%' }}></div>
              <div className="ndvi-bar danger" style={{ height: '35%' }}></div>
              <div className="ndvi-bar danger" style={{ height: '25%' }}></div>
            </div>
            <div className="ndvi-months">
              <span className="ndvi-month">Jan</span>
              <span className="ndvi-month">Feb</span>
              <span className="ndvi-month">Mar</span>
              <span className="ndvi-month">Apr</span>
              <span className="ndvi-month">May</span>
              <span className="ndvi-month">Jun</span>
              <span className="ndvi-month">Jul</span>
            </div>
            <div className="ndvi-alert">
              <span className="ndvi-alert-dot"></span>
              Drought stress detected in May–Jun
            </div>
          </div>
        </div>

        {/* Right Side — Hero Text */}
        <div className="hero-text">
          <div className="hero-tag">
            Climate-Smart Insurance <span style={{ margin: '0 8px', opacity: 0.5 }}>•</span> <span style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>कृषि सुरक्षा</span>
          </div>

          <h1 className="hero-title">
            Protect Your<br />
            Harvest.<br />
            Get Paid Instantly.
          </h1>

          <p className="hero-description">
            A hackathon prototype for automated crop insurance by Team Drishti.
            No paperwork. No surveyors. Instant payouts triggered by real-time
            weather data directly to your UPI.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="hero-btn-primary">
              Insure My Farm <span>→</span>
            </Link>
            <a href="#how-it-works" className="hero-btn-secondary">
              See How It Works <span>↗</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="hero-social-proof">
            <div className="hero-avatars">
              <div className="hero-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=60" alt="" />
              </div>
              <div className="hero-avatar">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=60" alt="" />
              </div>
              <div className="hero-avatar">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=60" alt="" />
              </div>
              <div className="hero-avatar">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=60" alt="" />
              </div>
            </div>
            <span className="hero-proof-text">
              Built for the Future of Farming
            </span>
            <span className="hero-proof-check">✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
