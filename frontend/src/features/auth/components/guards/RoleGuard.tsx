'use client';

import { useAuthStore } from '../../stores/auth.store';
import { AuthGuard } from './AuthGuard';
import { ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: Array<'super-admin' | 'admin' | 'instructor' | 'student'>;
  fallback?: ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { user, isInitializing } = useAuthStore();

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Super-admin has access to everything
  if (user?.role === 'super-admin') {
    return <AuthGuard>{children}</AuthGuard>;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return <>{fallback}</>;
}
