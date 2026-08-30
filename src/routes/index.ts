import { Router } from 'express';
import { sendSuccess } from '../common/utils/response.js';
import authRoutes from '../modules/auth/auth.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  sendSuccess(res, { timestamp: new Date().toISOString() }, 'System is healthy');
});

router.use('/auth', authRoutes);

export default router;
