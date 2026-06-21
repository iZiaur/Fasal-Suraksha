import React, { useEffect } from 'react';
import './UPIPayoutModal.css';

export default function UPIPayoutModal({ isOpen, onClose, amount, farmerName, triggerEvent }) {
  if (!isOpen) return null;

  // Generate a random transaction ID
  const txId = 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase();
  const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return (
    <div className="upi-modal-overlay">
      <div className="upi-modal-content">
        <div className="upi-icon-container">
          <div className="upi-icon-ring"></div>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2 className="upi-amount">₹{amount.toLocaleString('en-IN')}</h2>
        <div className="upi-status">Payment Successful</div>
        
        <div className="upi-details">
          <div className="upi-detail-row">
            <span className="upi-detail-label">Paid To</span>
            <span className="upi-detail-value">{farmerName}</span>
          </div>
          <div className="upi-detail-row">
            <span className="upi-detail-label">Trigger Event</span>
            <span className="upi-detail-value text-danger">{triggerEvent}</span>
          </div>
          <div className="upi-detail-row">
            <span className="upi-detail-label">UPI Txn ID</span>
            <span className="upi-detail-value">{txId}</span>
          </div>
          <div className="upi-detail-row">
            <span className="upi-detail-label">Date</span>
            <span className="upi-detail-value">{date}</span>
          </div>
        </div>

        <div className="upi-footer">
          Powered by Fasal Suraksha Smart Contracts
        </div>

        <button className="upi-close-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
