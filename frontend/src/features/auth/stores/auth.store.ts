import { create } from 'zustand';

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
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
  setInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: (user) => {
    set({ user, isAuthenticated: true, isInitializing: false });
  },
  updateUser: (updatedUser) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedUser } : null,
    }));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setInitializing: (status) => set({ isInitializing: status }),
}));
