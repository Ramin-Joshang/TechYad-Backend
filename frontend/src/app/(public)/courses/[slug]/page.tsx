'use client';

import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/features/courses/api/courses.api';
import { useParams } from 'next/navigation';
import { PlayCircle, CheckCircle2, Clock, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useMemo } from 'react';

// Reusable Chapter Accordion Component
function ChapterAccordion({ chapter }: { chapter: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: lessonsData, isLoading } = useQuery({
    queryKey: ['lessons', chapter._id],
    queryFn: () => coursesApi.getChapterLessons(chapter._id),
    enabled: isOpen, // Only fetch lessons when accordion is opened
  });

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            {chapter.order}
          </div>
          <h3 className="font-bold text-gray-900 text-right">{chapter.title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200">
          {isLoading ? (
            <div className="text-center py-4 text-sm text-gray-500 animate-pulse">در حال دریافت دروس...</div>
          ) : lessonsData?.data.length === 0 ? (
            <div className="text-center py-4 text-sm text-gray-500">درسی در این فصل وجود ندارد.</div>
          ) : (
            <ul className="space-y-3">
              {lessonsData?.data.map((lesson: any) => (
                <li key={lesson._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {lesson.duration && <span className="text-gray-500">{lesson.duration} دقیقه</span>}
                    {lesson.isFreePreview && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">رایگان</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: courseData, isLoading: courseLoading, error: courseError } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.getCourseBySlug(slug),
  });

  const course = courseData?.data;

  const { data: chaptersData } = useQuery({
    queryKey: ['chapters', course?._id],
    queryFn: () => coursesApi.getCourseChapters(course!._id),
    enabled: !!course?._id,
  });

  if (courseLoading) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="animate-pulse text-xl text-gray-500">در حال بارگذاری دوره...</div></div>;
  }

  if (courseError || !course) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="text-xl text-red-500">دوره یافت نشد یا خطایی رخ داده است.</div></div>;
  }

  const isFree = course.price === 0;

  return (
    <main className="flex-1 w-full bg-gray-50">
      {/* Course Header */}
      <section className="bg-gray-900 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 text-sm font-medium text-blue-400">
              <span>{course.categoryId?.name}</span>
              {course.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-800 rounded-md text-gray-300 text-xs">{tag}</span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">-- ساعت</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">سطح: همه سطوح</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {/* Action Card */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl relative -mb-32 lg:-mb-40 border border-gray-100 z-10">
              <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden relative group cursor-pointer flex items-center justify-center">
                {course.thumbnail ? (
                   <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <PlayCircle className="w-16 h-16 text-gray-300" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="text-3xl font-bold mb-6 text-center">
                {isFree ? (
                  <span className="text-green-600">رایگان</span>
                ) : (
                  <span className="text-blue-600">{course.price.toLocaleString()} <span className="text-base font-normal text-gray-500">تومان</span></span>
                )}
              </div>

              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 mb-4">
                ثبت‌نام در دوره
              </button>
              
              <div className="space-y-3 mt-6">
                <h4 className="font-bold text-sm text-gray-900">شامل:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> دسترسی دائمی به ویدئوها</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> فایل‌های تمرینی</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> پشتیبانی مستقیم استاد</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> گواهینامه پایان دوره</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Instructors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">مدرسین دوره</h2>
              <div className="flex flex-col gap-6">
                {course.instructors?.map(instructor => (
                  <div key={instructor._id} className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                       {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{instructor.firstName} {instructor.lastName}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {instructor.bio || 'توضیحات بیشتری برای این استاد ثبت نشده است.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Syllabus */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">سرفصل‌های دوره</h2>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                {!chaptersData ? (
                  <div className="text-center py-10 text-gray-500">در حال دریافت سرفصل‌ها...</div>
                ) : chaptersData.data.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">سرفصلی برای این دوره ثبت نشده است.</div>
                ) : (
                  <div>
                    {chaptersData.data.map(chapter => (
                      <ChapterAccordion key={chapter._id} chapter={chapter} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
