import { Router } from 'express';
import { sendSuccess } from '../common/utils/response.js';
import authRoutes from '../modules/auth/auth.routes.js';
import catalogRoutes from '../modules/catalog/catalog.routes.js';
import courseRoutes from '../modules/courses/course.routes.js';
import learningRoutes from '../modules/learning/learning.routes.js';
import commerceRoutes from '../modules/commerce/commerce.routes.js';
import assignmentRoutes from '../modules/learning/assignment.routes.js';
import quizRoutes from '../modules/learning/quiz.routes.js';
import communityRoutes from '../modules/community/community.routes.js';
import mediaRoutes from '../modules/media/media.routes.js';
import liveRoutes from '../modules/live/live.routes.js';
import blogRoutes from '../modules/blog/blog.routes.js';
import notificationRoutes from '../modules/notifications/notification.routes.js';
import supportRoutes from '../modules/support/support.routes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  sendSuccess(res, { timestamp: new Date().toISOString() }, 'System is healthy');
});

router.use('/auth', authRoutes);
router.use('/', catalogRoutes);
router.use('/', courseRoutes);
router.use('/', learningRoutes);
router.use('/', commerceRoutes);
router.use('/', assignmentRoutes);
router.use('/', quizRoutes);
router.use('/', communityRoutes);
router.use('/', mediaRoutes);
router.use('/', liveRoutes);
router.use('/', blogRoutes);
router.use('/', notificationRoutes);
router.use('/', supportRoutes);

export default router;
