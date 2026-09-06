import { Request, Response } from 'express';
import { LearningService } from './learning.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const getStudentDashboard = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getStudentDashboard(req.user._id as string);
  sendSuccess(res, result, 'Dashboard data retrieved successfully');
};

export const enrollFreeCourse = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.enrollInFreeCourse(req.user._id as string, req.params.courseId as string);
  sendSuccess(res, result, 'Successfully enrolled in course', 201);
};

export const getMyEnrollments = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getMyEnrollments(req.user._id as string);
  sendSuccess(res, result, 'Enrollments retrieved successfully');
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.updateLessonProgress(req.user._id as string, req.params.lessonId as string, req.body);
  sendSuccess(res, result, 'Progress updated successfully');
};

export const getLessonProgress = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getLessonProgress(req.user._id as string, req.params.lessonId as string);
  sendSuccess(res, result, 'Progress retrieved successfully');
};
