import { Schema, Types, model, Document } from "mongoose";

interface IQuizAnswer {
  questionId: Types.ObjectId;
  selectedOptionIds: Types.ObjectId[];
  isCorrect?: boolean;
  score: number;
}

export interface IQuizAttempt extends Document {
  quizId: Types.ObjectId;
  userId: Types.ObjectId;
  answers: IQuizAnswer[];
  score: number;
  totalScore: number;
  percentage: number;
  startedAt: Date;
  submittedAt?: Date;
  status: "in_progress" | "submitted";
}

const quizAttemptSchema = new Schema<IQuizAttempt>(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, required: true },
        selectedOptionIds: [{ type: Schema.Types.ObjectId }],
        isCorrect: Boolean,
        score: { type: Number, default: 0 },
      },
    ],
    score: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    status: {
      type: String,
      enum: ["in_progress", "submitted"],
      default: "in_progress",
    },
  },
  { timestamps: true }
);

quizAttemptSchema.index({ quizId: 1, userId: 1 });

export const QuizAttempt = model<IQuizAttempt>(
  "QuizAttempt",
  quizAttemptSchema
);
