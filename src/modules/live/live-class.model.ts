import { Schema, Types, model, Document } from "mongoose";

export interface ILiveClass extends Document {
  courseId: Types.ObjectId;
  title: string;
  roomId: string;
  roomLink: string;
  scheduledAt: Date;
  durationMinutes: number;
  status: "scheduled" | "active" | "completed" | "cancelled";
}

const liveClassSchema = new Schema<ILiveClass>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    roomId: { type: String, required: true, unique: true },
    roomLink: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number, default: 60 },
    status: {
      type: String,
      enum: ["scheduled", "active", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export const LiveClass = model<ILiveClass>("LiveClass", liveClassSchema);
