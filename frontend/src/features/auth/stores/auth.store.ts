import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface User {
  id: string; // the backend returns id in login/getMe response
  firstName: string;
  lastName: string;
  email: string;
  role: 'super-admin' | 'admin' | 'instructor' | 'student';
  avatar?: string;
  permissions?: string[]; // E.g., 'courses.manage', 'courses.publish', etc.
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
  setInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? Cookies.get('token') || null : null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      Cookies.set('token', token, { expires: 30, secure: process.env.NODE_ENV === 'production' });
    }
    set({ user, token, isAuthenticated: true, isInitializing: false });
  },
  updateUser: (updatedUser) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    }));
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      Cookies.remove('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  setInitializing: (status) => set({ isInitializing: status }),
}));
