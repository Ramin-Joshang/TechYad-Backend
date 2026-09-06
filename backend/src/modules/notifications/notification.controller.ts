import { Response } from 'express';
import { NotificationService } from './notification.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  const result = await NotificationService.getUserNotifications(req.user._id as string);
  sendSuccess(res, result, 'Notifications retrieved successfully');
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  const result = await NotificationService.markAsRead(req.user._id as string, req.params.id as string);
  sendSuccess(res, result, 'Notification marked as read');
};

export const markAllAsRead = async (req: AuthRequest, res: Response) => {
  const result = await NotificationService.markAllAsRead(req.user._id as string);
  sendSuccess(res, result, 'All notifications marked as read');
};
