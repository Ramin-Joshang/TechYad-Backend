import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function LatestArticles({ data = [] }: { data: any[] }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">جدیدترین مقالات</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition">
            مشاهده وبلاگ <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.slice(0,3).map((article: any) => (
            <Link key={article._id} href={`/blog/${article.slug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition">
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img src={article.image || article.thumbnail || `https://picsum.photos/seed/${article.slug}/400/250`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(article.tags || [article.readTime]).slice(0,2).map((tag: string, i: number) => (
                    tag && <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{tag}</span>
                  ))}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">{article.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{article.excerpt || article.author}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date || (article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fa-IR') : '')}</div>
                  <div className="flex items-center gap-1 text-blue-600 font-medium">مطالعه <ArrowLeft className="w-3 h-3" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
