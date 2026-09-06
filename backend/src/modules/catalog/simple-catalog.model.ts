import { Schema, model, Document } from "mongoose";

export interface ISimpleCatalog extends Document {
  name: string;
  slug: string;
  isActive: boolean;
}

const schema = new Schema<ISimpleCatalog>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subject = model<ISimpleCatalog>("Subject", schema);
export const Field = model<ISimpleCatalog>("Field", schema);
export const Level = model<ISimpleCatalog>("Level", schema);
