import { Router } from 'express';
import { register, login, getMe } from './auth.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.get('/me', asyncHandler(authenticate), asyncHandler(getMe));

export default router;
