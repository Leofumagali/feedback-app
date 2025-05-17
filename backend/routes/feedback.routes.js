import { Router } from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackStatus,
  deleteFeedback
} from '../controllers/feedback.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'


const router = Router();

router.post('/', createFeedback);

router.use(authenticateToken);

router.get('/', getAllFeedbacks);
router.get('/:id', getFeedbackById);
router.patch('/:id', updateFeedbackStatus);
router.delete('/:id', deleteFeedback);

export default router;