import express from 'express';
import {
  getQuestions,
  submitQuestion,
  answerQuestion,
  markHelpful
} from '../controllers/qaController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', protect, submitQuestion);
router.post('/:id/answer', protect, authorize('expert', 'admin'), answerQuestion);
router.post('/:id/helpful', markHelpful);

export default router;
