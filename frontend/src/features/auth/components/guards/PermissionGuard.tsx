'use client';

import { useAuthStore } from '../../stores/auth.store';
import { AuthGuard } from './AuthGuard';
import { ReactNode } from 'react';

interface PermissionGuardProps {
  children: ReactNode;
  permissions: string | string[]; // Can be a single permission or an array of required permissions
  requireAll?: boolean; // If true, requires all permissions. If false, requires at least one.
  fallback?: ReactNode;
}

export function PermissionGuard({ children, permissions, requireAll = true, fallback = null }: PermissionGuardProps) {
  const { user, isInitializing } = useAuthStore();

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Super-admin bypasses permission checks
  if (user?.role === 'super-admin') {
    return <AuthGuard>{children}</AuthGuard>;
  }

  const userPermissions = user?.permissions || [];
  const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];

  const hasPermission = requireAll
    ? requiredPermissions.every(p => userPermissions.includes(p))
    : requiredPermissions.some(p => userPermissions.includes(p));

  if (hasPermission) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return <>{fallback}</>;
}
