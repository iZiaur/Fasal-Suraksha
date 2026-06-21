import React, { useState, useEffect, useRef } from 'react';
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

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  const simulationData = [
    { step: 1, delay: 800, log: '[09:14:22] Sentinel-2 NDVI = 0.21 (threshold: 0.30) — BREACH' },
    { step: 2, delay: 1000, log: '[09:14:23] IMD API confirmed 40 days without rain' },
    { step: 3, delay: 1200, log: '[09:14:23] Chainlink Oracle posting data to Polygon Mumbai...' },
    { step: 4, delay: 2500, log: '[09:14:31] Smart Contract Executed. Tx 0x4a7f...e2d1 confirmed' },
    { step: 5, delay: 1500, log: '[09:14:32] Razorpay payout initiated ₹5,000' },
    { step: 6, delay: 2000, log: '[09:14:34] UPI credit to +91 98xxx — SUCCESS' }
  ];

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setLogs([]);

    let cumulativeDelay = 0;
    
    simulationData.forEach((data) => {
      cumulativeDelay += data.delay;
      setTimeout(() => {
        setSimulationStep(data.step);
        setLogs(prev => [...prev, data.log]);
      }, cumulativeDelay);
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, cumulativeDelay + 1000);
  };

  useEffect(() => {
    if (logsEndRef.current && logsEndRef.current.parentNode) {
      logsEndRef.current.parentNode.scrollTop = logsEndRef.current.parentNode.scrollHeight;
    }
  }, [logs]);

  return (
    <section className="tech-section" id="tech-stack">
      <div className="tech-container">
        <div className="tech-header">
          <span className="section-tag">Tech Stack & Architecture</span>
          <h2 className="tech-title">Built for Scale and Transparency</h2>
        </div>

        <div className="architecture-container">
          <div className="architecture-title-row">
            <h3 className="architecture-title" style={{ marginBottom: 0 }}>Automated Payout Flow</h3>
            <button 
              className={`simulate-btn ${isSimulating ? 'simulating' : ''}`} 
              onClick={startSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? 'Simulating...' : '▶ Simulate a Drought Payout'}
            </button>
          </div>
          
          <div className="architecture-diagram">
            <div className={`arch-node ${simulationStep >= 1 ? 'active-node' : ''}`}>
              <span className="arch-icon">🛰️</span>
              <span className="arch-label">Sentinel-2</span>
            </div>
            <div className="arch-arrow">
              <span className="arrow-label">NDVI &lt; 0.3</span>
              →
            </div>
            <div className={`arch-node ${simulationStep >= 2 ? 'active-node' : ''}`}>
              <span className="arch-icon">☁️</span>
              <span className="arch-label">IMD API</span>
            </div>
            <div className="arch-arrow">
              <span className="arrow-label">Rainfall data</span>
              →
            </div>
            <div className={`arch-node highlight ${simulationStep >= 3 ? 'active-node' : ''}`}>
              <span className="arch-icon">⛓️</span>
              <span className="arch-label">Chainlink Oracle</span>
            </div>
            <div className="arch-arrow">
              <span className="arrow-label">Trigger event</span>
              →
            </div>
            <div className={`arch-node highlight ${simulationStep >= 4 ? 'active-node' : ''}`}>
              <span className="arch-icon">📜</span>
              <span className="arch-label">Smart Contract</span>
            </div>
            <div className="arch-arrow">
              <span className="arrow-label">Tx confirmed</span>
              →
            </div>
            <div className={`arch-node ${simulationStep >= 5 ? 'active-node' : ''}`}>
              <span className="arch-icon">💳</span>
              <span className="arch-label">Razorpay</span>
            </div>
            <div className="arch-arrow">
              <span className="arrow-label">Payout req</span>
              →
            </div>
            <div className={`arch-node final ${simulationStep >= 6 ? 'active-node' : ''}`}>
              <span className="arch-icon">📱</span>
              <span className="arch-label">UPI Payout</span>
            </div>
          </div>

          {/* Console Log Window */}
          <div className="console-window">
            <div className="console-header">
              <div className="console-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="console-title">System Logs (Testnet)</span>
            </div>
            <div className="console-body">
              {logs.length === 0 ? (
                <span className="console-empty">Click "Simulate" to view payout execution...</span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`console-line ${log.includes('SUCCESS') ? 'success-text' : ''} ${log.includes('BREACH') ? 'error-text' : ''}`}>
                    {log}
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>

          <div className="contract-hash-badge">
            <span className="badge-pulse"></span>
            <span className="hash-label">Live on Polygon Mumbai →</span>
            <a href="#" className="hash-link">0x4a7f...e2d1</a>
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
