import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the dashboard page
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On dashboard, always show scrolled (light) style
  const navClass = `navbar ${scrolled || isDashboard ? 'scrolled' : ''}`;

  return (
    <nav className={navClass}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L8.5 8.5L2 12L8.5 15.5L12 22L15.5 15.5L22 12L15.5 8.5L12 2Z" fill="#D8F3DC"/>
              <path d="M12 6L10 10L6 12L10 14L12 18L14 14L18 12L14 10L12 6Z" fill="#95D5B2"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
            </svg>
          </div>
          Fasal Suraksha
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <a href="#crisis" className="navbar-link">Aim</a>
          <a href="#how-it-works" className="navbar-link">How It Works</a>
          <a href="#coverage-plans" className="navbar-link">Claim</a>
          <a href="#mission" className="navbar-link">About Us</a>
          <Link to="/login" className="navbar-cta">Login / Register</Link>
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
