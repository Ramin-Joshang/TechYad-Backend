import { Request, Response } from 'express';
import { BlogService } from './blog.service.js';
import { sendSuccess } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/middleware/auth.js';

export const createAdminArticle = async (req: AuthRequest, res: Response) => {
  const result = await BlogService.createArticle(req.user._id as string, req.body);
  sendSuccess(res, result, 'Article created successfully', 201);
};

export const getArticles = async (req: Request, res: Response) => {
  const result = await BlogService.getPublishedArticles();
  sendSuccess(res, result, 'Articles retrieved successfully');
};

export const getArticle = async (req: Request, res: Response) => {
  const result = await BlogService.getArticleBySlug(req.params.slug as string);
  sendSuccess(res, result, 'Article retrieved successfully');
};
