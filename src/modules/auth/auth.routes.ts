import { Router } from 'express';
import { register, login, getMe, updateProfile, forgotPassword, resetPassword } from './auth.controller.js';
import { validate } from '../../common/middleware/validate.js';
import { registerSchema, loginSchema, updateProfileSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation.js';
import { authenticate } from '../../common/middleware/auth.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.get('/me', asyncHandler(authenticate), asyncHandler(getMe));
router.patch('/me', asyncHandler(authenticate), validate(updateProfileSchema), asyncHandler(updateProfile));
router.post('/forgot-password', validate(forgotPasswordSchema), asyncHandler(forgotPassword));
router.post('/reset-password', validate(resetPasswordSchema), asyncHandler(resetPassword));

export default router;
