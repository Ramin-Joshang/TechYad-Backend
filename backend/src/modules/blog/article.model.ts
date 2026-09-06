import { Schema, Types, model, Document } from "mongoose";

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  authorId: Types.ObjectId;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: String,
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const Article = model<IArticle>("Article", articleSchema);
