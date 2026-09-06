import { Schema, Types, model, Document } from "mongoose";

export interface IFavorite extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
}

const favoriteSchema = new Schema<IFavorite>(
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
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Favorite = model<IFavorite>("Favorite", favoriteSchema);
