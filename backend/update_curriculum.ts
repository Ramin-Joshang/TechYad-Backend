import mongoose from "mongoose";
import { Course } from "./src/modules/courses/course.model.js";
import { Chapter } from "./src/modules/courses/chapter.model.js";
import { Lesson } from "./src/modules/courses/lesson.model.js";

async function run() {
  await mongoose.connect("mongodb://rjwshng_db_user:52MAZY3ZijrCC9hl@ac-odrjmze-shard-00-00.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-01.opldvna.mongodb.net:27017,ac-odrjmze-shard-00-02.opldvna.mongodb.net:27017/techyad?ssl=true&replicaSet=atlas-1dapb6-shard-0&authSource=admin&appName=Cluster0");
  
  const courses = await Course.find();
  for (const course of courses) {
    const chaptersCount = await Chapter.countDocuments({ courseId: course._id });
    if (chaptersCount === 0) {
      // Add Chapters
      for (let i = 1; i <= 3; i++) {
        const chapter = await Chapter.create({
          courseId: course._id,
          title: `فصل ${i}: مباحث تکمیلی و مهم`,
          description: `در این فصل به بررسی مفاهیم مهم و پایه‌ای می‌پردازیم.`,
          order: i,
          isPublished: true
        });

        // Add Lessons
        for (let j = 1; j <= 4; j++) {
          await Lesson.create({
            courseId: course._id,
            chapterId: chapter._id,
            title: `جلسه ${j} از فصل ${i}`,
            type: j % 3 === 0 ? "text" : "video",
            video: {
              provider: "spotplayer",
              duration: Math.floor(Math.random() * 900) + 300 // 5-15 mins
            },
            isFree: i === 1 && j <= 2, // First two lessons are free
            isPublished: true,
            order: j
          });
        }
      }
    }
  }
  console.log("Updated courses with curriculum");
  process.exit(0);
}
run();
