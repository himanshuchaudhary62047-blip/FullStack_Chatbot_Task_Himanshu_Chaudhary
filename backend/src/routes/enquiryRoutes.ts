import { Router } from 'express';
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiryController.js';

const router = Router();

// REST operations for Enquiries
router.get('/', getEnquiries);
router.get('/:id', getEnquiryById);
router.post('/', createEnquiry);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;
