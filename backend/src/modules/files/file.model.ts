import { Schema, Types, model, Document } from "mongoose";

export interface IFile extends Document {
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  storageProvider: string;
  path: string;
  uploadedBy: Types.ObjectId;
}

const fileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    storageProvider: { type: String, default: 'local' },
    path: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const FileModel = model<IFile>("File", fileSchema);
