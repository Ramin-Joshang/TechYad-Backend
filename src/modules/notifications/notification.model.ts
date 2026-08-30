import { Schema, Types, model, Document } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  type: string;
  title: string;
  message: string;
  data?: any;
  readAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { type: Schema.Types.Mixed },
    readAt: Date,
  },
  { timestamps: true }
);

export const Notification = model<INotification>("Notification", notificationSchema);
