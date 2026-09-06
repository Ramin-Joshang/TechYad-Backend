import { Schema, model, Document } from "mongoose";

export interface ITestimonial extends Document {
  studentName: string;
  courseName: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    studentName: { type: String, required: true },
    courseName: { type: String, required: true },
    avatar: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export const Testimonial = model<ITestimonial>("Testimonial", testimonialSchema);
