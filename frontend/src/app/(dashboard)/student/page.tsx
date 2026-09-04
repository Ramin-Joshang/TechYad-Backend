'use client';

import { RoleGuard } from '@/features/auth/components/guards/RoleGuard';
import { useAuthStore } from '@/features/auth/stores/auth.store';

export default function StudentDashboardPage() {
  const { user } = useAuthStore();

  return (
    <RoleGuard allowedRoles={['student', 'admin', 'super-admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">داشبورد دانشجو</h1>
          <p className="text-gray-500">سلام {user?.firstName}، خوش آمدید به پنل کاربری.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">شما هنوز در دوره‌ای ثبت‌نام نکرده‌اید</h3>
          <p className="text-gray-500 mb-6">برای شروع یادگیری، از بین دوره‌های متنوع ما یکی را انتخاب کنید.</p>
          <a href="/courses" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            مشاهده دوره‌ها
          </a>
        </div>
      </div>
    </RoleGuard>
  );
}
