'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Star, BookOpen, Users, MapPin, Award, CheckCircle, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function InstructorProfileContainer({ id }: { id: string }) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['instructor', id],
    queryFn: () => api.get(`/instructors/${id}`).then(res => res.data)
  });

  // Mock data for courses and classes since backend might not have dedicated endpoints for "instructor's classes" that are public
  // Normally we would fetch: /api/v1/classes?instructorId={id}
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">درحال بارگذاری پروفایل...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">استاد پیدا نشد</div>;
  }

  const { userId, title, bio, avatar, specialties, education } = profile;
  const fullName = `${userId?.firstName} ${userId?.lastName}`;
  const displayAvatar = avatar || `https://ui-avatars.com/api/?name=${userId?.firstName}+${userId?.lastName}&size=200`;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white pt-20 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <img src={displayAvatar} alt={fullName} className="w-32 h-32 rounded-3xl object-cover shadow-2xl mx-auto border-4 border-white/10 mb-6" />
           <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
           <p className="text-lg text-blue-400 font-medium mb-6">{title}</p>
           
           <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
             <div className="flex items-center gap-2">
               <Star className="w-5 h-5 text-amber-400 fill-current" />
               <span className="font-bold text-white">۴.۹</span>
               <span>(۲۴۰ نظر)</span>
             </div>
             <div className="flex items-center gap-2">
               <Users className="w-5 h-5 text-blue-400" />
               <span className="font-bold text-white">۱,۲۵۰</span>
               <span>دانشجو</span>
             </div>
             <div className="flex items-center gap-2">
               <BookOpen className="w-5 h-5 text-purple-400" />
               <span className="font-bold text-white">۱۵</span>
               <span>دوره آموزشی</span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
           
           {/* About */}
           <section className="mb-12">
             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
               <Award className="w-6 h-6 text-blue-600" />
               درباره استاد
             </h2>
             <p className="text-gray-600 leading-loose whitespace-pre-wrap">{bio}</p>
           </section>

           {/* Specialties */}
           {specialties && specialties.length > 0 && (
             <section className="mb-12">
               <h3 className="text-lg font-bold text-gray-900 mb-4">تخصص‌ها</h3>
               <div className="flex flex-wrap gap-3">
                 {specialties.map((spec: string, idx: number) => (
                   <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                     {spec}
                   </span>
                 ))}
               </div>
             </section>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Education */}
              {education && education.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                    سوابق تحصیلی
                  </h2>
                  <div className="space-y-6">
                    {education.map((edu: any, idx: number) => (
                      <div key={idx} className="relative pl-6 border-r-2 border-gray-200 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -right-[7px] top-1.5 ring-4 ring-white"></div>
                        <h4 className="font-bold text-gray-900">{edu.degree} {edu.field}</h4>
                        <p className="text-gray-500 text-sm mt-1">{edu.university}</p>
                        {(edu.startYear || edu.endYear) && (
                          <p className="text-xs text-gray-400 mt-2 font-mono bg-gray-50 inline-block px-2 py-1 rounded">
                            {edu.startYear} - {edu.endYear || 'اکنون'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Work Experience - Mocked for visual since it's not in schema but requested */}
              <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                    سوابق کاری (نمونه)
                  </h2>
                  <div className="space-y-6">
                      <div className="relative pl-6 border-r-2 border-gray-200 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -right-[7px] top-1.5 ring-4 ring-white"></div>
                        <h4 className="font-bold text-gray-900">مدرس ارشد</h4>
                        <p className="text-gray-500 text-sm mt-1">آکادمی تک‌یاد</p>
                        <p className="text-xs text-gray-400 mt-2 font-mono bg-gray-50 inline-block px-2 py-1 rounded">
                          ۱۴۰۰ - اکنون
                        </p>
                      </div>
                  </div>
              </section>
           </div>
        </div>
      </div>

    </div>
  );
}
