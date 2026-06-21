import React, { useEffect, useRef } from 'react';
import './CTAFooter.css';

/* =========================================
   CTAFooter — Final CTA + Site Footer
   ========================================= */

const CTAFooter = () => {
  const ctaRef = useRef(null);

  /* ---- IntersectionObserver for scroll animation ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===========================
          PART 1 — Final CTA Section
          =========================== */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-inner">
          {/* Shield Icon */}
          <div className="cta-shield">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="cta-heading">
            Ready to Protect Your Harvest?
          </h2>

          {/* Subtitle */}
          <p className="cta-subtitle">
            Sign up in minutes. Get coverage before the next monsoon hits.
          </p>

          {/* CTA Button */}
          <button className="cta-button" type="button">
            Register Your Farm Today&nbsp;&rarr;
          </button>

          {/* Trust Text */}
          <div className="cta-trust">
            <span className="cta-trust-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            A Hackathon Prototype Conceptualized and Built by Team Drishti
          </div>
        </div>
      </section>

      {/* ===========================
          PART 2 — Footer
          =========================== */}
      <footer className="footer">
        <div className="footer-grid">

          {/* ---- Column 1: Brand ---- */}
          <div className="footer-col footer-col-brand">
            {/* Logo + Name */}
            <div className="footer-brand-logo">
              <div className="footer-brand-logo-icon">
                {/* Leaf / shield icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="footer-brand-name">Fasal Suraksha</span>
            </div>

            {/* Hindi text */}
            <p className="footer-brand-hindi">फसल सुरक्षा</p>

            {/* Description */}
            <p className="footer-brand-desc">
              India's first automated parametric crop insurance platform. Protecting
              farmers from climate disasters with instant, transparent payouts.
            </p>

            {/* Social Media Icons */}
            <div className="footer-social">
              {/* WhatsApp */}
              <a href="#" className="footer-social-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.685-1.228A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.326-.72-6.022-1.94l-.424-.316-2.795.733.747-2.73-.345-.551A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a href="#" className="footer-social-icon" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="footer-social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* ---- Column 2: Platform ---- */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <nav className="footer-links">
              <a href="#">Dashboard</a>
              <a href="#">Register Farm</a>
              <a href="#">My Policies</a>
              <a href="#">Claim History</a>
            </nav>
          </div>

          {/* ---- Column 3: Resources ---- */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <nav className="footer-links">
              <a href="#">Blog</a>
              <a href="#">Weather Data</a>
              <a href="#">Satellite Maps</a>
              <a href="#">API Docs</a>
            </nav>
          </div>

          {/* ---- Column 4: Support ---- */}
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <nav className="footer-links">
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">FAQ</a>
              <a href="#">Report Issue</a>
            </nav>
          </div>

          {/* ---- Column 5: Legal ---- */}
          <div className="footer-col">
            <h4 className="footer-col-title">Team Drishti</h4>
            <nav className="footer-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Devpost Submission</a>
              <a href="https://github.com/iZiaur/Fasal-Suraksha" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              <a href="#team">Team Profiles</a>
              <a href="#tech-stack">Tech Stack</a>
            </nav>
          </div>

          {/* ---- Column 6: Address ---- */}
          <div className="footer-col">
            <h4 className="footer-col-title">Address</h4>
            <p className="footer-address">
              Fasal Suraksha, Jaipur,<br />
              Rajasthan, India
            </p>

            <div className="footer-helpline">
              <p className="footer-label">Helpline</p>
              <p className="footer-helpline-number">1800-FASAL-00</p>
              <p className="footer-toll-free">Toll Free</p>
            </div>

            <div>
              <p className="footer-label">Email</p>
              <a href="mailto:support@fasalsuraksha.in" className="footer-email-value">
                support@fasalsuraksha.in
              </a>
            </div>
          </div>
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span className="footer-copyright">
              Built with ❤️ by Team Drishti for the Build for Good Hackathon.
            </span>

            <div className="footer-bottom-links">
              <a href="#">FAQ</a>
              <span className="dot">·</span>
              <a href="#">Terms of Service</a>
              <span className="dot">·</span>
              <a href="#">Privacy Policy</a>
            </div>

            <span className="footer-made-with">
              <span className="footer-made-dot" />
              Team Drishti Prototype
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTAFooter;
