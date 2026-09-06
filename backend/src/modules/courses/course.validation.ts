import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    slug: z.string().min(3, 'Slug is required'),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    categoryId: z.string().min(1, 'Category is required'),
    subjectId: z.string().optional(),
    fieldId: z.string().optional(),
    levelId: z.string().optional(),
    price: z.number().min(0).default(0),
    prerequisites: z.array(z.string()).optional(),
    targetAudience: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  })
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    categoryId: z.string().optional(),
    subjectId: z.string().optional(),
    fieldId: z.string().optional(),
    levelId: z.string().optional(),
    price: z.number().min(0).optional(),
    prerequisites: z.array(z.string()).optional(),
    targetAudience: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  })
});

export const createChapterSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().optional(),
    order: z.number().min(0),
  })
});

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Title is required'),
    type: z.enum(['video', 'text', 'live', 'mixed']).default('video'),
    isFree: z.boolean().default(false),
    order: z.number().min(0),
  })
});

export const reorderSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      id: z.string(),
      order: z.number().min(0)
    }))
  })
});
