import { Request, Response } from 'express';
import { CourseService } from './course.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const createCourse = async (req: AuthRequest, res: Response) => {
  const result = await CourseService.createCourse(req.user._id, req.body);
  sendSuccess(res, result, 'Course created successfully', 201);
};

export const getCourses = async (req: Request, res: Response) => {
  const result = await CourseService.getCourses(req.query);
  sendSuccess(res, result, 'Courses retrieved successfully');
};

export const getCourseBySlug = async (req: Request, res: Response) => {
  const result = await CourseService.getCourseBySlug(req.params.slug as string);
  sendSuccess(res, result, 'Course retrieved successfully');
};

export const updateCourse = async (req: AuthRequest, res: Response) => {
  const result = await CourseService.updateCourse(req.params.id as string, req.user._id, req.body);
  sendSuccess(res, result, 'Course updated successfully');
};

export const publishCourse = async (req: Request, res: Response) => {
  const result = await CourseService.publishCourse(req.params.id as string);
  sendSuccess(res, result, 'Course published successfully');
};

// Chapters
export const createChapter = async (req: AuthRequest, res: Response) => {
  const result = await CourseService.createChapter(req.params.courseId as string, req.user._id, req.body);
  sendSuccess(res, result, 'Chapter created successfully', 201);
};

export const getChapters = async (req: Request, res: Response) => {
  const result = await CourseService.getChapters(req.params.courseId as string);
  sendSuccess(res, result, 'Chapters retrieved successfully');
};

// Lessons
export const createLesson = async (req: AuthRequest, res: Response) => {
  const result = await CourseService.createLesson(req.params.chapterId as string, req.user._id, req.body);
  sendSuccess(res, result, 'Lesson created successfully', 201);
};

export const getLessons = async (req: Request, res: Response) => {
  const result = await CourseService.getLessons(req.params.chapterId as string);
  sendSuccess(res, result, 'Lessons retrieved successfully');
};
