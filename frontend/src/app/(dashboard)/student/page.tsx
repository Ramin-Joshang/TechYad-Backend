'use client';

import { useAuthStore } from '@/features/auth/stores/auth.store';
import { 
  BookOpen, PlayCircle, BarChart, FileText, CheckSquare,
  GraduationCap, CreditCard, Heart, Ticket, Bell, Video,
  Clock, ArrowLeft, Trophy, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'دوره‌های من', value: '۱۲', icon: BookOpen, color: 'bg-blue-500', link: '/student/courses' },
    { label: 'کلاس‌های من', value: '۳', icon: Video, color: 'bg-emerald-500', link: '/student/classes' },
    { label: 'تکالیف باقی‌مانده', value: '۵', icon: FileText, color: 'bg-amber-500', link: '/student/assignments' },
    { label: 'آزمون‌های پیش‌رو', value: '۲', icon: CheckSquare, color: 'bg-purple-500', link: '/student/quizzes' },
  ];

  const continueCourse = {
    title: 'برنامه‌نویسی ری‌اکت پیشرفته',
    progress: 65,
    lastSession: 'مدیریت استیت با Zustand',
    duration: '۱۲ دقیقه',
    thumbnail: 'https://picsum.photos/seed/react/400/200'
  };

  const quickLinks = [
    { label: 'پیشرفت تحصیلی', icon: BarChart, color: 'text-blue-600 bg-blue-50', link: '/student/progress' },
    { label: 'نمرات من', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50', link: '/student/grades' },
    { label: 'پرداخت‌ها', icon: CreditCard, color: 'text-amber-600 bg-amber-50', link: '/student/payments' },
    { label: 'علاقه‌مندی‌ها', icon: Heart, color: 'text-rose-600 bg-rose-50', link: '/student/favorites' },
    { label: 'پشتیبانی', icon: Ticket, color: 'text-purple-600 bg-purple-50', link: '/student/tickets' },
    { label: 'اعلان‌ها', icon: Bell, color: 'text-sky-600 bg-sky-50', link: '/student/notifications' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">سلام {user?.firstName}! 👋</h1>
          <p className="text-gray-500 text-lg">به پنل یادگیری خود خوش آمدید. آماده‌اید تا امروز چیز جدیدی یاد بگیرید؟</p>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
            <Trophy className="w-10 h-10 text-amber-500" />
            <div>
              <div className="text-sm text-gray-500 font-medium">امتیاز شما</div>
              <div className="text-2xl font-black text-gray-900">۱,۲۵۰ <span className="text-sm font-medium text-amber-500">XP</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.link} key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl text-white shadow-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              </div>
              <h3 className="text-gray-500 font-medium">{stat.label}</h3>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-blue-600" />
              ادامه یادگیری
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row group cursor-pointer hover:shadow-md transition-shadow">
            <div className="sm:w-64 h-48 sm:h-auto relative">
              <img src={continueCourse.thumbnail} alt={continueCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur rounded-full p-4 shadow-lg">
                  <PlayCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2 bg-blue-50 w-fit px-3 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                {continueCourse.duration}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{continueCourse.title}</h3>
              <p className="text-gray-500 mb-6 line-clamp-1">جلسه بعدی: {continueCourse.lastSession}</p>
              
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700">میزان پیشرفت</span>
                  <span className="font-bold text-blue-600">{continueCourse.progress}٪</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full relative" style={{ width: `${continueCourse.progress}%` }}>
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">دسترسی سریع</h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <Link href={link.link} key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-gray-50 transition-colors gap-3 border border-transparent hover:border-gray-100 text-center">
                    <div className={`p-4 rounded-2xl ${link.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
