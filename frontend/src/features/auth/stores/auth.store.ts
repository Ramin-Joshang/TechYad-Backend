import { create } from 'zustand';

export interface User {
  _id: string;
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
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isInitializing: true,

  setAuth: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
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
      localStorage.removeItem('token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  setInitializing: (status) => set({ isInitializing: status }),
}));
