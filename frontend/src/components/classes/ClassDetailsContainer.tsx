'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Monitor, MapPin, Calendar, Clock, Users, ShieldCheck, CheckCircle } from 'lucide-react';
import { format } from 'date-fns-jalali';

export function ClassDetailsContainer({ slug }: { slug: string }) {
  const { data: cls, isLoading } = useQuery({
    queryKey: ['class', slug],
    queryFn: () => api.get(`/classes/${slug}`).then(res => res.data)
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">درحال بارگذاری اطلاعات کلاس...</div>;
  }

  if (!cls) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">کلاس پیدا نشد</div>;
  }

  const isOnline = cls.mode === 'online';
  const instructor = cls.instructors?.[0];
  const startDate = cls.startDate ? new Date(cls.startDate) : new Date();
  const endDate = cls.endDate ? new Date(cls.endDate) : new Date();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${isOnline ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isOnline ? <Monitor className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                {isOnline ? 'کلاس آنلاین' : 'کلاس حضوری'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-white/10 text-white">
                {cls.type === 'private' ? 'خصوصی' : 'عمومی'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{cls.title}</h1>
            
            <div className="flex flex-wrap items-center gap-8 text-gray-300">
               <div className="flex items-center gap-2">
                 <Calendar className="w-5 h-5 text-blue-400" />
                 <span>شروع از {format(startDate, 'd MMMM yyyy')}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Users className="w-5 h-5 text-purple-400" />
                 <span>ظرفیت: {cls.capacity} نفر</span>
               </div>
            </div>

            {instructor && (
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img src={instructor.avatar || `https://ui-avatars.com/api/?name=${instructor.firstName}+${instructor.lastName}`} className="w-12 h-12 rounded-full border-2 border-white/20" alt="Instructor" />
                <div>
                  <div className="text-sm text-gray-400 mb-1">استاد کلاس</div>
                  <div className="font-bold text-white">{instructor.firstName} {instructor.lastName}</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="w-full md:w-[400px]">
             <img src={`https://picsum.photos/seed/${cls._id}/800/600`} alt={cls.title} className="w-full h-[280px] object-cover rounded-2xl shadow-2xl border-4 border-white/10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">معرفی کلاس</h2>
              <div className="prose prose-blue max-w-none text-gray-600 leading-loose whitespace-pre-wrap">
                {cls.description}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">اطلاعات برگزاری</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                   <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                     <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 mb-1">تاریخ‌ها</h3>
                     <p className="text-sm text-gray-600">شروع: {format(startDate, 'yyyy/MM/dd')}</p>
                     <p className="text-sm text-gray-600">پایان: {format(endDate, 'yyyy/MM/dd')}</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                     {isOnline ? <Monitor className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 mb-1">{isOnline ? 'مکان برگزاری: پلتفرم آنلاین' : 'مکان برگزاری: حضوری'}</h3>
                     <p className="text-sm text-gray-600">{isOnline ? 'اسکای‌روم (لینک بعد از ثبت‌نام)' : (cls.location || 'تهران، مرکز نوآوری')}</p>
                   </div>
                 </div>
              </div>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 mb-2">هزینه ثبت‌نام</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {cls.price === 0 ? 'رایگان' : `${cls.price.toLocaleString()} تومان`}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>دسترسی به گروه پشتیبانی کلاس</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>دریافت فایل‌های ضبط شده (در صورت آنلاین بودن)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <span>تضمین کیفیت آموزش</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all mb-4">
                  ثبت‌نام در کلاس
                </button>
                <div className="text-center text-xs text-gray-400">
                  فقط ۳ نفر ظرفیت باقی مانده است.
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
