import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Role } from './modules/auth/role.model.js';
import { User } from './modules/auth/user.model.js';
import { Article } from './modules/blog/article.model.js';
import { Course } from './modules/courses/course.model.js';
import { Class } from './modules/classes/class.model.js';
import { Category } from './modules/catalog/category.model.js';
import * as argon2 from 'argon2';

// Ensure you have these models built and imported correctly.
// You might need to adjust paths based on your actual backend structure.

dotenv.config();

async function seed() {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error("MONGO_URI is missing in .env file");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.");

    // Clear existing data (optional, remove if you want to keep existing data)
    // await Role.deleteMany();
    // await User.deleteMany();
    // await Article.deleteMany();
    // await Course.deleteMany();
    // await Class.deleteMany();
    // await Category.deleteMany();

    console.log("Creating default roles...");
    const adminRole = await Role.findOneAndUpdate({ slug: 'admin' }, { name: 'Admin', slug: 'admin', permissions: ['all'] }, { upsert: true, new: true });
    const instructorRole = await Role.findOneAndUpdate({ slug: 'instructor' }, { name: 'Instructor', slug: 'instructor', permissions: ['create_course', 'create_class'] }, { upsert: true, new: true });
    const studentRole = await Role.findOneAndUpdate({ slug: 'student' }, { name: 'Student', slug: 'student', permissions: ['enroll'] }, { upsert: true, new: true });

    console.log("Creating default categories...");
    const techCategory = await Category.findOneAndUpdate({ slug: 'technology' }, { name: 'Technology', slug: 'technology', description: 'Tech courses' }, { upsert: true, new: true });

    console.log("Creating default users...");
    const passwordHash = await argon2.hash("password123");
    
    const admin = await User.findOneAndUpdate({ email: 'admin@techyad.com' }, {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@techyad.com',
      passwordHash,
      role: adminRole._id,
      status: 'active',
      emailVerified: true
    }, { upsert: true, new: true });

    const instructor = await User.findOneAndUpdate({ email: 'instructor@techyad.com' }, {
      firstName: 'John',
      lastName: 'Doe',
      email: 'instructor@techyad.com',
      passwordHash,
      role: instructorRole._id,
      status: 'active',
      emailVerified: true
    }, { upsert: true, new: true });

    console.log("Creating default articles...");
    await Article.findOneAndUpdate({ slug: 'getting-started-with-react' }, {
      title: 'Getting Started with React in 2026',
      slug: 'getting-started-with-react',
      excerpt: 'Learn the basics of React and how to build modern web applications.',
      content: '<p>React is a popular JavaScript library for building user interfaces...</p><h2>Introduction</h2><p>Here is how you start...</p>',
      authorId: instructor._id,
      status: 'published',
      tags: ['React', 'JavaScript', 'Frontend'],
      thumbnail: 'https://picsum.photos/seed/react/800/400'
    }, { upsert: true });

    console.log("Creating default courses...");
    await Course.findOneAndUpdate({ slug: 'react-masterclass' }, {
      title: 'React Masterclass',
      slug: 'react-masterclass',
      description: 'A comprehensive guide to React.',
      price: 1500000,
      instructors: [instructor._id],
      categoryId: techCategory._id,
      status: 'published',
      averageRating: 4.8,
      reviewCount: 150,
      studentCount: 1200,
      thumbnail: 'https://picsum.photos/seed/course1/800/400'
    }, { upsert: true });

    console.log("Creating default classes...");
    await Class.findOneAndUpdate({ slug: 'nextjs-bootcamp' }, {
      title: 'Next.js 15 Bootcamp',
      slug: 'nextjs-bootcamp',
      description: 'Live interactive Next.js classes.',
      price: 2500000,
      instructors: [instructor._id],
      categoryId: techCategory._id,
      status: 'published',
      mode: 'online',
      capacity: 30,
      enrolledCount: 15,
      registrationStartDate: new Date(),
      registrationEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000)
    }, { upsert: true });

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
