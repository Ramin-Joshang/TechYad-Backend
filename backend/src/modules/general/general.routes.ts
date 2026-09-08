import { Router } from 'express';
import * as Controller from './general.controller.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();

router.get('/faqs', asyncHandler(Controller.getFaqs));
router.post('/contact', asyncHandler(Controller.submitContact));
router.post('/careers', asyncHandler(Controller.submitCareer));

export default router;
