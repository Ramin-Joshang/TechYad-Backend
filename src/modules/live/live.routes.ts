import { Router } from 'express';
import * as Controller from './live.controller.js';
import { authenticate, authorize } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { z } from 'zod';
import { validate } from '../../common/middleware/validate.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);
const isInstructor = [requireAuth, authorize('courses.manage')];

const createRoomSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    scheduledAt: z.string().datetime(),
    durationMinutes: z.number().min(10).optional()
  })
});

// --- Public/Student ---
router.get('/courses/:courseId/live-classes', asyncHandler(Controller.getCourseLiveClasses));

// --- Instructor ---
router.post('/instructor/courses/:courseId/live-classes', isInstructor, validate(createRoomSchema), asyncHandler(Controller.createRoom));
router.patch('/instructor/live-classes/:roomId/status', isInstructor, asyncHandler(Controller.updateRoomStatus));

export default router;
