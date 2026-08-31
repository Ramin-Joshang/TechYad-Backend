'use client';

import Link from 'next/link';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { LogOut, User, BookOpen } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">تک‌یاد</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/courses" className="hover:text-blue-600 transition">دوره‌ها</Link>
              <Link href="/classes" className="hover:text-blue-600 transition">کلاس‌ها</Link>
              <Link href="/instructors" className="hover:text-blue-600 transition">اساتید</Link>
              <Link href="/blog" className="hover:text-blue-600 transition">وبلاگ</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link href={user.role === 'student' ? '/student' : user.role === 'instructor' ? '/instructor' : '/admin'} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <User className="w-4 h-4" />
                  پنل کاربری
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                  ورود
                </Link>
                <Link href="/register" className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
