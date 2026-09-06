import { Schema, Types, model, Document } from "mongoose";

export type LessonType = "video" | "text" | "live" | "mixed";

export interface ILesson extends Document {
  courseId: Types.ObjectId;
  chapterId: Types.ObjectId;

  title: string;
  slug?: string;

  description?: string;

  type: LessonType;

  video?: {
    provider: "spotplayer" | "self_hosted";
    externalId?: string;
    duration?: number;
    thumbnail?: string;
  };

  files: Types.ObjectId[];

  assignmentId?: Types.ObjectId;
  quizId?: Types.ObjectId;

  isFree: boolean;
  isPublished: boolean;

  order: number;
}

const lessonSchema = new Schema<ILesson>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: String,
    description: String,
    type: {
      type: String,
      enum: ["video", "text", "live", "mixed"],
      default: "video",
    },
    video: {
      provider: {
        type: String,
        enum: ["spotplayer", "self_hosted"],
      },
      externalId: String,
      duration: Number,
      thumbnail: String,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.index({
  chapterId: 1,
  order: 1,
});

export const Lesson = model<ILesson>("Lesson", lessonSchema);
