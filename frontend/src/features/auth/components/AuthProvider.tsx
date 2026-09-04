'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth.api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, logout, setInitializing } = useAuthStore();
  const initAttempted = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
      if (initAttempted.current) return;
      initAttempted.current = true;
      try {
        const response = await authApi.getMe();
        if (response.success && response.data) {
          setAuth(response.data);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setInitializing(false);
      }
    };
    initAuth();
  }, [setAuth, logout, setInitializing]);

  return <>{children}</>;
}
