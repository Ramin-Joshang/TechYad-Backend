import { Request, Response } from 'express';
import { LearningService } from './learning.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const getStudentDashboard = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getStudentDashboard(req.user._id as string);
  sendSuccess(res, result, 'Dashboard data retrieved successfully');
};

export const enrollInFreeCourse = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.enrollInFreeCourse(req.user._id as string, req.params.courseId as string);
  sendSuccess(res, result, 'Successfully enrolled in course', 201);
};

export const getMyEnrollments = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getMyEnrollments(req.user._id as string);
  sendSuccess(res, result, 'Enrollments retrieved successfully');
};

export const getMyEnrollmentDetails = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getMyEnrollmentDetails(req.user._id as string, req.params.courseId as string);
  sendSuccess(res, result, 'Enrollment details retrieved successfully');
};

export const getSecureLesson = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getSecureLesson(req.user._id as string, req.params.lessonId as string);
  sendSuccess(res, result, 'Secure lesson data retrieved successfully');
};

export const updateLessonProgress = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.updateLessonProgress(req.user._id as string, req.params.lessonId as string, req.body);
  sendSuccess(res, result, 'Progress updated successfully');
};

export const getLessonProgress = async (req: AuthRequest, res: Response) => {
  const result = await LearningService.getLessonProgress(req.user._id as string, req.params.lessonId as string);
  sendSuccess(res, result, 'Progress retrieved successfully');
};

export const submitAssignment = async (req: AuthRequest, res: Response) => {
  // Implementation will go to LearningService
  sendSuccess(res, {}, 'Assignment submitted successfully');
};

export const getAssignmentSubmission = async (req: AuthRequest, res: Response) => {
  // Implementation will go to LearningService
  sendSuccess(res, {}, 'Assignment submission retrieved');
};
