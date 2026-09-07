'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Search, Filter, Clock, Book, User, Star, CheckSquare, Square, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function CourseListContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for filters
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    subject: searchParams.get('subject') || '',
    field: searchParams.get('field') || '',
    level: searchParams.get('level') || '',
    instructor: searchParams.get('instructor') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    isFree: searchParams.get('isFree') === 'true',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page') || '1')
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    router.replace(`/courses?${params.toString()}`);
  }, [filters, router]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '', category: '', subject: '', field: '', level: '', instructor: '',
      minPrice: '', maxPrice: '', isFree: false, sort: 'newest', page: 1
    });
  };

  // Fetch filter options
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: () => api.get('/catalog/categories').then(res => res.data) });
  const { data: subjects } = useQuery({ queryKey: ['subjects'], queryFn: () => api.get('/catalog/subjects').then(res => res.data) });
  const { data: fields } = useQuery({ queryKey: ['fields'], queryFn: () => api.get('/catalog/fields').then(res => res.data) });
  const { data: levels } = useQuery({ queryKey: ['levels'], queryFn: () => api.get('/catalog/levels').then(res => res.data) });
  const { data: instructors } = useQuery({ queryKey: ['instructors'], queryFn: () => api.get('/instructors').then(res => res.data) });

  // Fetch courses
  const { data: coursesData, isLoading, isError } = useQuery({
    queryKey: ['courses', filters],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value.toString());
      });
      return api.get(`/courses?${params.toString()}`).then(res => res.data);
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">دوره‌های آموزشی</h1>
            <p className="text-gray-500 mt-2">بهترین دوره‌ها برای ارتقای مهارت‌های شما</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <input 
                type="text" 
                placeholder="جستجو..." 
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button 
              className="md:hidden p-2 rounded-lg border border-gray-300 text-gray-600"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`
            fixed inset-0 z-50 bg-white p-6 overflow-y-auto w-full max-w-sm transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:w-1/4 lg:block lg:bg-transparent lg:p-0 lg:z-auto
            ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
            <div className="flex justify-between items-center lg:hidden mb-6">
              <h2 className="text-xl font-bold">فیلترها</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="bg-white lg:rounded-2xl lg:shadow-sm lg:border border-gray-200 p-6 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" /> فیلترها
                </h3>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">پاک کردن همه</button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">دسته‌بندی</h4>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">همه دسته‌ها</option>
                  {categories?.map((c: any) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">سطح دوره</h4>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                >
                  <option value="">همه سطوح</option>
                  {levels?.map((l: any) => (
                    <option key={l._id} value={l._id}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Instructor */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">مدرس</h4>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  value={filters.instructor}
                  onChange={(e) => handleFilterChange('instructor', e.target.value)}
                >
                  <option value="">همه مدرسین</option>
                  {instructors?.map((i: any) => (
                    <option key={i.userId._id} value={i.userId._id}>{i.userId.firstName} {i.userId.lastName}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">محدوده قیمت (تومان)</h4>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="از" 
                    className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <input 
                    type="number" 
                    placeholder="تا" 
                    className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* Free courses only */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleFilterChange('isFree', !filters.isFree)}>
                {filters.isFree ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <Square className="w-5 h-5 text-gray-400" />}
                <span className="text-sm font-medium text-gray-700">فقط دوره‌های رایگان</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 flex flex-col">
            
            {/* Top Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {coursesData?.total || 0} دوره یافت شد
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">مرتب‌سازی:</span>
                <select 
                  className="text-sm border-none bg-transparent font-medium text-gray-800 cursor-pointer focus:ring-0"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="newest">جدیدترین</option>
                  <option value="price_asc">ارزان‌ترین</option>
                  <option value="price_desc">گران‌ترین</option>
                  <option value="popular">محبوب‌ترین</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white h-80 rounded-2xl border border-gray-200"></div>
                ))}
              </div>
            ) : isError ? (
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center">خطا در دریافت اطلاعات. لطفا دوباره تلاش کنید.</div>
            ) : coursesData?.courses?.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">دوره‌ای یافت نشد</h3>
                <p className="text-gray-500">با تغییر فیلترها دوباره تلاش کنید.</p>
                <button onClick={clearFilters} className="mt-6 text-blue-600 font-medium hover:underline">حذف فیلترها</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {coursesData?.courses?.map((course: any) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {coursesData?.pages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  disabled={filters.page === 1}
                  onClick={() => handleFilterChange('page', filters.page - 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {[...Array(coursesData.pages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => handleFilterChange('page', i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition ${filters.page === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  disabled={filters.page === coursesData.pages}
                  onClick={() => handleFilterChange('page', filters.page + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
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
            <span className="text-gray-400 font-normal">({course.reviewCount || 0})</span>
          </div>
          {course.levelId?.name && (
             <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{course.levelId.name}</span>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">{course.title}</h3>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <img src={instructor?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}`} className="w-6 h-6 rounded-full" alt={instructorName} />
          <span className="truncate">{instructorName}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> {course.totalDuration ? Math.round(course.totalDuration / 60) + ' ساعت' : 'نامشخص'}</div>
          <div className="flex items-center gap-1"><User className="w-4 h-4"/> {course.studentCount || 0} دانشجو</div>
        </div>

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
          <button className="w-full py-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-blue-600 font-medium rounded-lg transition-colors">
            مشاهده دوره
          </button>
        </div>
      </div>
    </Link>
  );
}
