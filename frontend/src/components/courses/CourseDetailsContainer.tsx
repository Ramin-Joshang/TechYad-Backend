'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PlayCircle, FileText, CheckCircle, Clock, Book, User, Star, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import Link from 'next/link';

export function CourseDetailsContainer({ slug }: { slug: string }) {
  // Fetch Course
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => api.get(`/courses/${slug}`).then(res => res.data)
  });

  // Fetch Related Courses
  const { data: relatedCourses } = useQuery({
    queryKey: ['relatedCourses', course?._id],
    queryFn: () => api.get(`/courses/${course._id}/related`).then(res => res.data),
    enabled: !!course?._id
  });

  // Fetch Comments/Reviews - wait, the API uses lessons for comments, but we want course reviews. Let's just mock it or assume there's a reviews endpoint.
  // We'll just display a placeholder for reviews since backend doesn't have course reviews endpoint.

  if (courseLoading) {
    return <div className="min-h-screen flex items-center justify-center">درحال بارگذاری اطلاعات دوره...</div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">دوره پیدا نشد</div>;
  }

  const isFree = course.price === 0;
  const hasDiscount = course.discountPrice && course.discountPrice < course.price;
  const instructor = course.instructors?.[0];

  return (
    <div className="bg-gray-50 min-h-screen py-10 pb-20">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              {course.categoryId?.name && (
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
                  {course.categoryId.name}
                </span>
              )}
              {course.levelId?.name && (
                <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                  {course.levelId.name}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{course.title}</h1>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{course.shortDescription}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <span className="font-bold text-white">{course.averageRating || 'جدید'}</span>
                <span>({course.reviewCount || 0} نظر)</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{course.studentCount || 0} دانشجو</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.totalDuration ? Math.round(course.totalDuration / 60) + ' ساعت' : 'نامشخص'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img src={instructor?.avatar || `https://ui-avatars.com/api/?name=${instructor?.firstName}+${instructor?.lastName}`} alt="Instructor" className="w-12 h-12 rounded-full border-2 border-white/20" />
              <div>
                <p className="text-sm text-gray-400">مدرس دوره</p>
                <p className="font-bold text-white">{instructor?.firstName} {instructor?.lastName}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-2 shadow-2xl overflow-hidden relative">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                 <img src={course.thumbnail || `https://picsum.photos/seed/${course.slug}/800/450`} alt={course.title} className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-white/30 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </button>
                 </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-6 flex justify-center">
                  {isFree ? (
                    <span className="text-green-600">رایگان</span>
                  ) : hasDiscount ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-gray-400 text-sm line-through">{course.price.toLocaleString()} تومان</span>
                      <span className="text-blue-600">{course.discountPrice.toLocaleString()} تومان</span>
                    </div>
                  ) : (
                    <span className="text-blue-600">{course.price.toLocaleString()} تومان</span>
                  )}
                </div>
                
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all">
                  ثبت نام در دوره
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">ضمانت بازگشت وجه تا ۷ روز</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description */}
          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">درباره این دوره</h2>
            <div className="prose prose-blue max-w-none text-gray-600 leading-loose" dangerouslySetInnerHTML={{ __html: course.description || 'توضیحات تکمیلی برای این دوره ثبت نشده است.' }} />
          </section>

          {/* Features / What you learn */}
          {course.features?.length > 0 && (
            <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">در این دوره چه می‌آموزید؟</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Requirements & Target Audience */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.prerequisites?.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">پیشنیازها</h3>
                <ul className="space-y-3">
                  {course.prerequisites.map((req: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.targetAudience?.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">مخاطبین دوره</h3>
                <ul className="space-y-3">
                  {course.targetAudience.map((aud: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      {aud}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Curriculum / Chapters */}
          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">سرفصل‌های دوره</h2>
            <CourseCurriculum courseId={course._id} />
          </section>

          {/* Reviews */}
          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرات دانشجویان</h2>
            <div className="flex items-center gap-6 mb-8 bg-gray-50 p-6 rounded-xl">
               <div className="text-center">
                 <div className="text-5xl font-bold text-gray-900">{course.averageRating || 'جدید'}</div>
                 <div className="flex items-center gap-1 mt-2 text-amber-500">
                   {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(course.averageRating || 5) ? 'fill-current' : 'text-gray-300'}`} />)}
                 </div>
                 <div className="text-xs text-gray-500 mt-2">{course.reviewCount || 0} نظر</div>
               </div>
               <div className="flex-1 space-y-2">
                 {[5, 4, 3, 2, 1].map((stars) => (
                   <div key={stars} className="flex items-center gap-2 text-sm">
                     <span className="w-3">{stars}</span>
                     <Star className="w-3 h-3 text-gray-400" />
                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500" style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 10 : 0}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           
           {/* Instructor details */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4">درباره مدرس</h3>
             <div className="flex items-center gap-4 mb-4">
               <img src={instructor?.avatar || `https://ui-avatars.com/api/?name=${instructor?.firstName}+${instructor?.lastName}`} alt="Instructor" className="w-16 h-16 rounded-full" />
               <div>
                 <p className="font-bold text-gray-900 text-lg">{instructor?.firstName} {instructor?.lastName}</p>
                 <p className="text-sm text-gray-500">{instructor?.bio?.substring(0,50) || 'مدرس حرفه ای'}</p>
               </div>
             </div>
             <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
               {instructor?.bio || 'اطلاعات بیشتری در مورد این مدرس ثبت نشده است.'}
             </p>
             <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">مشاهده پروفایل</button>
           </div>

           {/* Course Info summary */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
               <div className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4"/> مدت زمان</div>
               <span className="font-medium text-gray-900">{course.totalDuration ? Math.round(course.totalDuration / 60) + ' ساعت' : 'نامشخص'}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
               <div className="flex items-center gap-2 text-gray-600"><Book className="w-4 h-4"/> تعداد ویدیوها</div>
               <span className="font-medium text-gray-900">{course.totalLessons || 0}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-100">
               <div className="flex items-center gap-2 text-gray-600"><CheckCircle className="w-4 h-4"/> سطح دوره</div>
               <span className="font-medium text-gray-900">{course.levelId?.name || 'همه سطوح'}</span>
             </div>
             <div className="flex justify-between items-center py-2">
               <div className="flex items-center gap-2 text-gray-600"><FileText className="w-4 h-4"/> پشتیبانی</div>
               <span className="font-medium text-gray-900">دارد</span>
             </div>
           </div>

        </div>
      </div>
      
      {/* Related Courses */}
      {relatedCourses && relatedCourses.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">دوره‌های مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCourses.map((rc: any) => (
              <CourseCard key={rc._id} course={rc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Child component to fetch and render Chapters and Lessons
function CourseCurriculum({ courseId }: { courseId: string }) {
  const { data: chapters, isLoading: chaptersLoading } = useQuery({
    queryKey: ['chapters', courseId],
    queryFn: () => api.get(`/courses/${courseId}/chapters`).then(res => res.data)
  });

  if (chaptersLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>)}
    </div>;
  }

  if (!chapters || chapters.length === 0) {
    return <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl">سرفصلی برای این دوره ثبت نشده است.</div>;
  }

  return (
    <div className="space-y-4">
      {chapters.map((chapter: any, index: number) => (
        <ChapterAccordion key={chapter._id} chapter={chapter} index={index + 1} />
      ))}
    </div>
  );
}

function ChapterAccordion({ chapter, index }: { chapter: any, index: number }) {
  const [isOpen, setIsOpen] = useState(index === 1);
  const { data: lessons, isLoading } = useQuery({
    queryKey: ['lessons', chapter._id],
    queryFn: () => api.get(`/chapters/${chapter._id}/lessons`).then(res => res.data),
    enabled: isOpen
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 text-right transition-colors ${isOpen ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
            {index}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{chapter.title}</h3>
            {chapter.description && <p className="text-sm text-gray-500 mt-1">{chapter.description}</p>}
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="bg-white p-4 border-t border-gray-100">
          {isLoading ? (
            <div className="py-4 text-center text-sm text-gray-500">درحال بارگذاری جلسات...</div>
          ) : !lessons || lessons.length === 0 ? (
            <div className="py-4 text-center text-sm text-gray-500">جلسه‌ای یافت نشد.</div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson: any, i: number) => (
                <div key={lesson._id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 group transition">
                  <div className="flex items-center gap-3">
                    {lesson.type === 'video' ? <PlayCircle className="w-5 h-5 text-gray-400" /> : <FileText className="w-5 h-5 text-gray-400" />}
                    <span className="text-gray-700 font-medium group-hover:text-blue-600 transition">{i + 1}. {lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {lesson.isFree ? (
                      <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold hover:bg-blue-200 transition">
                        پیش‌نمایش رایگان
                      </button>
                    ) : (
                      <Lock className="w-4 h-4 text-gray-300" />
                    )}
                    {lesson.video?.duration && (
                      <span className="text-xs text-gray-500 w-12 text-left">{Math.floor(lesson.video.duration / 60)}:{String(lesson.video.duration % 60).padStart(2, '0')}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  const isFree = course.price === 0;
  const hasDiscount = course.discountPrice && course.discountPrice < course.price;
  const instructor = course.instructors?.[0];
  const instructorName = instructor ? `${instructor.firstName} ${instructor.lastName}` : 'نامشخص';

  return (
    <Link href={`/courses/${course.slug}`} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img src={course.thumbnail || `https://picsum.photos/seed/${course.slug}/400/250`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute top-4 right-4 flex gap-2">
          {course.categoryId?.name && (
            <div className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              {course.categoryId.name}
            </div>
          )}
        </div>
        {hasDiscount && !isFree && (
          <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round((1 - course.discountPrice / course.price) * 100)}% تخفیف
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span>{course.averageRating || 'جدید'}</span>
          </div>
          {course.levelId?.name && (
             <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{course.levelId.name}</span>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">{course.title}</h3>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lg">
              {isFree ? (
                <span className="text-green-600">رایگان</span>
              ) : (
                <div className="flex flex-col">
                  {hasDiscount ? (
                    <>
                      <span className="text-gray-400 text-xs line-through">{course.price.toLocaleString()} تومان</span>
                      <span className="text-blue-600">{course.discountPrice.toLocaleString()} تومان</span>
                    </>
                  ) : (
                    <span className="text-blue-600">{course.price.toLocaleString()} تومان</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
