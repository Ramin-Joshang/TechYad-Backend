import { CourseReview } from './course-review.model.js';
import { Favorite } from './favorite.model.js';
import { Course } from '../courses/course.model.js';
import { Enrollment } from '../learning/enrollment.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class CommunityService {
  // --- Reviews ---
  static async submitReview(userId: string, courseId: string, data: any) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) throw new AppError('You must be enrolled in the course to leave a review', 403, 'FORBIDDEN');

    const existing = await CourseReview.findOne({ userId, courseId });
    if (existing) throw new AppError('You have already submitted a review for this course', 400, 'ALREADY_REVIEWED');

    return await CourseReview.create({
      ...data,
      userId,
      courseId,
      status: 'pending' // Admin needs to approve
    });
  }

  static async getCourseReviews(courseId: string) {
    return await CourseReview.find({ courseId, status: 'approved' })
      .populate('userId', 'firstName lastName avatar')
      .sort({ createdAt: -1 });
  }

  static async approveReview(reviewId: string) {
    const review = await CourseReview.findByIdAndUpdate(reviewId, { status: 'approved' }, { new: true });
    if (!review) throw new AppError('Review not found', 404, 'NOT_FOUND');
    return review;
  }

  // --- Favorites ---
  static async toggleFavorite(userId: string, courseId: string) {
    const course = await Course.findById(courseId);
    if (!course || course.status !== 'published') throw new AppError('Course not available', 404, 'NOT_FOUND');

    const existing = await Favorite.findOne({ userId, courseId });
    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return { favorited: false };
    } else {
      await Favorite.create({ userId, courseId });
      return { favorited: true };
    }
  }

  static async getMyFavorites(userId: string) {
    return await Favorite.find({ userId })
      .populate('courseId', 'title slug thumbnail price instructors')
      .sort({ createdAt: -1 });
  }
}
