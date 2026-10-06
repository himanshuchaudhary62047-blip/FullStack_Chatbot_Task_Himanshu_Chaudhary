import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Drone<span className="accent-text">TV</span> AI Assistant</h3>
          <p>Full Stack Drone Technology Support & Enquiry System.</p>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} DroneTV AI Support System. Built for IPAGE Group Developer Assignment.
        </div>
      </div>
    </footer>
  );
};
