import { Response } from 'express';
import { SupportService } from './support.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const createTicket = async (req: AuthRequest, res: Response) => {
  const result = await SupportService.createTicket(req.user._id as string, req.body);
  sendSuccess(res, result, 'Ticket created successfully', 201);
};

export const getMyTickets = async (req: AuthRequest, res: Response) => {
  const result = await SupportService.getMyTickets(req.user._id as string);
  sendSuccess(res, result, 'Tickets retrieved successfully');
};

export const getTicketDetails = async (req: AuthRequest, res: Response) => {
  const result = await SupportService.getTicketDetails(req.user._id as string, req.params.id as string);
  sendSuccess(res, result, 'Ticket details retrieved successfully');
};

export const replyToTicket = async (req: AuthRequest, res: Response) => {
  const result = await SupportService.replyToTicket(req.user._id as string, req.params.id as string, req.body.message);
  sendSuccess(res, result, 'Reply sent successfully', 201);
};
