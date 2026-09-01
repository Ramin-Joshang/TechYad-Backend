'use client';

import { useQuery } from '@tanstack/react-query';
import { instructorsApi } from '@/features/instructors/api/instructors.api';
import { Users, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function InstructorsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['instructors'],
    queryFn: () => instructorsApi.getInstructors(),
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">اساتید تک‌یاد</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          با مجرب‌ترین و بهترین اساتید در حوزه‌های برنامه‌نویسی، طراحی و مدیریت آشنا شوید و از تجربیات آن‌ها بهره‌مند شوید.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-red-500 font-medium">خطا در دریافت لیست اساتید</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-gray-500 font-medium">هیچ استادی یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data.map((instructor) => (
            <Link href={`/instructors/${instructor._id}`} key={instructor._id} className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                {instructor.avatar ? (
                  <img src={instructor.avatar} alt={instructor.firstName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {instructor.firstName} {instructor.lastName}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {instructor.bio || 'مدرس تک‌یاد'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
