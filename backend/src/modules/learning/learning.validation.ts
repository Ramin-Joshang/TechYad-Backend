import { z } from 'zod';

export const updateProgressSchema = z.object({
  body: z.object({
    watchedSeconds: z.number().min(0).optional(),
    progress: z.number().min(0).max(100).optional(),
    completed: z.boolean().optional()
  })
});
