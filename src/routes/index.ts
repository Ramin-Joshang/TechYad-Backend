import { Router } from 'express';
import { sendSuccess } from '../common/utils/response.js';
import authRoutes from '../modules/auth/auth.routes.js';
import catalogRoutes from '../modules/catalog/catalog.routes.js';
import courseRoutes from '../modules/courses/course.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  sendSuccess(res, { timestamp: new Date().toISOString() }, 'System is healthy');
});

router.use('/auth', authRoutes);
router.use('/', catalogRoutes);
router.use('/', courseRoutes);

export default router;
