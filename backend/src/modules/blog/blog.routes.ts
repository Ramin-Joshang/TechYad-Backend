import { Router } from 'express';
import * as Controller from './blog.controller.js';
import { authenticate, authorize } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);
const isAdmin = [requireAuth, authorize('blog.manage')]; // Simplified for now

// Public routes
router.get('/articles', asyncHandler(Controller.getArticles));
router.get('/articles/:slug', asyncHandler(Controller.getArticle));

// Admin routes
router.post('/admin/articles', isAdmin, asyncHandler(Controller.createAdminArticle));

export default router;
