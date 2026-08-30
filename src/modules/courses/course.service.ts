import { Course } from './course.model.js';
import { Chapter } from './chapter.model.js';
import { Lesson } from './lesson.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class CourseService {
  // --- Courses ---
  static async createCourse(instructorId: string, data: any) {
    return await Course.create({
      ...data,
      instructors: [instructorId],
      createdBy: instructorId,
      status: 'draft'
    });
  }

  static async getCourses(query: any) {
    const filter: any = { status: 'published' };
    if (query.category) filter.categoryId = query.category;
    if (query.isFree === 'true') filter.price = 0;
    if (query.search) filter.$text = { $search: query.search };
    
    return await Course.find(filter)
      .populate('instructors', 'firstName lastName avatar')
      .populate('categoryId', 'name slug');
  }

  static async getCourseBySlug(slug: string) {
    const course = await Course.findOne({ slug, status: 'published' })
      .populate('instructors', 'firstName lastName avatar bio')
      .populate('categoryId', 'name slug');
    if (!course) throw new AppError('Course not found', 404, 'NOT_FOUND');
    return course;
  }

  static async updateCourse(id: string, instructorId: string, data: any) {
    const course = await Course.findOneAndUpdate(
      { _id: id, instructors: instructorId },
      data,
      { new: true, runValidators: true }
    );
    if (!course) throw new AppError('Course not found or unauthorized', 404, 'NOT_FOUND');
    return course;
  }

  // --- Admin Course Actions ---
  static async publishCourse(id: string) {
    const course = await Course.findByIdAndUpdate(id, { status: 'published', publishedAt: new Date() }, { new: true });
    if (!course) throw new AppError('Course not found', 404, 'NOT_FOUND');
    return course;
  }

  // --- Chapters ---
  static async createChapter(courseId: string, instructorId: string, data: any) {
    const course = await Course.findOne({ _id: courseId, instructors: instructorId });
    if (!course) throw new AppError('Course not found or unauthorized', 404, 'NOT_FOUND');
    
    return await Chapter.create({ ...data, courseId });
  }

  static async getChapters(courseId: string) {
    return await Chapter.find({ courseId }).sort({ order: 1 });
  }

  // --- Lessons ---
  static async createLesson(chapterId: string, instructorId: string, data: any) {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) throw new AppError('Chapter not found', 404, 'NOT_FOUND');

    const course = await Course.findOne({ _id: chapter.courseId, instructors: instructorId });
    if (!course) throw new AppError('Course not found or unauthorized', 404, 'NOT_FOUND');

    return await Lesson.create({ ...data, chapterId, courseId: course._id });
  }

  static async getLessons(chapterId: string) {
    return await Lesson.find({ chapterId }).sort({ order: 1 });
  }
}
