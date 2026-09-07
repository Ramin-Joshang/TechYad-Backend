import mongoose from "mongoose";
import { Course } from "./src/modules/courses/course.model.js";

async function run() {
  await mongoose.connect("mongodb://rjwshng_db_user:52MAZY3ZijrCC9hl@ac-odrjmze-shard-00-00.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-01.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-02.opldvna.mongodb.net:27017/techyad?ssl=true&replicaSet=atlas-1dapb6-shard-0&authSource=admin&appName=Cluster0");
  
  const courses = await Course.find();
  for (const course of courses) {
    course.averageRating = Math.round((Math.random() * (5 - 3) + 3) * 10) / 10; // 3.0 to 5.0
    course.studentCount = Math.floor(Math.random() * 1000) + 10;
    course.reviewCount = Math.floor(Math.random() * 200) + 5;
    if (course.price > 0 && Math.random() > 0.5) {
      course.discountPrice = course.price * 0.8; // 20% off
    }
    await course.save();
  }
  console.log("Updated courses with stats");
  process.exit(0);
}
run();
