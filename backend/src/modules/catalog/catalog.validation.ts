import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    slug: z.string().min(2, 'Slug is required'),
    parentId: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  })
});

export const createSimpleCatalogSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    slug: z.string().min(2, 'Slug is required'),
    isActive: z.boolean().optional(),
  })
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    parentId: z.string().optional().nullable(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  })
});

export const updateSimpleCatalogSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    isActive: z.boolean().optional(),
  })
});
