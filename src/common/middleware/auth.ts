import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { AppError } from '../errors/AppError.js';
import { User } from '../../modules/auth/user.model.js';
import { IRole } from '../../modules/auth/role.model.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401, 'AUTH_UNAUTHORIZED'));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    const currentUser = await User.findById(decoded.id).populate<{ role: IRole }>('role');

    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401, 'AUTH_USER_NOT_FOUND'));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    next(new AppError('Invalid token or token has expired', 401, 'AUTH_INVALID_TOKEN'));
  }
};

export const authorize = (...permissions: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return next(new AppError('You do not have permission to perform this action', 403, 'AUTH_FORBIDDEN'));
    }

    const userPermissions: string[] = req.user.role.permissions || [];
    
    // Super admin bypass
    if (req.user.role.slug === 'super-admin') {
      return next();
    }

    const hasPermission = permissions.every(perm => userPermissions.includes(perm));

    if (!hasPermission) {
      return next(new AppError('You do not have permission to perform this action', 403, 'AUTH_FORBIDDEN'));
    }

    next();
  };
};
