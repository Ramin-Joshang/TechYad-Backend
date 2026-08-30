import { Router } from 'express';
import * as Controller from './notification.controller.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);

router.get('/me/notifications', requireAuth, asyncHandler(Controller.getMyNotifications));
router.patch('/me/notifications/read-all', requireAuth, asyncHandler(Controller.markAllAsRead));
router.patch('/me/notifications/:id/read', requireAuth, asyncHandler(Controller.markAsRead));

export default router;
