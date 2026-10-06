import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CoursesSection } from './components/CoursesSection';
import { ChatbotWidget } from './components/ChatbotWidget';
import { EnquiryForm } from './components/EnquiryForm';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');
  const [selectedServiceOrCourse, setSelectedServiceOrCourse] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    setActiveTab('public');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectServiceOrCourse = (itemTitle: string) => {
    setSelectedServiceOrCourse(itemTitle);
    handleNavigate('enquiry');
  };

  return (
    <div className="app-wrapper">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {activeTab === 'public' ? (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <ServicesSection onSelectService={handleSelectServiceOrCourse} />
            <CoursesSection onSelectCourse={handleSelectServiceOrCourse} />
            <ChatbotWidget onNavigate={handleNavigate} />
            <EnquiryForm initialSelection={selectedServiceOrCourse} />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
