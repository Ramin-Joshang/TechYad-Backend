import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const Class = mongoose.connection.collection('classes');
  const classes = await Class.find({}).toArray();
  
  for (const cls of classes) {
    const randomEnrolled = Math.floor(Math.random() * (cls.capacity || 20));
    const randomRating = 4 + (Math.random());
    const randomSessions = Math.floor(Math.random() * 10) + 4;
    
    await Class.updateOne({ _id: cls._id }, { 
      $set: { 
        enrolledCount: randomEnrolled,
        rating: randomRating,
        sessions: randomSessions,
        thumbnail: `https://picsum.photos/seed/${cls._id}/600/400`
      } 
    });
  }
  
  const InstructorProfile = mongoose.connection.collection('instructorprofiles');
  const profiles = await InstructorProfile.find({}).toArray();
  
  for (const prof of profiles) {
    const randomRating = 4 + Math.random();
    const randomStudents = Math.floor(Math.random() * 500) + 50;
    
    await InstructorProfile.updateOne({ _id: prof._id }, {
      $set: {
        rating: randomRating,
        totalStudents: randomStudents
      }
    });
  }
  
  console.log('Updated classes and instructor profiles');
  process.exit(0);
}

run();
