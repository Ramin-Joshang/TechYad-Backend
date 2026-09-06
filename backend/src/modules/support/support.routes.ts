import { Router } from 'express';
import * as Controller from './support.controller.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();
const requireAuth = asyncHandler(authenticate);

router.post('/me/tickets', requireAuth, asyncHandler(Controller.createTicket));
router.get('/me/tickets', requireAuth, asyncHandler(Controller.getMyTickets));
router.get('/me/tickets/:id', requireAuth, asyncHandler(Controller.getTicketDetails));
router.post('/me/tickets/:id/messages', requireAuth, asyncHandler(Controller.replyToTicket));

export default router;
