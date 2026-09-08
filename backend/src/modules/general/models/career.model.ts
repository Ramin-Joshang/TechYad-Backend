import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  specialty: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  resumeUrl: { type: String },
  demoUrl: { type: String },
  description: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

export const CareerApplication = mongoose.model('CareerApplication', careerSchema);
