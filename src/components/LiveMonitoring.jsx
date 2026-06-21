import React, { useEffect, useRef, useState } from 'react';
import './LiveMonitoring.css';

/* ──────────────────────────────────────────
   India outline SVG (simplified)
   ────────────────────────────────────────── */
const IndiaMapSvg = () => (
  <svg
    className="liveMonitoring__mapSvg"
    viewBox="0 0 300 350"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Simplified India outline path */}
    <path
      d="
        M 130,20 L 145,15 L 160,18 L 175,12 L 195,20 L 210,18
        L 215,30 L 225,35 L 240,30 L 248,40 L 250,55
        L 258,65 L 260,80 L 255,95 L 260,110
        L 265,120 L 268,135 L 262,150 L 258,165
        L 260,180 L 255,195 L 248,210 L 240,225
        L 230,240 L 215,248 L 200,260 L 185,275
        L 170,290 L 158,305 L 150,315 L 145,325 L 140,330
        L 138,320 L 142,305 L 140,290 L 130,278
        L 118,265 L 108,258 L 95,250 L 82,238
        L 72,225 L 65,210 L 58,195 L 55,180
        L 50,168 L 45,155 L 42,140 L 40,125
        L 42,110 L 48,95 L 55,82 L 60,70
        L 68,60 L 75,50 L 85,42 L 95,35
        L 108,28 L 120,22 Z
      "
      stroke="rgba(82, 183, 136, 0.35)"
      strokeWidth="1.5"
      fill="rgba(82, 183, 136, 0.06)"
    />
    {/* Kashmir region detail */}
    <path
      d="M 108,28 L 100,18 L 95,10 L 105,5 L 118,8 L 130,20"
      stroke="rgba(82, 183, 136, 0.25)"
      strokeWidth="1"
      fill="none"
      strokeDasharray="3,3"
    />
  </svg>
);

/* ──────────────────────────────────────────
   Stats data
   ────────────────────────────────────────── */
const stats = [
  { id: 'allFarms', label: 'All Farms', value: '2,847', variant: 'allFarms' },
  { id: 'atRisk', label: 'At Risk', value: '312', variant: 'atRisk' },
  { id: 'payout', label: 'Payout Triggered', value: '142', variant: 'payout' },
  { id: 'healthy', label: 'Healthy', value: '2,393', variant: 'healthy' },
];

/* ──────────────────────────────────────────
   Map dot positions (relative %)
   — each dot represents a farm cluster
   ────────────────────────────────────────── */
const mapDots = [
  // Green (healthy)
  { left: '38%', top: '55%', color: 'green' },
  { left: '48%', top: '42%', color: 'green' },
  { left: '55%', top: '65%', color: 'green' },
  { left: '42%', top: '72%', color: 'green' },
  { left: '60%', top: '50%', color: 'green' },
  { left: '50%', top: '80%', color: 'green' },
  { left: '35%', top: '45%', color: 'green' },
  { left: '58%', top: '38%', color: 'green' },

  // Orange (at risk)
  { left: '45%', top: '35%', color: 'orange' },
  { left: '52%', top: '58%', color: 'orange' },
  { left: '38%', top: '62%', color: 'orange' },

  // Red (critical)
  { left: '33%', top: '30%', color: 'red' },
  { left: '40%', top: '28%', color: 'red' },
];

/* ──────────────────────────────────────────
   Photo cards data
   ────────────────────────────────────────── */
const photos = [
  {
    src: '/images/crowd.png',
    alt: 'Large crowd of people',
    caption: 'Farmers Enrolled in Network',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    alt: 'Data monitoring workstation',
    caption: 'Monitoring Workstation',
  },
];

/* ──────────────────────────────────────────
   LiveMonitoring Component
   ────────────────────────────────────────── */
const LiveMonitoring = () => {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  /* ── Intersection Observer for scroll animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animTargets = section.querySelectorAll(
      '.liveMonitoring__left, .liveMonitoring__right, .liveMonitoring__photos'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.classList.contains('liveMonitoring__left')) {
              el.classList.add('liveMonitoring__left--visible');
            }
            if (el.classList.contains('liveMonitoring__right')) {
              el.classList.add('liveMonitoring__right--visible');
            }
            if (el.classList.contains('liveMonitoring__photos')) {
              el.classList.add('liveMonitoring__photos--visible');
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    animTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Carousel helpers ── */
  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  return (
    <section className="liveMonitoring" ref={sectionRef} id="live-monitoring">
      <div className="container">
        {/* ── Two-column grid ── */}
        <div className="liveMonitoring__grid">

          {/* ═══════════ LEFT COLUMN ═══════════ */}
          <div className="liveMonitoring__left">
            {/* Section tag pill */}
            <span className="section-tag">Live Monitoring</span>

            {/* Stats badges */}
            <div className="liveMonitoring__stats">
              {stats.map((stat) => (
                <div
                  className={`liveMonitoring__statPill liveMonitoring__statPill--${stat.variant}`}
                  key={stat.id}
                >
                  <span className="liveMonitoring__statDot" />
                  {stat.label}
                  <span className="liveMonitoring__statValue">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Heading */}
            <h2 className="liveMonitoring__heading">
              Real-Time Climate{' '}
              <em>Intelligence</em>
            </h2>

            {/* Description */}
            <p className="liveMonitoring__desc">
              Every registered farm is monitored 24/7. When weather parameters
              cross dangerous thresholds, our system acts before disaster strikes.
            </p>

            {/* Carousel pagination */}
            <div className="liveMonitoring__carousel">
              {/* Prev button */}
              <button
                className="liveMonitoring__carouselBtn"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="liveMonitoring__dots">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    className={`liveMonitoring__dot ${i === activeSlide ? 'liveMonitoring__dot--active' : ''}`}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Next button */}
              <button
                className="liveMonitoring__carouselBtn"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* ═══════════ RIGHT COLUMN — Dashboard Mockup ═══════════ */}
          <div className="liveMonitoring__right">
            <div className="liveMonitoring__browser">
              {/* Browser chrome bar */}
              <div className="liveMonitoring__browserBar">
                {/* macOS dots */}
                <div className="liveMonitoring__browserDots">
                  <span />
                  <span />
                  <span />
                </div>
                {/* URL bar */}
                <div className="liveMonitoring__urlBar">
                  {/* Lock icon */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>app.fasalsuraksha.in/dashboard</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="liveMonitoring__dashBody">
                {/* Map wrapper */}
                <div className="liveMonitoring__mapWrap">
                  <IndiaMapSvg />

                  {/* Colored dots on the map */}
                  {mapDots.map((dot, idx) => (
                    <span
                      key={idx}
                      className={`liveMonitoring__mapDot liveMonitoring__mapDot--${dot.color}`}
                      style={{ left: dot.left, top: dot.top }}
                    />
                  ))}

                  {/* ── Popup card: Barmer, Rajasthan ── */}
                  <div className="liveMonitoring__popup">
                    <div className="liveMonitoring__popupHeader">
                      <span className="liveMonitoring__popupDot" />
                      <span className="liveMonitoring__popupTitle">
                        Barmer, Rajasthan
                      </span>
                    </div>
                    <div className="liveMonitoring__popupTemp">+47°C</div>
                    <div className="liveMonitoring__popupDetail">
                      Rainfall: 0mm — 38 days
                    </div>
                    <div className="liveMonitoring__popupStatus">
                      {/* Warning triangle icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      STATUS: CRITICAL
                    </div>
                  </div>
                </div>

                {/* Auto-payout notification bar */}
                <div className="liveMonitoring__payoutBar">
                  <div className="liveMonitoring__payoutIcon">
                    {/* Play / trigger icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="liveMonitoring__payoutText">
                    <div className="liveMonitoring__payoutLabel">
                      Auto-payout initiated
                    </div>
                    <div className="liveMonitoring__payoutDesc">
                      ₹5,000 triggered for 142 farmers in Barmer district
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="liveMonitoring__legend">
                  <div className="liveMonitoring__legendItem">
                    <span
                      className="liveMonitoring__legendDot"
                      style={{ background: 'var(--color-success)' }}
                    />
                    Healthy
                  </div>
                  <div className="liveMonitoring__legendItem">
                    <span
                      className="liveMonitoring__legendDot"
                      style={{ background: 'var(--color-warning)' }}
                    />
                    At Risk
                  </div>
                  <div className="liveMonitoring__legendItem">
                    <span
                      className="liveMonitoring__legendDot"
                      style={{ background: 'var(--color-danger)' }}
                    />
                    Critical
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Photo cards ── */}
        <div className="liveMonitoring__photos">
          {photos.map((photo) => (
            <div className="liveMonitoring__photoCard" key={photo.caption}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="liveMonitoring__photoCaption">{photo.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMonitoring;
