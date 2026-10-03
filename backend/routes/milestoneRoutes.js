import express from 'express';
import { getMilestones, toggleChildMilestone } from '../controllers/milestoneController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMilestones);
router.post('/toggle', protect, toggleChildMilestone);

export default router;
