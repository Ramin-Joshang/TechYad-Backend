import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Class } from './src/modules/classes/class.model.js';
import { InstructorProfile } from './src/modules/instructors/instructor-profile.model.js';
import { User } from './src/modules/auth/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function seed() {
  console.log('Connecting to DB...', process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected');

  // Let's create some dummy instructors. We need Users for them.
  // Instead of relying on role, I'll just find any two users or create them.
  let users = await User.find().limit(2);
  let inst1 = users[0];
  let inst2 = users[1];

  if (!inst1) {
    inst1 = await User.create({
      firstName: 'علی',
      lastName: 'رضایی',
      email: 'ali@example.com',
      password: 'password123',
    });
  }

  if (!inst2) {
    inst2 = await User.create({
      firstName: 'مریم',
      lastName: 'شریفی',
      email: 'maryam@example.com',
      password: 'password123',
    });
  }

  // Ensure profiles exist
  await InstructorProfile.findOneAndUpdate(
    { userId: inst1._id },
    {
      title: 'دکترای مهندسی نرم افزار',
      bio: 'عضو هیئت علمی دانشگاه و توسعه دهنده ارشد با بیش از ۱۵ سال سابقه تدریس و کار حرفه ای.',
      avatar: `https://ui-avatars.com/api/?name=${inst1.firstName}+${inst1.lastName}&size=200`,
      specialties: ['برنامه نویسی', 'هوش مصنوعی', 'مهندسی نرم افزار'],
      education: [
        { degree: 'دکتری', field: 'مهندسی کامپیوتر', university: 'دانشگاه صنعتی شریف', startYear: 1390, endYear: 1395 },
        { degree: 'کارشناسی ارشد', field: 'مهندسی کامپیوتر', university: 'دانشگاه تهران', startYear: 1387, endYear: 1390 }
      ],
      isApproved: true
    },
    { upsert: true }
  );

  await InstructorProfile.findOneAndUpdate(
    { userId: inst2._id },
    {
      title: 'متخصص علوم داده و یادگیری ماشین',
      bio: 'پژوهشگر ارشد در زمینه پردازش زبان طبیعی و تدریس دوره‌های یادگیری عمیق.',
      avatar: `https://ui-avatars.com/api/?name=${inst2.firstName}+${inst2.lastName}&size=200`,
      specialties: ['یادگیری ماشین', 'پایتون', 'داده کاوی'],
      education: [
        { degree: 'دکتری', field: 'هوش مصنوعی', university: 'دانشگاه امیرکبیر', startYear: 1392, endYear: 1397 }
      ],
      isApproved: true
    },
    { upsert: true }
  );

  // Clear existing classes
  await Class.deleteMany({});

  const future1 = new Date();
  future1.setDate(future1.getDate() + 10);
  const future2 = new Date();
  future2.setDate(future2.getDate() + 30);

  const classes = [
    {
      title: 'کلاس آنلاین جاوا اسکریپت پیشرفته',
      slug: 'advanced-js-online',
      description: 'در این کلاس که به صورت آنلاین در محیط اسکای‌روم برگزار می‌شود، مفاهیم عمیق جاوااسکریپت شامل کلوژرها، پروتیپ‌ها و برنامه نویسی ناهمگام را بررسی می‌کنیم.',
      type: 'public',
      mode: 'online',
      instructors: [inst1._id],
      price: 850000,
      capacity: 25,
      startDate: future1,
      endDate: future2,
      meetingLink: 'https://skyroom.online/ch/js-advanced',
      status: 'published',
      createdBy: inst1._id
    },
    {
      title: 'دوره حضوری مهندسی داده با پایتون',
      slug: 'data-eng-python',
      description: 'یک بوت‌کمپ حضوری فشرده برای یادگیری مهندسی داده. این دوره در مرکز نوآوری برگزار شده و ظرفیت بسیار محدودی دارد.',
      type: 'public',
      mode: 'in_person',
      instructors: [inst2._id],
      price: 2500000,
      capacity: 15,
      startDate: future1,
      endDate: future2,
      location: 'تهران، پارک فناوری پردیس، ساختمان سراج',
      status: 'published',
      createdBy: inst2._id
    },
    {
      title: 'کلاس خصوصی رفع اشکال و منتورینگ ری‌اکت',
      slug: 'react-mentoring-private',
      description: 'کلاس خصوصی آنلاین جهت بررسی پروژه‌های شما و رفع اشکال در مفاهیم پیشرفته React و Next.js',
      type: 'private',
      mode: 'online',
      instructors: [inst1._id],
      price: 0,
      capacity: 5,
      startDate: future1,
      endDate: future2,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'published',
      createdBy: inst1._id
    }
  ];

  await Class.insertMany(classes);
  console.log('Successfully seeded classes and instructor profiles');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
