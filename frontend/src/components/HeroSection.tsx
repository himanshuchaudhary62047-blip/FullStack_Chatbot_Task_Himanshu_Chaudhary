import React from 'react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="badge">
          <span className="badge-dot"></span>
          Next-Gen Drone Tech & Training
        </div>
        <h1 className="hero-title">
          Empowering Next-Gen <span className="gradient-text">Drone Intelligence</span> & Aerial Training
        </h1>
        <p className="hero-subtitle">
          DroneTV offers certified commercial pilot training, agricultural mapping, industrial inspection, and custom drone media solutions. Use our instant AI assistant below to get quick support.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('enquiry')}>
            Submit Enquiry
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('chatbot')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Ask AI Assistant
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-value">5,000+</div>
            <div className="stat-label">Pilots Trained</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">DGCA</div>
            <div className="stat-label">Certified Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">99.8%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};
