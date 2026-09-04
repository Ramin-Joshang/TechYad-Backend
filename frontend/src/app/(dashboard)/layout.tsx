'use client';

import { useAuthStore } from '@/features/auth/stores/auth.store';
import { AuthGuard } from '@/features/auth/components/guards/AuthGuard';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/features/auth/api/auth.api';
import { BookOpen, LayoutDashboard, LogOut, Settings, UserCircle } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      router.push('/login');
    }
  };

  const getNavLinks = () => {
    const baseLinks = [
      { name: 'پروفایل من', href: '/profile', icon: UserCircle },
    ];
    
    if (user?.role === 'super-admin' || user?.role === 'admin') {
      return [
        { name: 'داشبورد مدیریت', href: '/admin', icon: LayoutDashboard },
        ...baseLinks
      ];
    } else if (user?.role === 'instructor') {
      return [
        { name: 'داشبورد اساتید', href: '/instructor', icon: LayoutDashboard },
        ...baseLinks
      ];
    } else {
      return [
        { name: 'داشبورد دانشجو', href: '/student', icon: LayoutDashboard },
        { name: 'دوره‌های من', href: '/student/courses', icon: BookOpen },
        ...baseLinks
      ];
    }
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-l border-gray-100 flex flex-col hidden md:flex">
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="text-xl font-bold text-blue-600">تک‌یاد</Link>
          </div>
          
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
              ) : (
                user?.firstName?.charAt(0) || 'U'
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {getNavLinks().map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors text-right"
            >
              <LogOut className="w-5 h-5" />
              خروج از حساب
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 md:hidden">
            <Link href="/" className="text-lg font-bold text-blue-600">تک‌یاد</Link>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
