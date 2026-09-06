import { Schema, Types, model, Document } from "mongoose";

export interface IClassEnrollment extends Document {
  userId: Types.ObjectId;
  classId: Types.ObjectId;
  orderId?: Types.ObjectId;
  status: "active" | "cancelled" | "completed";
  amount: number;
  enrolledAt: Date;
}

const classEnrollmentSchema = new Schema<IClassEnrollment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    status: { type: String, enum: ["active", "cancelled", "completed"], default: "active" },
    amount: { type: Number, required: true, default: 0 },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent double enrollment
classEnrollmentSchema.index({ userId: 1, classId: 1 }, { unique: true });

export const ClassEnrollment = model<IClassEnrollment>("ClassEnrollment", classEnrollmentSchema);
