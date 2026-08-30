import { Schema, Types, model, Document } from "mongoose";

export interface ICourseReview extends Document {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
  status: "pending" | "approved" | "rejected";
}

const reviewSchema = new Schema<ICourseReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

reviewSchema.index({ courseId: 1, userId: 1 }, { unique: true });

export const CourseReview = model<ICourseReview>("CourseReview", reviewSchema);
