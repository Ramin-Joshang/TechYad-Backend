'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Search, MapPin, Monitor, Clock, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns-jalali';

export function ClassesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState<'all' | 'online' | 'in_person'>('all');

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: () => api.get('/classes').then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredClasses = classes?.filter((cls: any) => {
    const matchesSearch = cls.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = modeFilter === 'all' || cls.mode === modeFilter;
    return matchesSearch && matchesMode;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">کلاس‌های آموزشی تک‌یاد</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            کلاس‌های حضوری و آنلاین با ظرفیت محدود و تعامل مستقیم با اساتید.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی عنوان کلاس..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            <button 
              onClick={() => setModeFilter('all')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition ${modeFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >همه</button>
            <button 
              onClick={() => setModeFilter('online')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition ${modeFilter === 'online' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >آنلاین</button>
            <button 
              onClick={() => setModeFilter('in_person')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition ${modeFilter === 'in_person' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >حضوری</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredClasses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">کلاسی با این مشخصات یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls: any) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClassCard({ cls }: { cls: any }) {
  const isOnline = cls.mode === 'online';
  const instructor = cls.instructors?.[0];
  const startDate = cls.startDate ? new Date(cls.startDate) : new Date();
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition flex flex-col h-full group">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img src={`https://picsum.photos/seed/${cls._id}/600/400`} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur flex items-center gap-1 ${isOnline ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
            {isOnline ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
            {isOnline ? 'کلاس آنلاین' : 'کلاس حضوری'}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 text-gray-900 rounded-full text-xs font-bold shadow-sm backdrop-blur">
            {cls.type === 'private' ? 'خصوصی' : 'عمومی'}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl text-gray-900 mb-4 line-clamp-2">{cls.title}</h3>
        
        <div className="space-y-3 mb-6 flex-grow text-sm text-gray-600">
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
             <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4 text-gray-400" />
               <span>شروع دوره:</span>
             </div>
             <span className="font-medium text-gray-900">{format(startDate, 'd MMMM yyyy')}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
             <div className="flex items-center gap-2">
               <Users className="w-4 h-4 text-gray-400" />
               <span>ظرفیت:</span>
             </div>
             <span className="font-medium text-gray-900">{cls.capacity} نفر</span>
          </div>
          {instructor && (
            <div className="flex items-center gap-3 pt-2">
              <img src={instructor.avatar || `https://ui-avatars.com/api/?name=${instructor.firstName}+${instructor.lastName}`} className="w-8 h-8 rounded-full" alt="instructor" />
              <span className="text-sm font-medium text-gray-700">مدرس: {instructor.firstName} {instructor.lastName}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="font-bold text-blue-600 text-lg">
            {cls.price === 0 ? 'رایگان' : `${cls.price.toLocaleString()} تومان`}
          </div>
          <Link href={`/classes/${cls.slug}`} className="px-5 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition">
            مشاهده کلاس
          </Link>
        </div>
      </div>
    </div>
  );
}
