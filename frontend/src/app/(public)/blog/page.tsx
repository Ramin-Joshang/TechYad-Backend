'use client';

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/features/blog/api/blog.api';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export default function BlogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => blogApi.getArticles(),
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">مجله آموزشی تک‌یاد</h1>
        <p className="text-lg text-gray-600">جدیدترین مقالات و آموزش‌های متنی در دنیای برنامه‌نویسی و تکنولوژی</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl h-96">
              <div className="h-48 bg-gray-100 rounded-t-2xl"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-red-500 font-medium">خطا در دریافت مقالات</p>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-gray-500 font-medium">مقاله‌ای یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data.map((article) => (
            <article key={article._id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <Link href={`/blog/${article.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
                {article.thumbnail ? (
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                    <span className="font-bold text-2xl opacity-50">TechYad</span>
                  </div>
                )}
              </Link>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {article.author.firstName} {article.author.lastName}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.createdAt).toLocaleDateString('fa-IR')}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                  {article.excerpt || article.content.substring(0, 150) + '...'}
                </p>
                
                <Link href={`/blog/${article.slug}`} className="text-blue-600 font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto w-fit">
                  مطالعه کامل مقاله
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
