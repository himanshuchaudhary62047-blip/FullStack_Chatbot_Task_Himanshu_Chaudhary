import React from 'react';

interface NavbarProps {
  activeTab: 'public' | 'admin';
  setActiveTab: (tab: 'public' | 'admin') => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onNavigate }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-brand" onClick={() => { setActiveTab('public'); onNavigate('hero'); }}>
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="brand-title">Drone<span className="accent-text">TV</span> AI</span>
        </div>

        <nav className="navbar-links">
          {activeTab === 'public' ? (
            <>
              <button className="nav-btn" onClick={() => onNavigate('hero')}>Home</button>
              <button className="nav-btn" onClick={() => onNavigate('services')}>Services</button>
              <button className="nav-btn" onClick={() => onNavigate('courses')}>Courses</button>
              <button className="nav-btn" onClick={() => onNavigate('chatbot')}>AI Assistant</button>
              <button className="nav-btn" onClick={() => onNavigate('enquiry')}>Enquire</button>
              <button className="nav-btn admin-toggle-btn" onClick={() => setActiveTab('admin')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Admin Dashboard
              </button>
            </>
          ) : (
            <button className="nav-btn primary-btn" onClick={() => setActiveTab('public')}>
              ← Back to Main Website
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
