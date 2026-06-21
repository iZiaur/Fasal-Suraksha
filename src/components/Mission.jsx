import React, { useEffect, useRef } from 'react';
import './Mission.css';

/* =========================================
   SVG Icon Components
   Inline SVGs so we don't need an icon library
   ========================================= */

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const LightningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const RupeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4h10" />
    <path d="M7 8h10" />
    <path d="M7 8c0 5.5 3.5 8 7 8" />
    <path d="M7 20l7-8" />
  </svg>
);

/* =========================================
   Data
   ========================================= */

const features = [
  { icon: <ShieldIcon />, label: 'ClimateShield' },
  { icon: <LightningIcon />, label: 'InstantClaim' },
  { icon: <MapPinIcon />, label: 'FarmMap' },
  { icon: <RupeeIcon />, label: 'UPI Payout' },
];

const stats = [
  { value: '1.2L+', label: 'Target Farmers' },
  { value: '₹4.8Cr', label: 'Projected Impact' },
  { value: '<60s', label: 'Avg Trigger-to-UPI Latency (Testnet)' },
  { value: 'Instant', label: 'Payout Goal' },
];

/* Unsplash images — aerial Indian farmland */
const farmImages = [
  {
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    alt: 'Aerial view of lush green farmland at golden hour',
  },
  {
    src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    alt: 'Aerial view of terraced rice paddies',
  },
];

/* =========================================
   Mission Component
   ========================================= */
const Mission = () => {
  const sectionRef = useRef(null);

  /* IntersectionObserver — reveals elements on scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll(
      '.mission__animate, .mission__animate--left, .mission__animate--right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mission" id="mission" ref={sectionRef}>
      <div className="mission__container">
        {/* Section pill tag */}
        <div className="mission__tag mission__animate">
          <span className="section-tag">The Drishti Vision</span>
        </div>

        {/* Two-column grid */}
        <div className="mission__grid">
          {/* ====== LEFT COLUMN ====== */}
          <div className="mission__left">
            {/* Large heading */}
            <h2 className="mission__heading mission__animate--left mission__animate--d1">
              Amidst rising climate extremes, Indian farmers face devastating
              crop losses.
              <span className="mission__heading-muted">
                Traditional insurance fails them with slow payouts and corrupt
                surveyors.
              </span>
              <span className="mission__heading-bold">
                We automate justice.
              </span>
            </h2>

            {/* Two landscape images side-by-side */}
            <div className="mission__images mission__animate--left mission__animate--d3">
              {farmImages.map((img, i) => (
                <div className="mission__image-wrapper" key={i}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* ====== RIGHT COLUMN ====== */}
          <div className="mission__right">
            {/* 2×2 Feature Icons */}
            <div className="mission__features mission__animate--right mission__animate--d2">
              {features.map((feat, i) => (
                <div className="mission__feature" key={i}>
                  <div className="mission__feature-icon">{feat.icon}</div>
                  <span className="mission__feature-label">{feat.label}</span>
                </div>
              ))}
            </div>

            {/* Description paragraph */}
            <p className="mission__description mission__animate--right mission__animate--d3">
              Fasal Suraksha uses real-time satellite imagery, hyper-local
              weather APIs, and smart contract logic to trigger instant
              micro-insurance payouts the moment climate thresholds are
              breached — no human intervention, no corruption, no delays.
            </p>

            {/* Stats row */}
            <div className="mission__stats mission__animate--right mission__animate--d4">
              {stats.map((stat, i) => (
                <div className="mission__stat" key={i}>
                  <div className="mission__stat-value">{stat.value}</div>
                  <div className="mission__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
