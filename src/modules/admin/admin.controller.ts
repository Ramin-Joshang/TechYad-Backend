import { Request, Response } from 'express';
import { AdminService } from './admin.service.js';
import { sendSuccess } from '../../common/utils/response.js';

export const getDashboardStats = async (req: Request, res: Response) => {
  const result = await AdminService.getDashboardStats();
  sendSuccess(res, result, 'Dashboard statistics retrieved');
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await AdminService.getUsers();
  sendSuccess(res, result, 'Users retrieved');
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const result = await AdminService.updateUserStatus(req.params.id as string, req.body.status);
  sendSuccess(res, result, 'User status updated');
};

export const createCoupon = async (req: Request, res: Response) => {
  const result = await AdminService.createCoupon(req.body);
  sendSuccess(res, result, 'Coupon created successfully', 201);
};

export const getCoupons = async (req: Request, res: Response) => {
  const result = await AdminService.getCoupons();
  sendSuccess(res, result, 'Coupons retrieved');
};

export const deleteCoupon = async (req: Request, res: Response) => {
  const result = await AdminService.deleteCoupon(req.params.id as string);
  sendSuccess(res, result, 'Coupon deleted');
};
