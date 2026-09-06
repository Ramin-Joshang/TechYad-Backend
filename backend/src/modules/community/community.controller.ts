import { Request, Response } from 'express';
import { CommunityService } from './community.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const submitReview = async (req: AuthRequest, res: Response) => {
  const result = await CommunityService.submitReview(req.user._id as string, req.params.courseId as string, req.body);
  sendSuccess(res, result, 'Review submitted successfully', 201);
};

export const getCourseReviews = async (req: Request, res: Response) => {
  const result = await CommunityService.getCourseReviews(req.params.courseId as string);
  sendSuccess(res, result, 'Reviews retrieved successfully');
};

export const approveReview = async (req: Request, res: Response) => {
  const result = await CommunityService.approveReview(req.params.reviewId as string);
  sendSuccess(res, result, 'Review approved successfully');
};

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  const result = await CommunityService.toggleFavorite(req.user._id as string, req.params.courseId as string);
  sendSuccess(res, result, result.favorited ? 'Added to favorites' : 'Removed from favorites');
};

export const getMyFavorites = async (req: AuthRequest, res: Response) => {
  const result = await CommunityService.getMyFavorites(req.user._id as string);
  sendSuccess(res, result, 'Favorites retrieved successfully');
};
