import React from 'react';
import './TechStackSection.css';

const TechStackSection = () => {
  const stack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Vite', color: '#646CFF' },
    { name: 'Solidity', color: '#363636' },
    { name: 'Hardhat', color: '#FFF100' },
    { name: 'Chainlink', color: '#375BD2' },
    { name: 'Razorpay', color: '#02042B' },
    { name: 'Mapbox', color: '#000000' },
  ];

  return (
    <section className="tech-section" id="tech-stack">
      <div className="tech-container">
        <div className="tech-header">
          <span className="section-tag">Tech Stack & Architecture</span>
          <h2 className="tech-title">Built for Scale and Transparency</h2>
        </div>

        <div className="architecture-container">
          <h3 className="architecture-title">Automated Payout Flow</h3>
          <div className="architecture-diagram">
            <div className="arch-node">
              <span className="arch-icon">🛰️</span>
              <span className="arch-label">Sentinel-2</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <span className="arch-icon">☁️</span>
              <span className="arch-label">IMD API</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <span className="arch-icon">⛓️</span>
              <span className="arch-label">Chainlink Oracle</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node highlight">
              <span className="arch-icon">📜</span>
              <span className="arch-label">Smart Contract</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <span className="arch-icon">💳</span>
              <span className="arch-label">Razorpay</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node final">
              <span className="arch-icon">📱</span>
              <span className="arch-label">UPI Payout</span>
            </div>
          </div>
          <div className="contract-hash">
            <span className="hash-label">Testnet Contract (Sepolia):</span>
            <a href="#" className="hash-link">0x7a2...4f9C</a>
          </div>
        </div>

        <div className="stack-container">
          <h3 className="stack-title">Powered By</h3>
          <div className="stack-badges">
            {stack.map((tech, idx) => (
              <div className="stack-badge" key={idx}>
                <span className="badge-dot" style={{ backgroundColor: tech.color }}></span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
