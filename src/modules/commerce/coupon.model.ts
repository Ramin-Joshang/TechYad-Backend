import { Schema, Types, model, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  perUserLimit?: number;
  applicableProducts: {
    itemType: "course" | "class";
    itemId: Types.ObjectId;
  }[];
  startAt?: Date;
  endAt?: Date;
  isActive: boolean;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: Number,
    maxDiscount: Number,
    usageLimit: Number,
    usageCount: {
      type: Number,
      default: 0,
    },
    perUserLimit: Number,
    applicableProducts: [
      {
        itemType: {
          type: String,
          enum: ["course", "class"],
          required: true,
        },
        itemId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    startAt: Date,
    endAt: Date,
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Coupon = model<ICoupon>("Coupon", couponSchema);
