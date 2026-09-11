import { Router } from 'express';
import * as Controller from './learning.controller.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { updateProgressSchema, submitAssignmentSchema } from './learning.validation.js';
import { validate } from '../../common/middleware/validate.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);

// --- Dashboard ---
router.get('/dashboard', requireAuth, asyncHandler(Controller.getStudentDashboard));

// --- Enrollments ---
router.get('/enrollments', requireAuth, asyncHandler(Controller.getMyEnrollments));
router.get('/enrollments/:courseId', requireAuth, asyncHandler(Controller.getMyEnrollmentDetails));
router.post('/enrollments/free/:courseId', requireAuth, asyncHandler(Controller.enrollInFreeCourse));

// --- Secure Lesson Access ---
router.get('/lessons/:lessonId', requireAuth, asyncHandler(Controller.getSecureLesson));

// --- Progress ---
router.post('/progress/:lessonId', requireAuth, validate(updateProgressSchema), asyncHandler(Controller.updateLessonProgress));
router.get('/progress/:lessonId', requireAuth, asyncHandler(Controller.getLessonProgress));

// --- Assignments ---
router.post('/assignments/:lessonId/submit', requireAuth, validate(submitAssignmentSchema), asyncHandler(Controller.submitAssignment));
router.get('/assignments/:lessonId', requireAuth, asyncHandler(Controller.getAssignmentSubmission));

export default router;
