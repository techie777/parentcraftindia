import express from 'express';
import {
  getAnalytics,
  getFlaggedPosts,
  getAllUsers,
  toggleVerifyExpert,
  updateUserRole
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/analytics', protect, authorize('admin'), getAnalytics);
router.get('/flagged-posts', protect, authorize('admin', 'expert'), getFlaggedPosts);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.post('/verify-expert', protect, authorize('admin'), toggleVerifyExpert);
router.post('/user-role', protect, authorize('admin'), updateUserRole);

export default router;
