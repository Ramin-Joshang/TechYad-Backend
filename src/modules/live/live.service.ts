import { LiveClass } from './live-class.model.js';
import { Course } from '../courses/course.model.js';
import { AppError } from '../../common/errors/AppError.js';
import { Types } from 'mongoose';

export class LiveService {
  static async createRoom(instructorId: string, courseId: string, data: { title: string, scheduledAt: Date, durationMinutes?: number }) {
    const course = await Course.findOne({ _id: courseId, instructors: instructorId });
    if (!course) throw new AppError('Course not found or unauthorized', 403, 'FORBIDDEN');

    // Mock Skyroom/BigBlueButton API Call
    const mockRoomId = `skyroom_${new Types.ObjectId().toString().substring(0, 8)}`;
    const mockRoomLink = `https://www.skyroom.online/ch/techyad/${mockRoomId}`;

    const liveClass = await LiveClass.create({
      ...data,
      courseId,
      roomId: mockRoomId,
      roomLink: mockRoomLink,
      status: 'scheduled'
    });

    return liveClass;
  }

  static async getCourseLiveClasses(courseId: string) {
    return await LiveClass.find({ courseId }).sort({ scheduledAt: 1 });
  }

  static async updateRoomStatus(instructorId: string, roomId: string, status: 'active' | 'completed' | 'cancelled') {
    const liveClass = await LiveClass.findById(roomId).populate('courseId');
    if (!liveClass) throw new AppError('Live class not found', 404, 'NOT_FOUND');

    const course = await Course.findOne({ _id: liveClass.courseId, instructors: instructorId });
    if (!course) throw new AppError('Unauthorized', 403, 'FORBIDDEN');

    liveClass.status = status;
    await liveClass.save();
    return liveClass;
  }
}
