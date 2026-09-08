import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const Class = mongoose.connection.collection('classes');
  const classes = await Class.find({}).toArray();
  for (const cls of classes) {
    await Class.updateOne({ _id: cls._id }, { 
      $set: { 
        enrolledCount: Math.floor(Math.random() * (cls.capacity || 20)),
        rating: 4 + Math.random(),
        sessions: Math.floor(Math.random() * 10) + 4,
        thumbnail: `https://picsum.photos/seed/${cls._id}/600/400`
      } 
    });
  }
  console.log('Updated classes');
  process.exit(0);
}
run();
