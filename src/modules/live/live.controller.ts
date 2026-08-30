import { Request, Response } from 'express';
import { LiveService } from './live.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const createRoom = async (req: AuthRequest, res: Response) => {
  const result = await LiveService.createRoom(req.user._id as string, req.params.courseId as string, req.body);
  sendSuccess(res, result, 'Live class room created successfully', 201);
};

export const getCourseLiveClasses = async (req: Request, res: Response) => {
  const result = await LiveService.getCourseLiveClasses(req.params.courseId as string);
  sendSuccess(res, result, 'Live classes retrieved successfully');
};

export const updateRoomStatus = async (req: AuthRequest, res: Response) => {
  const result = await LiveService.updateRoomStatus(req.user._id as string, req.params.roomId as string, req.body.status);
  sendSuccess(res, result, 'Live class status updated');
};
