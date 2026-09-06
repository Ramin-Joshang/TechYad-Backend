import { Router } from 'express';
import * as Controller from './community.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { authenticate, authorize } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { createReviewSchema } from './community.validation.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);
const isAdmin = [requireAuth, authorize('community.manage')];

// --- Reviews ---
router.get('/courses/:courseId/reviews', asyncHandler(Controller.getCourseReviews));
router.post('/courses/:courseId/reviews', requireAuth, validate(createReviewSchema), asyncHandler(Controller.submitReview));
router.patch('/admin/reviews/:reviewId/approve', isAdmin, asyncHandler(Controller.approveReview));

// --- Favorites ---
router.get('/me/favorites', requireAuth, asyncHandler(Controller.getMyFavorites));
router.post('/me/favorites/:courseId', requireAuth, asyncHandler(Controller.toggleFavorite));

export default router;
