import { Router } from 'express';
import * as Controller from './class.controller.js';
import { authenticate, authorize } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);
const isInstructor = [requireAuth, authorize('courses.manage')]; // Mock instructor perm

// Public routes
router.get('/classes', asyncHandler(Controller.getClasses));
router.get('/classes/:slug', asyncHandler(Controller.getClassBySlug));

// Instructor routes
router.post('/instructor/classes', isInstructor, asyncHandler(Controller.createClass));

// Student routes
router.get('/me/classes', requireAuth, asyncHandler(Controller.getMyClasses));
router.get('/classes/:id/join', requireAuth, asyncHandler(Controller.joinOnlineClass));

export default router;
