import { Router } from 'express';
import * as Controller from './course.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { authenticate, authorize } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import {
  createCourseSchema,
  updateCourseSchema,
  createChapterSchema,
  createLessonSchema
} from './course.validation.js';
import * as CommentController from './comment.controller.js';

const router = Router();

// Middlewares
const requireAuth = asyncHandler(authenticate);
const isAdmin = [requireAuth, authorize('courses.publish')];

// --- Public Routes ---
router.get('/courses', asyncHandler(Controller.getCourses));
router.get('/courses/:slug', asyncHandler(Controller.getCourseBySlug));
router.get('/courses/:id/related', asyncHandler(Controller.getRelatedCourses));
router.get('/courses/:courseId/chapters', asyncHandler(Controller.getChapters));
router.get('/chapters/:chapterId/lessons', asyncHandler(Controller.getLessons));
router.get('/lessons/:lessonId/comments', asyncHandler(CommentController.getLessonComments));

// --- Auth Routes ---
router.post('/lessons/:lessonId/comments', requireAuth, asyncHandler(CommentController.addLessonComment));

// --- Instructor Routes ---
router.post('/instructor/courses', requireAuth, validate(createCourseSchema), asyncHandler(Controller.createCourse));
router.patch('/instructor/courses/:id', requireAuth, validate(updateCourseSchema), asyncHandler(Controller.updateCourse));
router.post('/instructor/courses/:id/request-review', requireAuth, asyncHandler(Controller.requestReview));
router.post('/instructor/courses/:courseId/chapters', requireAuth, validate(createChapterSchema), asyncHandler(Controller.createChapter));
router.post('/instructor/chapters/:chapterId/lessons', requireAuth, validate(createLessonSchema), asyncHandler(Controller.createLesson));

// --- Admin Routes ---
router.post('/admin/courses/:id/publish', isAdmin, asyncHandler(Controller.publishCourse));
router.post('/admin/courses/:id/reject', isAdmin, asyncHandler(Controller.rejectCourse));

export default router;
