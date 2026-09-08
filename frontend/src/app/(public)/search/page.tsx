'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search as SearchIcon, BookOpen, Video, FileText, ChevronLeft, Filter, Loader2 } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'classes' | 'blog'>('all');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      // Simulate network request
      setTimeout(() => setIsSearching(false), 1000);
    }
  };

  useEffect(() => {
    setQuery(initialQuery);
    if (initialQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => setIsSearching(false), 800);
      return () => clearTimeout(timer);
    }
  }, [initialQuery]);

  const hasSearched = !!initialQuery;

  const TABS = [
    { id: 'all', label: 'همه نتایج' },
    { id: 'courses', label: 'دوره‌های آموزشی' },
    { id: 'classes', label: 'کلاس‌ها' },
    { id: 'blog', label: 'مقالات' },
  ];

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">جستجو در تک‌یاد</h1>
          <form onSubmit={handleSearch} className="relative max-w-3xl">
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="دنبال چه چیزی می‌گردید؟ (مثلا: پایتون، ری‌اکت، هوش مصنوعی)"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pr-14 pl-32 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-inner"
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition disabled:opacity-70 flex items-center gap-2"
            >
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'جستجو'}
            </button>
          </form>

          {/* Tabs */}
          {hasSearched && (
            <div className="flex items-center gap-2 mt-8 border-b border-gray-100 overflow-x-auto pb-2">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-8">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-500">در حال جستجو برای «{initialQuery}»...</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 text-gray-400 mb-6">
                  <SearchIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">نتیجه‌ای یافت نشد!</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  متاسفانه برای عبارت «{initialQuery}» در بخش {TABS.find(t => t.id === activeTab)?.label} نتیجه‌ای پیدا نکردیم. لطفاً املای کلمه را بررسی کنید یا از کلمات کلیدی دیگری استفاده نمایید.
                </p>
                <button 
                  onClick={() => setQuery('')}
                  className="mt-8 px-6 py-2.5 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  پاک کردن جستجو
                </button>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">جستجو در دوره‌ها</h3>
              <p className="text-sm text-gray-500">بیش از ۱۰۰ دوره آموزشی تخصصی با پروژه‌های عملی.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">جستجو در کلاس‌ها</h3>
              <p className="text-sm text-gray-500">کلاس‌های آنلاین و حضوری با برترین اساتید.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">جستجو در مقالات</h3>
              <p className="text-sm text-gray-500">هزاران مقاله آموزشی رایگان و به‌روز در بلاگ.</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
