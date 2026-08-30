import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const register = async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  sendSuccess(res, result, 'User registered successfully', 201);
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  sendSuccess(res, result, 'Login successful');
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  sendSuccess(res, {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role?.slug
  }, 'User profile retrieved successfully');
};
