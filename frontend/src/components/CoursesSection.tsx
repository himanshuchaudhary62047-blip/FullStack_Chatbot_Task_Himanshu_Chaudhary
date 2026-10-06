import React from 'react';

interface CoursesSectionProps {
  onSelectCourse: (courseName: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const courses = [
    {
      id: 'dgca',
      title: 'DGCA Certified Small Rotorcraft Pilot',
      duration: '5 Days',
      level: 'Beginner to Professional',
      description: 'Official DGCA approved remote pilot certification covering simulator training, flight safety, and hands-on flying.',
      badge: 'Certified',
    },
    {
      id: 'gis',
      title: 'Drone Data Processing & GIS Analytics',
      duration: '2 Weeks',
      level: 'Intermediate',
      description: 'Master Pix4D, Agisoft Metashape, orthomosaic generation, thermal data extraction, and 3D mesh modeling.',
      badge: 'Popular',
    },
    {
      id: 'fpv',
      title: 'FPV Cinema Drone Masterclass',
      duration: '3 Days',
      level: 'Advanced Flying',
      description: 'Learn dynamic high-speed cinematic tracking, custom FPV drone building, tuning, and manual flight modes.',
      badge: 'Specialized',
    },
  ];

  return (
    <section id="courses" className="courses-section">
      <div className="section-header">
        <h2 className="section-title">Courses & Training Programs</h2>
        <p className="section-subtitle">Gain industry-recognized drone piloting skills and technical data analytics certification.</p>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-badge">{course.badge}</div>
            <h3 className="course-title">{course.title}</h3>
            <div className="course-meta">
              <span>⏱️ {course.duration}</span>
              <span>🎓 {course.level}</span>
            </div>
            <p className="course-desc">{course.description}</p>
            <button
              className="btn btn-outline"
              onClick={() => onSelectCourse(course.title)}
            >
              Enroll / Enquire Course →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
