import { Router } from 'express';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import * as Controller from './search.controller.js';

const router = Router();

router.get('/search', asyncHandler(Controller.globalSearch));

export default router;
