'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { GuestGuard } from '@/features/auth/components/guards/GuestGuard';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authApi.register(formData);
      if (response.success) {
        setAuth(response.data.user);
        
        // Generally registers as student
        const role = response.data.user.role;
        if (role === 'super-admin' || role === 'admin') router.push('/admin');
        else if (role === 'instructor') router.push('/instructor');
        else router.push('/student');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ثبت‌نام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestGuard>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">ثبت‌نام در تک‌یاد</h1>
            <p className="text-gray-500 text-sm">برای شروع یادگیری حساب کاربری خود را بسازید</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نام</label>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                  placeholder="علی"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نام خانوادگی</label>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-right"
                  placeholder="رضایی"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ایمیل</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dir-ltr text-left"
                placeholder="user@example.com"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">رمز عبور</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dir-ltr text-left"
                placeholder="••••••••"
                required 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
              ورود به حساب
            </Link>
          </div>
        </div>
      </main>
    </GuestGuard>
  );
}
