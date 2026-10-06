import { Request, Response } from 'express';
import mongoose from 'mongoose';
import EnquiryModel, { EnquiryStatus, UserType } from '../models/Enquiry.js';

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return /^\d{7,15}$/.test(cleaned);
};

const VALID_USER_TYPES: UserType[] = ['Student', 'Customer', 'Other'];
const VALID_STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Closed'];

// GET /api/enquiries - Fetch all enquiries with optional search & filter from MongoDB
export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, user_type, status } = req.query;

    const filter: any = {};

    if (user_type && VALID_USER_TYPES.includes(user_type as UserType)) {
      filter.user_type = user_type;
    }

    if (status && VALID_STATUSES.includes(status as EnquiryStatus)) {
      filter.status = status;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { service_or_course: searchRegex },
        { message: searchRegex },
      ];
    }

    const enquiries = await EnquiryModel.find(filter).sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error: any) {
    console.error('Error fetching enquiries from MongoDB:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve enquiries from database.',
    });
  }
};

// GET /api/enquiries/:id - Fetch single enquiry by ID
export const getEnquiryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, error: 'Invalid MongoDB enquiry ID format.' });
      return;
    }

    const enquiry = await EnquiryModel.findById(id);

    if (!enquiry) {
      res.status(404).json({ success: false, error: 'Enquiry not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error: any) {
    console.error('Error fetching enquiry by ID:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve enquiry details.',
    });
  }
};

// POST /api/enquiries - Create new enquiry in MongoDB
export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, user_type, service_or_course, message } = req.body;

    // Required fields check
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !user_type?.trim() || !service_or_course?.trim() || !message?.trim()) {
      res.status(400).json({
        success: false,
        error: 'All fields (name, email, phone, user_type, service_or_course, message) are required.',
      });
      return;
    }

    // Email format validation
    if (!isValidEmail(email.trim())) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
      return;
    }

    // Phone format validation
    if (!isValidPhone(phone.trim())) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number (7 to 15 digits).',
      });
      return;
    }

    // User type validation
    if (!VALID_USER_TYPES.includes(user_type as UserType)) {
      res.status(400).json({
        success: false,
        error: 'Invalid user_type. Must be Student, Customer, or Other.',
      });
      return;
    }

    const newEnquiry = await EnquiryModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      user_type,
      service_or_course: service_or_course.trim(),
      message: message.trim(),
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully.',
      data: newEnquiry,
    });
  } catch (error: any) {
    console.error('Error creating enquiry in MongoDB:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to process enquiry. Internal server error.',
    });
  }
};

// PUT /api/enquiries/:id - Update enquiry in MongoDB
export const updateEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, error: 'Invalid MongoDB enquiry ID format.' });
      return;
    }

    const { status, name, email, phone, user_type, service_or_course, message } = req.body;

    const existing = await EnquiryModel.findById(id);
    if (!existing) {
      res.status(404).json({ success: false, error: 'Enquiry not found.' });
      return;
    }

    if (status && !VALID_STATUSES.includes(status as EnquiryStatus)) {
      res.status(400).json({
        success: false,
        error: 'Invalid status. Must be New, Contacted, In Progress, or Closed.',
      });
      return;
    }

    if (email && !isValidEmail(email.trim())) {
      res.status(400).json({ success: false, error: 'Invalid email address format.' });
      return;
    }

    if (phone && !isValidPhone(phone.trim())) {
      res.status(400).json({ success: false, error: 'Invalid phone number format.' });
      return;
    }

    if (user_type && !VALID_USER_TYPES.includes(user_type as UserType)) {
      res.status(400).json({ success: false, error: 'Invalid user_type.' });
      return;
    }

    if (name) existing.name = name.trim();
    if (email) existing.email = email.trim().toLowerCase();
    if (phone) existing.phone = phone.trim();
    if (user_type) existing.user_type = user_type;
    if (service_or_course) existing.service_or_course = service_or_course.trim();
    if (message) existing.message = message.trim();
    if (status) existing.status = status;

    const updated = await existing.save();

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('Error updating enquiry in MongoDB:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to update enquiry.',
    });
  }
};

// DELETE /api/enquiries/:id - Delete enquiry from MongoDB
export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, error: 'Invalid MongoDB enquiry ID format.' });
      return;
    }

    const deleted = await EnquiryModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: 'Enquiry not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Enquiry #${id} deleted successfully.`,
    });
  } catch (error: any) {
    console.error('Error deleting enquiry from MongoDB:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to delete enquiry.',
    });
  }
};
