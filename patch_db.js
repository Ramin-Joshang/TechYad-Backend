import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  
  const classesColl = db.collection('classes');
  const classes = await classesColl.find({}).toArray();
  for (const cls of classes) {
    const randomEnrolled = Math.floor(Math.random() * (cls.capacity || 20));
    const randomRating = 4 + (Math.random());
    const randomSessions = Math.floor(Math.random() * 10) + 4;
    await classesColl.updateOne({ _id: cls._id }, {
      $set: {
        enrolledCount: randomEnrolled,
        rating: randomRating,
        sessions: randomSessions,
        thumbnail: `https://picsum.photos/seed/${cls._id}/600/400`
      }
    });
  }
  
  const profilesColl = db.collection('instructorprofiles');
  const profiles = await profilesColl.find({}).toArray();
  for (const prof of profiles) {
    const randomRating = 4 + Math.random();
    const randomStudents = Math.floor(Math.random() * 500) + 50;
    const coursesCount = Math.floor(Math.random() * 5) + 2;
    const classesCount = Math.floor(Math.random() * 3) + 1;
    await profilesColl.updateOne({ _id: prof._id }, {
      $set: {
        rating: randomRating,
        totalStudents: randomStudents,
        coursesCount: coursesCount,
        classesCount: classesCount
      }
    });
  }
  
  console.log('Database patched successfully!');
  await client.close();
}

run().catch(console.error);
