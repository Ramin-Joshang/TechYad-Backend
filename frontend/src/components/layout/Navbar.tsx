'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { LogOut, User, Search, Bell, ShoppingCart, Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { name: 'دوره‌ها', href: '/courses' },
    { name: 'کلاس‌ها', href: '/classes' },
    { name: 'اساتید', href: '/instructors' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-500 hover:text-blue-600 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                T
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">تک‌یاد</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`transition ${pathname === link.href ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/search" className="text-gray-500 hover:text-blue-600 transition ml-1 sm:ml-2">
              <Search className="w-5 h-5" />
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <button className="text-gray-500 hover:text-blue-600 transition relative hidden sm:block">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <Link href="/cart" className="text-gray-500 hover:text-blue-600 transition relative">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
                <Link href={user.role === 'student' ? '/student' : user.role === 'instructor' ? '/instructor' : '/admin'} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">پروفایل</span>
                </Link>
                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition hidden sm:block" title="خروج">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                  ورود
                </Link>
                <Link href="/register" className="text-sm font-medium px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition ${
                  pathname === link.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && user && (
              <div className="border-t border-gray-100 pt-4 mt-2">
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  خروج از حساب کاربری
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
