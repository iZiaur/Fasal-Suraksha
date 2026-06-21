import React, { useEffect, useRef, useState } from 'react';
import './ImpactInnovation.css';

/**
 * ImpactInnovation Component
 * 
 * Two-column layout showcasing Fasal Suraksha's impact metrics,
 * insurance protection card, and crop coverage gallery.
 * Uses IntersectionObserver for staggered scroll-in animations.
 */

/* ===== Inline SVG Icons ===== */

const FireIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const DroughtIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const FloodIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 14.1c1.32 0 2.4-1.1 2.4-2.43 0-.7-.34-1.36-1.03-1.92-.66-.53-1.1-1.26-1.37-2.15-.27.89-.7 1.62-1.37 2.15-.69.56-1.03 1.22-1.03 1.92 0 1.33 1.08 2.43 2.4 2.43z" />
    <path d="M20 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S20.29 6.75 20 5.3c-.29 1.45-1.14 2.84-2.29 3.76S16 11.1 16 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M2 20h20" />
    <path d="M2 22h20" />
  </svg>
);

const RupeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3c3.5 0 6-2.5 6-5H6" />
  </svg>
);

const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* ===== Protection Data ===== */

const protectionItems = [
  {
    id: 'heat',
    icon: <FireIcon />,
    iconClass: 'heat',
    label: 'Extreme Heatwaves (>45°C)',
  },
  {
    id: 'drought',
    icon: <DroughtIcon />,
    iconClass: 'drought',
    label: 'Drought (No rain >30 days)',
  },
  {
    id: 'flood',
    icon: <FloodIcon />,
    iconClass: 'flood',
    label: 'Excess Rainfall & Floods',
  },
];

/* ===== Crop Gallery Data ===== */

const cropGallery = [
  {
    id: 'rice',
    label: 'Rice Paddies',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'wheat',
    label: 'Wheat Fields',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cotton',
    label: 'Cotton Farms',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
  },
];

/* ===== Component ===== */

const ImpactInnovation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Scroll-triggered animation via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="impact-section" ref={sectionRef} id="impact">
      <div className="impact-container">
        <div className="impact-grid">

          {/* ============================
              LEFT COLUMN — Image + Shield Card
              ============================ */}
          <div className={`impact-left ${isVisible ? 'animate' : ''}`}>
            {/* Farmer hero image */}
            <div className="impact-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80"
                alt="Farmer standing in golden fields at sunset with harvester"
                loading="lazy"
              />
            </div>

            {/* Overlapping Shield Card */}
            <div className={`shield-card ${isVisible ? 'animate' : ''}`}>
              <h3 className="shield-card-title">Your Farm. Your Shield.</h3>
              <p className="shield-card-subtitle">So You're Protected Against:</p>

              <div className="protection-list">
                {protectionItems.map((item) => (
                  <div className="protection-item" key={item.id}>
                    <div className={`protection-icon ${item.iconClass}`}>
                      {item.icon}
                    </div>
                    <span className="protection-text">{item.label}</span>
                    <span className="protection-check">
                      <CheckIcon />
                    </span>
                  </div>
                ))}
              </div>

              <button className="shield-cta" type="button">
                Get Insured Now
                <span className="arrow"><ArrowIcon /></span>
              </button>
            </div>
          </div>

          {/* ============================
              RIGHT COLUMN — Content + Stats + Gallery
              ============================ */}
          <div className={`impact-right ${isVisible ? 'animate' : ''}`}>
            {/* Tag with line decoration */}
            <div className="impact-tag">
              <span className="impact-tag-line" />
              IMPACT & INNOVATION
            </div>

            {/* Main heading */}
            <h2 className="impact-heading">
              Growing <span className="green">Resilience</span>
            </h2>

            {/* Description */}
            <p className="impact-description">
              We're leveraging satellite data and smart contracts to make crop
              insurance instant, transparent, and corruption-free for every
              small-hold farmer in India.
            </p>

            {/* Stat Cards */}
            <div className="stats-grid">
              {/* Stat 1 — Payouts */}
              <div
                className={`stat-card ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: '0.4s' }}
              >
                <div className="stat-icon">
                  <RupeeIcon />
                </div>
                <div className="stat-value">₹12 Cr+</div>
                <div className="stat-label">
                  Payouts Triggered Automatically in 2026
                </div>
              </div>

              {/* Stat 2 — Speed */}
              <div
                className={`stat-card ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: '0.55s' }}
              >
                <div className="stat-icon">
                  <LightningIcon />
                </div>
                <div className="stat-value">&lt; 4 Hours</div>
                <div className="stat-label">
                  Average Time from Weather Event to Farmer Payout
                </div>
              </div>
            </div>

            {/* Crop Gallery */}
            <div className="crop-gallery">
              {cropGallery.map((crop, index) => (
                <div
                  className={`crop-card ${isVisible ? 'animate' : ''}`}
                  key={crop.id}
                  style={{ animationDelay: `${0.6 + index * 0.12}s` }}
                >
                  <img
                    src={crop.image}
                    alt={crop.label}
                    loading="lazy"
                  />
                  <div className="crop-overlay">
                    <span className="crop-label">{crop.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactInnovation;
