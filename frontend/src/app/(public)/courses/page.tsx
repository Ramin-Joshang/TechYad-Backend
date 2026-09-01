'use client';

import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/features/courses/api/courses.api';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', search],
    queryFn: () => coursesApi.getCourses({ search }),
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">دوره‌های آموزشی</h1>
        <p className="text-gray-600">جدیدترین دوره‌های آموزشی برنامه‌نویسی، طراحی و مدیریت را یاد بگیرید.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-6">
              <SlidersHorizontal className="w-5 h-5" />
              فیلترها
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">جستجو</label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="نام دوره..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>
              
              {/* More filters will be implemented based on catalog API */}
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl h-80">
                  <div className="h-40 bg-gray-100 rounded-t-2xl"></div>
                  <div className="p-5 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded mt-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
              <p className="text-red-500 mb-2">خطا در دریافت لیست دوره‌ها</p>
              <button onClick={() => window.location.reload()} className="text-blue-600 text-sm font-medium hover:underline">
                تلاش مجدد
              </button>
            </div>
          ) : data?.data.courses.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto opacity-50" />
              </div>
              <p className="text-gray-600 font-medium">دوره‌ای با این مشخصات یافت نشد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data.courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
