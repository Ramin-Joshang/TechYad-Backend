'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth.api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, logout, token, setInitializing } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const response = await authApi.getMe();
        if (response.success) {
          setAuth(response.data, token);
        }
      } catch (error) {
        console.error('Failed to initialize auth', error);
        logout();
      } finally {
        setInitializing(false);
      }
    };

    initAuth();
  }, [token, setAuth, logout, setInitializing]);

  return <>{children}</>;
}
