'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/auth.store';

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      if (user?.role === 'admin' || user?.role === 'super-admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [isInitializing, isAuthenticated, user, router]);

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
