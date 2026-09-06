import { Schema, Types, model, Document } from "mongoose";

export type SubmissionStatus = "submitted" | "reviewing" | "graded" | "late";

export interface IAssignmentSubmission extends Document {
  assignmentId: Types.ObjectId;
  userId: Types.ObjectId;
  answerText?: string;
  files: Types.ObjectId[];
  submittedAt: Date;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  gradedBy?: Types.ObjectId;
  gradedAt?: Date;
}

const submissionSchema = new Schema<IAssignmentSubmission>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    answerText: String,
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    submittedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["submitted", "reviewing", "graded", "late"],
      default: "submitted",
    },
    score: Number,
    feedback: String,
    gradedBy: { type: Schema.Types.ObjectId, ref: "User" },
    gradedAt: Date,
  },
  { timestamps: true }
);

submissionSchema.index({ assignmentId: 1, userId: 1 }, { unique: true });

export const AssignmentSubmission = model<IAssignmentSubmission>(
  "AssignmentSubmission",
  submissionSchema
);
