'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/features/auth/api/auth.api';
import { GuestGuard } from '@/features/auth/components/guards/GuestGuard';
import Link from 'next/link';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    if (!token) {
      setStatus('error');
      setMessage('توکن بازیابی نامعتبر است');
      return;
    }

    setStatus('loading');
    setMessage('');
    
    try {
      const response = await authApi.resetPassword({ token, newPassword: password });
      if (response.success) {
        setStatus('success');
        setMessage('رمز عبور شما با موفقیت تغییر کرد.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'خطا در تغییر رمز عبور');
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          لینک بازیابی نامعتبر است یا منقضی شده است.
        </div>
        <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
          درخواست مجدد لینک بازیابی
        </Link>
      </div>
    );
  }

  return (
    <>
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {message}
        </div>
      )}

      {status === 'success' ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="text-gray-700 mb-6">{message}</p>
          <p className="text-sm text-gray-500">در حال انتقال به صفحه ورود...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">رمز عبور جدید</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dir-ltr text-left"
              placeholder="••••••••"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">تکرار رمز عبور جدید</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dir-ltr text-left"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'در حال ثبت...' : 'تغییر رمز عبور'}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <GuestGuard>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تغییر رمز عبور</h1>
            <p className="text-gray-500 text-sm">رمز عبور جدید خود را وارد کنید</p>
          </div>
          <Suspense fallback={<div className="text-center py-4">در حال بررسی...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </main>
    </GuestGuard>
  );
}
