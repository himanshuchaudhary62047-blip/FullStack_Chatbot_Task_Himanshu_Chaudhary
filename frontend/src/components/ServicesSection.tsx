import React from 'react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'survey',
      title: 'Aerial Surveying & Mapping',
      icon: '🗺️',
      description: 'High-precision 2D/3D land surveying, photogrammetry, and GIS mapping for infrastructure & urban planning.',
    },
    {
      id: 'inspection',
      title: 'Industrial & Pipeline Inspection',
      icon: '🏭',
      description: 'Thermal imaging, structural safety audits, and automated inspection for towers, solar farms, and pipelines.',
    },
    {
      id: 'agriculture',
      title: 'Precision Agriculture Drones',
      icon: '🌾',
      description: 'Crop health monitoring, multispectral analysis, and targeted crop spraying for modern sustainable farming.',
    },
    {
      id: 'cinematography',
      title: 'Drone Media & Cinematography',
      icon: '🎥',
      description: '4K/8K ultra-HD aerial photography and FPV drone video shooting for commercial broadcasts, real estate & events.',
    },
  ];

  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <h2 className="section-title">Our Specialized Drone Services</h2>
        <p className="section-subtitle">Cutting-edge aerial solutions tailored for industries, infrastructure, and agriculture.</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <button
              className="service-link-btn"
              onClick={() => onSelectService(service.title)}
            >
              Enquire About Service →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
