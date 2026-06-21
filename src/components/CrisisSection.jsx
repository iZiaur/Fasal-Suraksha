import React, { useEffect, useRef } from 'react';
import './CrisisSection.css';

/* =========================================
   CrisisSection — "The Crisis We Cannot Ignore"
   Dark-themed section exposing the farmer crisis
   with cards, stats, and a call to action.
   ========================================= */

// ---- Card Data ----
const crisisCards = [
  {
    image:
      '/images/crisis_debt.png',
    tagLabel: 'The Debt Trap',
    tagColor: 'red',
    title: '₹3 Lakh Debt. Zero Payout.',
    description:
      'The average indebted farmer household owes over ₹3 lakh. When crop failure strikes, there is no safety net — just rising interest and mounting desperation that pushes families to the brink.',
    source: 'ADSI 2022 Data | NCRB',
  },
  {
    image:
      '/images/crisis_insurance.png',
    tagLabel: 'Insurance That Never Pays',
    tagColor: 'orange',
    title: 'Waited 2 Years. Claim Rejected.',
    description:
      'Under PMFBY, only 1 in 4 claims are ever settled. Bureaucratic delays, disputed assessments, and manual processes mean farmers wait years for payouts that may never arrive.',
    source: 'CAG Audit Report, 2025 | Govt. of India',
  },
  {
    image:
      '/images/crisis_mental_health.png',
    tagLabel: 'The Silent Mental Health Crisis',
    tagColor: 'red',
    title: 'Depression with No Diagnosis.',
    description:
      'Over 70% of farming communities have zero access to mental health professionals. Depression, anxiety, and trauma go undiagnosed and untreated across rural India.',
    source: 'The Lancet Psychiatry, 2025 | NIMHANS Study',
  },
  {
    image:
      '/images/crisis_climate.png',
    tagLabel: 'Climate is the New Enemy',
    tagColor: 'amber',
    title: '40 Days Without Rain.',
    description:
      'Erratic monsoons and extreme weather events have become the norm. In 2024, over 40% of Indian districts faced drought-like conditions, devastating kharif crops across the country.',
    source: 'India Meteorological Department, 2025',
  },
];

// ---- Stats Data ----
const suicideStats = [
  { number: '3,824', label: 'Maharashtra' },
  { number: '2,971', label: 'Karnataka' },
  { number: '835', label: 'Madhya Pradesh' },
  { number: '780', label: 'Andhra Pradesh' },
];

const CrisisSection = () => {
  // Refs for each animated group
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    /* ---- IntersectionObserver Setup ----
       Watches each ref and applies the 'visible' class
       when the element scrolls into the viewport. */
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the container itself
          entry.target.classList.add('crisis-animate--visible');

          // Also animate all children with the animate class
          const children = entry.target.querySelectorAll('.crisis-animate');
          children.forEach((child) => {
            child.classList.add('crisis-animate--visible');
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section group
    const refs = [headerRef, cardsRef, statsRef, quoteRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="crisis-section" id="crisis">
      <div className="crisis-container">
        {/* ======== Header ======== */}
        <div
          ref={headerRef}
          className="crisis-header crisis-animate"
        >
          <span className="crisis-tag">The Crisis We Cannot Ignore</span>

          <h2 className="crisis-heading">
            Every Hour, a Farmer Dies by Suicide in India.
          </h2>

          <p className="crisis-subtitle">
            <strong>10,546</strong> farming sector deaths recorded in 2024 alone.
            Debt, crop loss, and a broken insurance system are killing our food
            providers.
            <br />
            <em>— Source: NCRB Report, May 2026</em>
          </p>
        </div>

        {/* ======== Crisis Cards ======== */}
        <div
          ref={cardsRef}
          className="crisis-cards-grid crisis-animate"
        >
          {crisisCards.map((card, index) => (
            <article
              key={index}
              className="crisis-card crisis-animate"
            >
              {/* Card Image */}
              <div className="crisis-card-image">
                <img
                  src={card.image}
                  alt={card.tagLabel}
                  loading="lazy"
                />
                {/* Colored tag overlay */}
                <span
                  className={`crisis-card-tag crisis-card-tag--${card.tagColor}`}
                >
                  {card.tagLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="crisis-card-body">
                <h3 className="crisis-card-title">{card.title}</h3>
                <p className="crisis-card-desc">{card.description}</p>
                <p className="crisis-card-source">{card.source}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ======== Stats Row ======== */}
        <div
          ref={statsRef}
          className="crisis-stats-wrapper crisis-animate"
        >
          <div className="crisis-stats-row">
            {suicideStats.map((stat, index) => (
              <div
                key={index}
                className="crisis-stat-box crisis-animate crisis-animate--scale"
              >
                <div className="crisis-stat-number">{stat.number}</div>
                <div className="crisis-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="crisis-stats-caption">
            Top states with highest farmer suicides (NCRB 2024)
          </p>
        </div>

        {/* ======== Quote ======== */}
        <div
          ref={quoteRef}
          className="crisis-quote-wrapper crisis-animate"
        >
          <blockquote className="crisis-quote">
            &ldquo;What if insurance payouts were instant, automatic, and
            incorruptible?&rdquo;
          </blockquote>
        </div>

        {/* ======== CTA Button ======== */}
        <div
          ref={ctaRef}
          className="crisis-cta-wrapper crisis-animate"
        >
          <button className="crisis-cta-btn" type="button">
            This Is Why We Built Fasal Suraksha
            <span className="cta-arrow">▼</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CrisisSection;
