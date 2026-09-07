'use client';

import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/features/blog/api/blog.api';
import { coursesApi } from '@/features/courses/api/courses.api';
import { useParams } from 'next/navigation';
import { Calendar, User, Tag, BookOpen, ArrowLeft, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => blogApi.getArticleBySlug(slug),
  });

  const { data: allArticlesData } = useQuery({
    queryKey: ['articles'],
    queryFn: () => blogApi.getArticles(),
  });

  const { data: coursesData } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getCourses({ limit: 4 }),
  });

  const article = articleData?.data;
  const allArticles = allArticlesData?.data || [];
  const courses = coursesData?.data?.courses || [];

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="animate-pulse text-xl text-gray-500">در حال بارگذاری مقاله...</div></div>;
  }

  if (error || !article) {
    return <div className="flex-1 flex items-center justify-center p-20"><div className="text-xl text-red-500">مقاله یافت نشد یا خطایی رخ داده است.</div></div>;
  }

  const relatedArticles = allArticles.filter(a => a.slug !== slug).slice(0, 4);
  const relatedCourse = courses.length > 0 ? courses[Math.floor(Math.random() * courses.length)] : null;

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <article className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mb-12">
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
                <div className="text-gray-900 font-bold">{article.author?.firstName} {article.author?.lastName}</div>
                <div className="text-xs">نویسنده تک‌یاد</div>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.createdAt).toLocaleDateString('fa-IR')}
            </div>
          </div>
          
          <div className="text-gray-700 leading-relaxed text-lg [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:text-gray-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>li]:mb-2 [&>a]:text-blue-600 [&>a]:underline">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Author Box */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gray-50 p-6 rounded-2xl">
            <img 
              src={`https://ui-avatars.com/api/?name=${article.author?.firstName}+${article.author?.lastName}&size=100&background=random`} 
              alt={article.author?.firstName} 
              className="w-20 h-20 rounded-full shadow-md"
            />
            <div className="text-center sm:text-right flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{article.author?.firstName} {article.author?.lastName}</h3>
              <p className="text-sm font-medium text-blue-600 mb-3">مدرس و نویسنده ارشد</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                علاقه‌مند به تکنولوژی و آموزش مفاهیم پیچیده به ساده‌ترین شکل ممکن. تلاش می‌کنم در مقالاتم تجربیات چندین ساله خودم را با شما به اشتراک بگذارم و مسیر یادگیری را برای شما هموارتر کنم.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Conversion Banner: Related Course */}
      {relatedCourse && (
        <div className="mb-12 bg-gradient-to-l from-blue-900 to-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/texture/1000/300')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-right">
              <div className="text-amber-400 text-sm font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                <BookOpen className="w-4 h-4" /> این مقاله را خواندی؟
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">دوره مرتبط: {relatedCourse.title}</h3>
              <p className="text-blue-100 text-sm mb-6 max-w-xl leading-relaxed">
                برای یادگیری عمیق‌تر و تسلط کامل روی این مبحث، پیشنهاد می‌کنیم در دوره تخصصی مرتبط با این مقاله شرکت کنید و سطح مهارت‌های خود را ارتقا دهید.
              </p>
              <Link href={`/courses/${relatedCourse.slug}`} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30">
                مشاهده و ثبت‌نام دوره <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            {relatedCourse.thumbnail && (
              <img src={relatedCourse.thumbnail} alt={relatedCourse.title} className="w-full md:w-64 h-40 object-cover rounded-2xl shadow-xl border-4 border-white/10" />
            )}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            مقالات مرتبط
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map(rel => (
              <Link key={rel._id} href={`/blog/${rel.slug}`} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition group">
                <img src={rel.thumbnail || `https://picsum.photos/seed/${rel._id}/200/200`} alt={rel.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-2 leading-snug">{rel.title}</h4>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(rel.createdAt).toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section (Mock/UI only) */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          دیدگاه‌ها (۳)
        </h3>
        
        {/* Comment Form */}
        <div className="flex gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 font-bold">
            شما
          </div>
          <div className="flex-1 relative">
            <textarea 
              rows={3}
              placeholder="دیدگاه خود را درباره این مقاله بنویسید..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <button className="absolute left-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition shadow-sm">
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {[
            { name: 'محمد امین', date: 'دو روز پیش', text: 'مقاله بسیار جامع و کاملی بود. ممنون از توضیحات روان و مثال‌های کاربردی که آوردید.', likes: 12 },
            { name: 'سارا رضایی', date: 'یک هفته پیش', text: 'بخش مربوط به پیاده‌سازی عملی خیلی به من کمک کرد. بی‌صبرانه منتظر مقالات بعدی شما هستم.', likes: 5 },
            { name: 'علی کریمی', date: 'دو هفته پیش', text: 'عالی بود. فقط کاش به ابزارهای جایگزین هم اشاره می‌کردید.', likes: 2 }
          ].map((comment, idx) => (
            <div key={idx} className="flex gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-gray-500 font-bold">
                {comment.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-gray-900 ml-3">{comment.name}</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition">
          بازگشت به لیست مقالات
        </Link>
      </div>

    </main>
  );
}
