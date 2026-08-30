import { Schema, Types, model, Document } from "mongoose";

export interface IChapter extends Document {
  courseId: Types.ObjectId;

  title: string;
  description?: string;

  order: number;

  isPublished: boolean;
}

const chapterSchema = new Schema<IChapter>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    order: {
      type: Number,
      required: true,
      min: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

chapterSchema.index({ courseId: 1, order: 1 });

export const Chapter = model<IChapter>("Chapter", chapterSchema);
