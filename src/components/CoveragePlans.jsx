import React, { useState, useEffect, useRef } from 'react';
import './CoveragePlans.css';

/* ──────────────────────────────────────────
   Plan card data — image, tag, pricing, etc.
   ────────────────────────────────────────── */
const plans = [
  {
    id: 'drought',
    tag: 'Dry Season',
    tagVariant: 'amber',
    title: 'Drought Shield',
    price: 'From ₹149',
    description:
      'Triggers when rainfall stays below 20mm for 30+ consecutive days.',
    link: 'View Plan Details →',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Golden wheat field under dry sky',
  },
  {
    id: 'flood',
    tag: 'Monsoon',
    tagVariant: 'green',
    title: 'Flood Guard',
    price: 'From ₹199',
    description:
      'Auto-payout when excess rainfall exceeds 200mm in 72 hours.',
    link: 'View Plan Details →',
    image:
      '/images/flood.png',
    imageAlt: 'Lush green flooded rice paddy during monsoon',
  },
  {
    id: 'heatwave',
    tag: 'Peak Summer',
    tagVariant: 'red',
    title: 'Heatwave Cover',
    price: 'From ₹99',
    description:
      'Activated when temperature sustains above 45°C for 5+ days.',
    link: 'View Plan Details →',
    image:
      '/images/heatwave.png',
    imageAlt: 'Dry cracked earth under intense summer heat',
  },
];

/* ──────────────────────────────────────────
   Accordion data — Smart Insurance benefits
   ────────────────────────────────────────── */
const accordionItems = [
  {
    number: '01',
    title: 'Instant UPI Payouts — No Claim Forms',
    content:
      'When a weather threshold is crossed, our smart contract automatically initiates a UPI transfer directly to the registered farmer\'s account — no paperwork, no waiting, no middlemen.',
  },
  {
    number: '02',
    title: 'Zero Human Surveyors — Satellite Verified',
    content:
      'Our parametric model relies on verified satellite imagery and ground-station data to assess weather events, eliminating the need for manual field surveys and reducing settlement time from weeks to hours.',
  },
  {
    number: '03',
    title: 'Hyper-Local Weather Monitoring — GPS Precise',
    content:
      'Each insured plot is tracked at GPS-level precision using a grid of micro-weather stations and ISRO satellite feeds, ensuring payouts reflect the actual conditions on your specific farmland.',
  },
  {
    number: '04',
    title: 'Affordable Micro-Premiums — Starting ₹99',
    content:
      'Our plans are designed for smallholder farmers. With premiums as low as ₹99 per season, every farmer can afford climate protection without straining their household budget.',
  },
];

/* ──────────────────────────────────────────
   CoveragePlans Component
   ────────────────────────────────────────── */
const CoveragePlans = () => {
  /* Accordion state — first item open by default */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Refs for IntersectionObserver scroll animations */
  const sectionRef = useRef(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  /* ── Scroll-triggered animations ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animatables = section.querySelectorAll('.cp__animate');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cp__animate--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animatables.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="coveragePlans" ref={sectionRef} id="coverage-plans">
      {/* ════════════════════════════════════════
          PART 1 — Coverage Plans
          ════════════════════════════════════════ */}
      <div className="container">
        <div className="cp__topSection">
          {/* Left column — heading + tag */}
          <div className="cp__topLeft cp__animate">
            <h2 className="cp__heading heading-lg">
              Explore Fasal Suraksha{' '}
              <em className="cp__headingAccent">Coverage Plans.</em>
            </h2>
            <span className="section-tag cp__tag">Our Sustainable Plans</span>
          </div>

          {/* Right column — description */}
          <div className="cp__topRight cp__animate">
            <p className="cp__description">
              Choose from climate-specific micro-insurance plans designed for
              Indian crops and weather patterns. Affordable premiums starting at{' '}
              <strong>₹99/season.</strong>
            </p>
          </div>
        </div>

        {/* ── Plan Cards Grid ── */}
        <div className="cp__cardsGrid">
          {plans.map((plan, i) => (
            <article
              className={`cp__card cp__animate`}
              key={plan.id}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Card image with season tag */}
              <div className="cp__cardImageWrap">
                <img
                  className="cp__cardImage"
                  src={plan.image}
                  alt={plan.imageAlt}
                  loading="lazy"
                />
                <span className={`cp__seasonTag cp__seasonTag--${plan.tagVariant}`}>
                  {plan.tag}
                </span>
              </div>

              {/* Card body */}
              <div className="cp__cardBody">
                <div className="cp__cardHeader">
                  <h3 className="cp__cardTitle">{plan.title}</h3>
                  <span className="cp__cardPrice">{plan.price}</span>
                </div>
                <p className="cp__cardDesc">{plan.description}</p>
                <a href="#" className="cp__cardLink">
                  {plan.link}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          PART 2 — Smart Insurance Accordion
          ════════════════════════════════════════ */}
      <div className="container">
        <div className="cp__bottomSection">
          {/* Left column — heading + tag */}
          <div className="cp__bottomLeft cp__animate">
            <h2 className="cp__heading heading-lg">
              Discover Fasal Suraksha's{' '}
              <em className="cp__headingAccent">Smart Insurance.</em>
            </h2>
            <p className="cp__description cp__description--bottom">
              We offer parametric coverage powered by satellite data, ensuring
              faster, fairer, and fully transparent claim settlements for every
              farmer.
            </p>
            <span className="section-tag cp__tag">Benefits of Fasal Suraksha</span>
          </div>

          {/* Right column — Accordion */}
          <div className="cp__bottomRight cp__animate">
            <div className="cp__accordion">
              {accordionItems.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    className={`cp__accordionItem ${isOpen ? 'cp__accordionItem--open' : ''}`}
                    key={item.number}
                  >
                    {/* Accordion header — clickable */}
                    <button
                      className="cp__accordionHeader"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="cp__accordionNumber">{item.number}</span>
                      <span className="cp__accordionTitle">{item.title}</span>
                      <span className="cp__accordionIcon">
                        {isOpen ? (
                          /* Minus icon */
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        ) : (
                          /* Plus icon */
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </span>
                    </button>

                    {/* Accordion content — slides open/shut */}
                    <div
                      className="cp__accordionContent"
                      style={{
                        maxHeight: isOpen ? '200px' : '0',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="cp__accordionText">{item.content}</p>
                    </div>

                    {/* Green progress bar — visible when open */}
                    <div className="cp__accordionBar">
                      <div
                        className={`cp__accordionBarFill ${isOpen ? 'cp__accordionBarFill--active' : ''}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoveragePlans;
