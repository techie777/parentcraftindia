import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  upvotePost,
  addComment,
  flagPost,
  deletePost
} from '../controllers/forumController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.post('/:id/upvote', protect, upvotePost);
router.post('/:id/comments', protect, addComment);
router.post('/:id/flag', protect, flagPost);
router.delete('/:id', protect, authorize('admin', 'expert'), deletePost);

export default router;
