import React, { useEffect, useRef } from 'react';
import './HowItWorks.css';

/* ──────────────────────────────────────────
   Step data — each card's content & image
   ────────────────────────────────────────── */
const steps = [
  {
    number: '01',
    title: 'Register Your Plot',
    description:
      'Drop a pin on the map to mark your farm. Select your crop type and coverage period. Done in 60 seconds.',
    image:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Satellite chip on a wooden table representing farm registration',
    /* SVG icon: map-pin / location */
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Watch the Weather',
    description:
      'Our system monitors rainfall, temperature, and soil moisture 24/7 using satellite data and local weather stations for your exact GPS location.',
    image:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Weather monitoring radar screen with data visualisation',
    /* SVG icon: radar / signal */
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12a10 10 0 0 1 18-6" />
        <path d="M6 12a6 6 0 0 1 10.8-3.6" />
        <circle cx="12" cy="12" r="2" />
        <path d="m2 2 20 20" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Auto-Payout via UPI',
    description:
      'If drought, flood, or heatwave thresholds are breached, money hits your bank account automatically. No claim forms. No waiting.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Smartphone showing a UPI payment confirmation screen',
    /* SVG icon: credit-card / payment */
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────
   Platform module pills shown below cards
   ────────────────────────────────────────── */
const modules = [
  {
    label: 'SatelliteWatch',
    icon: (
      /* satellite icon */
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
        <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
  {
    label: 'WeatherOracle',
    icon: (
      /* cloud icon */
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    label: 'SmartPayout',
    icon: (
      /* lightning / zap icon */
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'FarmAssist',
    icon: (
      /* leaf icon */
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────
   HowItWorks Component
   ────────────────────────────────────────── */
const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Gather all elements we want to animate */
    const cards = section.querySelectorAll('.howItWorks__card');
    const modulesRow = section.querySelector('.howItWorks__modules');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* Add the --visible modifier class */
            if (entry.target.classList.contains('howItWorks__card')) {
              entry.target.classList.add('howItWorks__card--visible');
            }
            if (entry.target.classList.contains('howItWorks__modules')) {
              entry.target.classList.add('howItWorks__modules--visible');
            }
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    if (modulesRow) observer.observe(modulesRow);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="howItWorks" ref={sectionRef} id="how-it-works">
      <div className="container">
        {/* ── Section header ── */}
        <div className="howItWorks__header">
          <span className="section-tag">How It Works</span>
          <h2 className="howItWorks__heading">
            From Registration to Payout —{' '}
            <em style={{ fontStyle: 'normal', color: 'var(--color-primary)' }}>
              In 3 Simple Steps.
            </em>{' '}
            Zero Paperwork.
          </h2>
        </div>

        {/* ── Step cards ── */}
        <div className="howItWorks__grid">
          {steps.map((step) => (
            <article className="howItWorks__card" key={step.number}>
              {/* Card image */}
              <div className="howItWorks__cardImageWrap">
                <img
                  className="howItWorks__cardImage"
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                />
                <span className="howItWorks__stepBadge">Step {step.number}</span>
              </div>

              {/* Card body */}
              <div className="howItWorks__cardBody">
                <div className="howItWorks__iconWrap">{step.icon}</div>
                <h3 className="howItWorks__cardTitle">{step.title}</h3>
                <p className="howItWorks__cardDesc">{step.description}</p>
              </div>

              {/* Progress bar */}
              <div className="howItWorks__progressBar">
                <div className="howItWorks__progressFill" />
              </div>
            </article>
          ))}
        </div>

        {/* ── Platform modules ── */}
        <div className="howItWorks__modules">
          <span className="howItWorks__modulesLabel">Platform modules:</span>
          {modules.map((mod) => (
            <span className="howItWorks__modulePill" key={mod.label}>
              <span className="howItWorks__modulePillIcon">{mod.icon}</span>
              {mod.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
