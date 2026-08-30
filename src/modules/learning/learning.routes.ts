import { Router } from 'express';
import * as Controller from './learning.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { updateProgressSchema } from './learning.validation.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);

// --- Enrollments ---
router.get('/me/enrollments', requireAuth, asyncHandler(Controller.getMyEnrollments));
router.post('/courses/:courseId/enroll', requireAuth, asyncHandler(Controller.enrollFreeCourse));

// --- Progress ---
router.get('/me/lessons/:lessonId/progress', requireAuth, asyncHandler(Controller.getLessonProgress));
router.post('/me/lessons/:lessonId/progress', requireAuth, validate(updateProgressSchema), asyncHandler(Controller.updateProgress));

export default router;
