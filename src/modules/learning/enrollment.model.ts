import { Schema, Types, model, Document } from "mongoose";

export type EnrollmentStatus = "active" | "completed" | "cancelled";
export type EnrollmentSource = "purchase" | "free" | "admin" | "gift";

export interface IEnrollment extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  orderId?: Types.ObjectId;
  source: EnrollmentSource;
  status: EnrollmentStatus;
  amount: number;
  enrolledAt: Date;
  completedAt?: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    source: {
      type: String,
      enum: ["purchase", "free", "admin", "gift"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    amount: {
      type: Number,
      default: 0,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
  },
  { timestamps: true }
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);
