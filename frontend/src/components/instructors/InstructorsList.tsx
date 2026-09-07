'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Star, BookOpen, Users, Award, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export function InstructorsList() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: instructors, isLoading } = useQuery({
    queryKey: ['instructors'],
    queryFn: () => api.get('/instructors').then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredInstructors = instructors?.filter((inst: any) => {
    const fullName = `${inst.userId?.firstName} ${inst.userId?.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || inst.title?.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 opacity-50 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">اساتید برتر تک‌یاد</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            آموزش را از متخصصانی یاد بگیرید که تجربه آکادمیک و تخصص حرفه‌ای در صنعت دارند.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی نام یا تخصص استاد..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium w-full sm:w-auto">
            <Filter className="w-5 h-5" />
            <span>فیلترها</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredInstructors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">استادی با این مشخصات یافت نشد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((inst: any) => (
              <InstructorCard key={inst._id} instructor={inst} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: any }) {
  const { userId, title, avatar, specialties } = instructor;
  const fullName = `${userId?.firstName} ${userId?.lastName}`;
  const displayAvatar = avatar || `https://ui-avatars.com/api/?name=${userId?.firstName}+${userId?.lastName}&background=random`;

  return (
    <Link href={`/instructors/${userId?._id}`} className="block group">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition duration-300 relative overflow-hidden h-full flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition duration-500 ease-out z-0"></div>
        
        <div className="relative z-10 flex gap-5 items-start mb-6">
          <img src={displayAvatar} alt={fullName} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
          <div className="pt-2">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">{fullName}</h3>
            <p className="text-sm text-gray-500 mt-1">{title}</p>
          </div>
        </div>

        {specialties && specialties.length > 0 && (
          <div className="relative z-10 mb-6 flex-grow">
            <p className="text-xs text-gray-400 mb-2 font-medium">تخصص‌ها:</p>
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((spec: string, i: number) => (
                <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  {spec}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                  +{specialties.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
           <div className="flex items-center gap-1 text-amber-500">
             <Star className="w-4 h-4 fill-current" />
             <span className="font-bold text-sm">۴.۸</span>
           </div>
           <div className="flex items-center gap-4 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>۱۲ دوره</span>
              </div>
           </div>
        </div>
      </div>
    </Link>
  );
}
