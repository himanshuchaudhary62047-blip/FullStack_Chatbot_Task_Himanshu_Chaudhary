import React, { useState } from 'react';
import type { CreateEnquiryInput, UserType } from '../types';
import { submitEnquiry } from '../services/api';

interface EnquiryFormProps {
  initialSelection?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ initialSelection = '' }) => {
  const [formData, setFormData] = useState<CreateEnquiryInput>({
    name: '',
    email: '',
    phone: '',
    user_type: 'Student',
    service_or_course: initialSelection || 'Aerial Surveying & Mapping',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [apiErrorMsg, setApiErrorMsg] = useState('');

  // Update selection if prop changes
  React.useEffect(() => {
    if (initialSelection) {
      setFormData((prev) => ({ ...prev, service_or_course: initialSelection }));
    }
  }, [initialSelection]);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^\d{7,15}$/.test(cleaned)) {
        errs.phone = 'Please enter a valid phone number (7 to 15 digits).';
      }
    }

    if (!formData.service_or_course.trim()) {
      errs.service_or_course = 'Please specify service or course of interest.';
    }

    if (!formData.message.trim()) errs.message = 'Enquiry message is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setApiErrorMsg('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitEnquiry(formData);
      setSuccessMsg('Thank you! Your enquiry has been received. Our DroneTV team will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        user_type: 'Student',
        service_or_course: 'Aerial Surveying & Mapping',
        message: '',
      });
      setErrors({});
    } catch (err: any) {
      setApiErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="enquiry-section">
      <div className="section-header">
        <h2 className="section-title">Contact & Enquiry Form</h2>
        <p className="section-subtitle">Interested in our services or courses? Get in touch with our expert team.</p>
      </div>

      <div className="form-card">
        {successMsg && (
          <div className="alert alert-success">
            <span>✅ {successMsg}</span>
          </div>
        )}

        {apiErrorMsg && (
          <div className="alert alert-error">
            <span>⚠️ {apiErrorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="enquiry-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="user_type">I am a *</label>
              <select
                id="user_type"
                className="form-input"
                value={formData.user_type}
                onChange={(e) => setFormData({ ...formData, user_type: e.target.value as UserType })}
              >
                <option value="Student">Student / Learner</option>
                <option value="Customer">Commercial Customer / Client</option>
                <option value="Other">Other Enquiry</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="e.g. +91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service_or_course">Service or Course of Interest *</label>
            <input
              id="service_or_course"
              type="text"
              className={`form-input ${errors.service_or_course ? 'input-error' : ''}`}
              placeholder="e.g. DGCA Certified Pilot Training or Aerial Surveying"
              value={formData.service_or_course}
              onChange={(e) => setFormData({ ...formData, service_or_course: e.target.value })}
            />
            {errors.service_or_course && <span className="field-error">{errors.service_or_course}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Enquiry Message *</label>
            <textarea
              id="message"
              rows={4}
              className={`form-input ${errors.message ? 'input-error' : ''}`}
              placeholder="Tell us more about your requirement or training goal..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>
    </section>
  );
};
