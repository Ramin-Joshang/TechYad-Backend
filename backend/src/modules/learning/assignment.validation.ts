import { z } from 'zod';

export const createAssignmentSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().min(5),
    type: z.enum(['file_upload', 'text_answer', 'mixed']),
    maxScore: z.number().min(0).default(100),
    deadline: z.string().datetime().optional(),
    attachments: z.array(z.string()).optional(),
  })
});

export const submitAssignmentSchema = z.object({
  body: z.object({
    answerText: z.string().optional(),
    files: z.array(z.string()).optional()
  })
});

export const gradeSubmissionSchema = z.object({
  body: z.object({
    score: z.number().min(0),
    feedback: z.string().optional()
  })
});
