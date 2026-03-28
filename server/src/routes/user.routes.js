import { Router } from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/me', authMiddleware, getMyProfile);
router.patch('/me', authMiddleware, updateMyProfile);

export default router;
