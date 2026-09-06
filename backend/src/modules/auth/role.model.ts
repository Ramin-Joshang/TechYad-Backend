import { Schema, model, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  slug: string;
  permissions: string[];
  description?: string;
}

const roleSchema = new Schema<IRole>(
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
      trim: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Role = model<IRole>("Role", roleSchema);
