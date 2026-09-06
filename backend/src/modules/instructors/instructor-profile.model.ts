import { Schema, Types, model, Document } from "mongoose";

export interface IInstructorProfile extends Document {
  userId: Types.ObjectId;
  title: string;
  bio: string;
  avatar?: string;
  specialties: string[];
  education: {
    degree: string;
    field: string;
    university: string;
    startYear?: number;
    endYear?: number;
  }[];
  socialLinks: {
    linkedin?: string;
    website?: string;
    instagram?: string;
  };
  isApproved: boolean;
}

const instructorProfileSchema = new Schema<IInstructorProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: String,
    specialties: [{ type: String }],
    education: [
      {
        degree: String,
        field: String,
        university: String,
        startYear: Number,
        endYear: Number,
      }
    ],
    socialLinks: {
      linkedin: String,
      website: String,
      instagram: String,
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const InstructorProfile = model<IInstructorProfile>("InstructorProfile", instructorProfileSchema);
