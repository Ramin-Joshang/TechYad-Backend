import { Enrollment } from './enrollment.model.js';
import { LessonProgress } from './lesson-progress.model.js';
import { Course } from '../courses/course.model.js';
import { Lesson } from '../courses/lesson.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class LearningService {
  // --- Enrollments ---
  static async enrollInFreeCourse(userId: string, courseId: string) {
    const course = await Course.findById(courseId);
    if (!course) throw new AppError('Course not found', 404, 'NOT_FOUND');
    if (course.price > 0) throw new AppError('Course is not free, please purchase it via cart', 400, 'BAD_REQUEST');
    if (course.status !== 'published') throw new AppError('Course is not available', 400, 'BAD_REQUEST');
    
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) throw new AppError('You are already enrolled in this course', 400, 'ALREADY_ENROLLED');

    return await Enrollment.create({
      userId,
      courseId,
      source: 'free',
      status: 'active',
      amount: 0
    });
  }

  static async getMyEnrollments(userId: string) {
    return await Enrollment.find({ userId })
      .populate('courseId', 'title slug thumbnail')
      .sort({ enrolledAt: -1 });
  }

  static async getMyEnrollmentDetails(userId: string, courseId: string) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) throw new AppError('Not enrolled in this course', 403, 'NOT_ENROLLED');
    return enrollment;
  }

  // --- Progress ---
  static async updateLessonProgress(userId: string, lessonId: string, data: any) {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new AppError('Lesson not found', 404, 'NOT_FOUND');

    // Only check enrollment if the lesson is not free
    if (!lesson.isFree) {
      const enrollment = await Enrollment.findOne({ userId, courseId: lesson.courseId });
      if (!enrollment) {
        throw new AppError('Must be enrolled to track progress for this lesson', 403, 'FORBIDDEN');
      }
    }

    const progressData: any = {
      ...data,
      courseId: lesson.courseId,
      lastWatchedAt: new Date()
    };

    if (data.completed) {
      progressData.completedAt = new Date();
    }

    const progress = await LessonProgress.findOneAndUpdate(
      { userId, lessonId },
      progressData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    return progress;
  }

  static async getLessonProgress(userId: string, lessonId: string) {
    return await LessonProgress.findOne({ userId, lessonId });
  }
}
