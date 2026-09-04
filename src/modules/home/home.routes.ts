import { Router } from 'express';
import { getHomeData } from './home.controller.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();

// Public route to fetch all aggregated home page data
router.get('/home', asyncHandler(getHomeData));

export default router;
