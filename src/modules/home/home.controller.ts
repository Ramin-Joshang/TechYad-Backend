import { Request, Response } from 'express';
import { sendSuccess } from '../../common/utils/response.js';

export const getHomeData = async (req: Request, res: Response) => {
  // We can return a rich set of data for the homepage.
  // Ideally this would query various collections, but to ensure a populated UI
  // out of the box, we'll return structured data representing what would be in the DB.

  const data = {
    categories: [
      { id: '1', title: 'برنامه‌نویسی', icon: 'Code', courseCount: 120 },
      { id: '2', title: 'طراحی گرافیک', icon: 'PenTool', courseCount: 85 },
      { id: '3', title: 'کسب و کار', icon: 'Briefcase', courseCount: 64 },
      { id: '4', title: 'زبان‌های خارجی', icon: 'Languages', courseCount: 210 },
      { id: '5', title: 'هوش مصنوعی', icon: 'Brain', courseCount: 45 },
      { id: '6', title: 'موسیقی', icon: 'Music', courseCount: 30 },
      { id: '7', title: 'عکاسی', icon: 'Camera', courseCount: 55 },
      { id: '8', title: 'بازاریابی', icon: 'LineChart', courseCount: 90 },
    ],
    popularCourses: [
      { id: 'c1', title: 'آموزش جامع React و Next.js', slug: 'react-nextjs', instructor: 'علی محمدی', instructorAvatar: 'https://i.pravatar.cc/150?u=ali', rating: 4.8, studentsCount: 1540, price: 1200000, originalPrice: 1500000, duration: '45 ساعت', level: 'پیشرفته', coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop' },
      { id: 'c2', title: 'طراحی رابط کاربری با Figma', slug: 'ui-ux-figma', instructor: 'سارا احمدی', instructorAvatar: 'https://i.pravatar.cc/150?u=sara', rating: 4.9, studentsCount: 980, price: 850000, originalPrice: 950000, duration: '20 ساعت', level: 'مبتدی تا پیشرفته', coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
      { id: 'c3', title: 'دوره جامع Python', slug: 'python-masterclass', instructor: 'رضا کریمی', instructorAvatar: 'https://i.pravatar.cc/150?u=reza', rating: 4.7, studentsCount: 2100, price: 900000, originalPrice: null, duration: '60 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop' },
      { id: 'c4', title: 'دیجیتال مارکتینگ و سئو', slug: 'digital-marketing', instructor: 'مینا رضایی', instructorAvatar: 'https://i.pravatar.cc/150?u=mina', rating: 4.6, studentsCount: 1100, price: 650000, originalPrice: 800000, duration: '35 ساعت', level: 'متوسط', coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop' },
    ],
    newCourses: [
      { id: 'n1', title: 'توسعه برنامه‌های موبایل با Flutter', slug: 'flutter-dev', instructor: 'امیر حسینی', instructorAvatar: 'https://i.pravatar.cc/150?u=amir', rating: 5.0, studentsCount: 120, price: 1400000, originalPrice: 1800000, duration: '50 ساعت', level: 'پیشرفته', coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
      { id: 'n2', title: 'آموزش Node.js و Express', slug: 'nodejs-express', instructor: 'محمد اکبری', instructorAvatar: 'https://i.pravatar.cc/150?u=mohammad', rating: 4.5, studentsCount: 300, price: 1100000, originalPrice: null, duration: '40 ساعت', level: 'متوسط', coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop' },
      { id: 'n3', title: 'مبانی هوش مصنوعی', slug: 'ai-basics', instructor: 'دکتر علوی', instructorAvatar: 'https://i.pravatar.cc/150?u=alavi', rating: 4.8, studentsCount: 450, price: 0, originalPrice: 500000, duration: '15 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop' },
      { id: 'n4', title: 'آموزش عکاسی پرتره', slug: 'portrait-photography', instructor: 'لیلا امینی', instructorAvatar: 'https://i.pravatar.cc/150?u=leila', rating: 4.9, studentsCount: 280, price: 750000, originalPrice: 900000, duration: '12 ساعت', level: 'همه سطوح', coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop' },
    ],
    freeCourses: [
      { id: 'f1', title: 'شروع کار با Git و GitHub', slug: 'git-github-basics', instructor: 'علی محمدی', instructorAvatar: 'https://i.pravatar.cc/150?u=ali', rating: 4.7, studentsCount: 5400, price: 0, originalPrice: null, duration: '4 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop' },
      { id: 'f2', title: 'مقدمه‌ای بر جاوااسکریپت', slug: 'intro-javascript', instructor: 'سارا احمدی', instructorAvatar: 'https://i.pravatar.cc/150?u=sara', rating: 4.6, studentsCount: 3200, price: 0, originalPrice: null, duration: '6 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop' },
      { id: 'f3', title: 'اصول فن بیان', slug: 'public-speaking-basics', instructor: 'رضا کریمی', instructorAvatar: 'https://i.pravatar.cc/150?u=reza', rating: 4.8, studentsCount: 4100, price: 0, originalPrice: null, duration: '3 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1475721025599-cf1dea14b46c?q=80&w=800&auto=format&fit=crop' },
      { id: 'f4', title: 'مبانی طراحی وب (HTML/CSS)', slug: 'web-design-basics', instructor: 'مینا رضایی', instructorAvatar: 'https://i.pravatar.cc/150?u=mina', rating: 4.5, studentsCount: 6500, price: 0, originalPrice: null, duration: '8 ساعت', level: 'مبتدی', coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=800&auto=format&fit=crop' },
    ],
    topInstructors: [
      { id: 'i1', name: 'علی محمدی', specialty: 'برنامه‌نویسی وب', avatar: 'https://i.pravatar.cc/300?u=ali', students: 15000, courses: 12, rating: 4.9 },
      { id: 'i2', name: 'سارا احمدی', specialty: 'طراحی محصول (UI/UX)', avatar: 'https://i.pravatar.cc/300?u=sara', students: 12000, courses: 8, rating: 4.8 },
      { id: 'i3', name: 'رضا کریمی', specialty: 'علم داده و هوش مصنوعی', avatar: 'https://i.pravatar.cc/300?u=reza', students: 9500, courses: 5, rating: 4.7 },
      { id: 'i4', name: 'مینا رضایی', specialty: 'دیجیتال مارکتینگ', avatar: 'https://i.pravatar.cc/300?u=mina', students: 8000, courses: 10, rating: 4.8 },
    ],
    onlineClasses: [
      { id: 'oc1', title: 'بوت‌کمپ برنامه‌نویسی فرانت‌اند', startDate: '۱۵ مهر ۱۴۰۳', capacity: 30, enrolled: 25, price: 4500000, type: 'online' },
      { id: 'oc2', title: 'کارگاه عملی سئو پیشرفته', startDate: '۲۰ مهر ۱۴۰۳', capacity: 50, enrolled: 48, price: 1200000, type: 'online' },
      { id: 'oc3', title: 'کلاس تعاملی مکالمه زبان انگلیسی', startDate: '۱ آبان ۱۴۰۳', capacity: 15, enrolled: 10, price: 800000, type: 'online' },
    ],
    inPersonClasses: [
      { id: 'ip1', title: 'دوره جامع عکاسی استودیویی', startDate: '۱۰ مهر ۱۴۰۳', location: 'تهران، شعبه مرکزی', capacity: 15, enrolled: 12, price: 5500000, type: 'in-person' },
      { id: 'ip2', title: 'کارگاه آموزش باریستا و مدیریت کافه', startDate: '۲۵ مهر ۱۴۰۳', location: 'تهران، شعبه غرب', capacity: 10, enrolled: 10, price: 3000000, type: 'in-person' },
    ],
    testimonials: [
      { id: 't1', text: 'دوره React فوق‌العاده بود. پروژه‌های عملی باعث شد بتونم به راحتی وارد بازار کار بشم و الان به عنوان جونیور مشغول به کار هستم.', author: 'امید علوی', role: 'توسعه‌دهنده فرانت‌اند', avatar: 'https://i.pravatar.cc/150?u=omid' },
      { id: 't2', text: 'اساتید تک‌یاد واقعا دلسوز و حرفه‌ای هستند. پشتیبانی دوره‌ها بی‌نظیره و همیشه پاسخگوی سوالات ما بودن.', author: 'نگین رستمی', role: 'طراح UI/UX', avatar: 'https://i.pravatar.cc/150?u=negin' },
      { id: 't3', text: 'من کلاس‌های آنلاین رو شرکت کردم. کیفیت ویدیوها و پلتفرم برگزاری کلاس خیلی روان و بدون مشکل بود.', author: 'محمد طاهری', role: 'دانشجو', avatar: 'https://i.pravatar.cc/150?u=mohammadt' },
    ],
    blogPosts: [
      { id: 'b1', title: 'نقشه راه یادگیری برنامه‌نویسی در سال ۲۰۲۴', slug: 'programming-roadmap-2024', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop', date: '۱۲ شهریور ۱۴۰۳', author: 'علی محمدی', readTime: '۷ دقیقه' },
      { id: 'b2', title: '۱۰ ابزار ضروری برای طراحان رابط کاربری', slug: 'essential-ui-tools', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop', date: '۱۰ شهریور ۱۴۰۳', author: 'سارا احمدی', readTime: '۵ دقیقه' },
      { id: 'b3', title: 'چگونه در مصاحبه‌های شغلی موفق شویم؟', slug: 'job-interview-tips', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop', date: '۵ شهریور ۱۴۰۳', author: 'تیم تحریریه تک‌یاد', readTime: '۱۰ دقیقه' },
    ]
  };

  sendSuccess(res, data, 'Home data retrieved successfully');
};
