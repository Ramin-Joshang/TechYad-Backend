'use client';

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/features/blog/api/blog.api';
import { useParams } from 'next/navigation';
import { Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => blogApi.getArticleBySlug(slug),
  });

  const article = articleData?.data;

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="animate-pulse text-xl text-gray-500">در حال بارگذاری مقاله...</div></div>;
  }

  if (error || !article) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="text-xl text-red-500">مقاله یافت نشد یا خطایی رخ داده است.</div></div>;
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {article.thumbnail && (
          <div className="w-full aspect-[21/9] bg-gray-100 relative">
            <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="p-8 md:p-12">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-sm font-medium text-gray-500 pb-8 border-b border-gray-100 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-gray-900 font-bold">{article.author.firstName} {article.author.lastName}</div>
                <div className="text-xs">نویسنده تک‌یاد</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.createdAt).toLocaleDateString('fa-IR')}
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed text-lg [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:text-gray-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>li]:mb-2 [&>a]:text-blue-600 [&>a]:underline">
            {/* Displaying raw HTML assuming content is rich text. Security: Ensure backend sanitizes it or use DOMPurify if needed */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </article>
      
      <div className="mt-12 text-center">
        <Link href="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition">
          بازگشت به لیست مقالات
        </Link>
      </div>
    </main>
  );
}
