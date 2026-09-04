'use client';

import { RoleGuard } from '@/features/auth/components/guards/RoleGuard';
import { PermissionGuard } from '@/features/auth/components/guards/PermissionGuard';
import { useAuthStore } from '@/features/auth/stores/auth.store';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  return (
    <RoleGuard allowedRoles={['super-admin', 'admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">داشبورد مدیریت</h1>
          <p className="text-gray-500">خوش آمدید، {user?.firstName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PermissionGuard permissions="users.manage" fallback={null}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">مدیریت کاربران</h3>
              <p className="text-sm text-gray-500 mb-4">شما به دلیل داشتن دسترسی <code>users.manage</code> این بخش را می‌بینید.</p>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                مشاهده لیست کاربران
              </button>
            </div>
          </PermissionGuard>

          <PermissionGuard permissions="courses.publish" fallback={null}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">تایید دوره‌ها</h3>
              <p className="text-sm text-gray-500 mb-4">شما به دلیل داشتن دسترسی <code>courses.publish</code> این بخش را می‌بینید.</p>
              <button className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors">
                بررسی دوره‌های در انتظار
              </button>
            </div>
          </PermissionGuard>

          <PermissionGuard permissions="blog.manage" fallback={null}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">مدیریت وبلاگ</h3>
              <p className="text-sm text-gray-500 mb-4">شما به دلیل داشتن دسترسی <code>blog.manage</code> این بخش را می‌بینید.</p>
              <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-sm font-medium hover:bg-purple-100 transition-colors">
                مدیریت مقالات
              </button>
            </div>
          </PermissionGuard>
        </div>
      </div>
    </RoleGuard>
  );
}
