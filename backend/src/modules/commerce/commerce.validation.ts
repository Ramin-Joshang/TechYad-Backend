import { z } from 'zod';

export const addToCartSchema = z.object({
  body: z.object({
    itemType: z.enum(['course', 'class']),
    itemId: z.string().min(1, 'Item ID is required')
  })
});

export const applyCouponSchema = z.object({
  body: z.object({
    code: z.string().min(2, 'Coupon code is required')
  })
});

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(2),
    type: z.enum(['percentage', 'fixed']),
    value: z.number().min(0),
    minOrderAmount: z.number().optional(),
    maxDiscount: z.number().optional(),
    usageLimit: z.number().optional(),
    perUserLimit: z.number().optional(),
    applicableProducts: z.array(z.object({
      itemType: z.enum(['course', 'class']),
      itemId: z.string()
    })).optional(),
    startAt: z.string().datetime().optional(),
    endAt: z.string().datetime().optional(),
    isActive: z.boolean().optional(),
  })
});
