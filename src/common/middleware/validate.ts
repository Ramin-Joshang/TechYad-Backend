import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract all error messages
        const message = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return next(new AppError(message, 400, 'VALIDATION_ERROR'));
      }
      return next(error);
    }
  };
