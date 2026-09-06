import { Request, Response } from 'express';
import { CommerceService } from './commerce.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const getCart = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.getCart(req.user._id as string);
  sendSuccess(res, result, 'Cart retrieved successfully');
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.addToCart(req.user._id as string, req.body);
  sendSuccess(res, result, 'Item added to cart', 201);
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.removeFromCart(req.user._id as string, req.params.itemId as string);
  sendSuccess(res, result, 'Item removed from cart');
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.clearCart(req.user._id as string);
  sendSuccess(res, result, 'Cart cleared');
};

export const checkoutPreview = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.checkoutPreview(req.user._id as string, req.body.couponCode);
  sendSuccess(res, result, 'Checkout preview generated');
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.createOrder(req.user._id as string, req.body.couponCode);
  sendSuccess(res, result, 'Order created successfully', 201);
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.getMyOrders(req.user._id as string);
  sendSuccess(res, result, 'Orders retrieved successfully');
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.getOrderById(req.user._id as string, req.params.id as string);
  sendSuccess(res, result, 'Order retrieved successfully');
};

export const createMockPayment = async (req: AuthRequest, res: Response) => {
  const result = await CommerceService.createPaymentMock(req.user._id as string, req.params.orderId as string);
  sendSuccess(res, result, 'Payment intent created');
};
