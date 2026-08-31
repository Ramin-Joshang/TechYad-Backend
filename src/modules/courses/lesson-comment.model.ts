import { Schema, Types, model, Document } from "mongoose";

export interface ILessonComment extends Document {
  lessonId: Types.ObjectId;
  userId: Types.ObjectId;
  parentId?: Types.ObjectId;
  text: string;
  status: "pending" | "approved" | "rejected";
}

const lessonCommentSchema = new Schema<ILessonComment>(
  {
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "LessonComment" },
    text: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },
  },
  { timestamps: true }
);

export const LessonComment = model<ILessonComment>("LessonComment", lessonCommentSchema);
