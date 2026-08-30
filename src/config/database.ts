import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.warn('⚠️ Running without a database connection. Please provide a valid online MONGO_URI (e.g., MongoDB Atlas) in your .env file.');
  }
};
