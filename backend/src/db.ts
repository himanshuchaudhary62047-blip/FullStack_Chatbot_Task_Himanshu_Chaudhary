import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dronetv_db';

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB database successfully.');
  } catch (error: any) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.warn('⚡ Please ensure local MongoDB service is running on port 27017 or update MONGODB_URI in .env');
  }
};

export default connectDB;
