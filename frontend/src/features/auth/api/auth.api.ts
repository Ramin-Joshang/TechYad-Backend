import { api } from '@/lib/api';
import { User } from '../stores/auth.store';

// Define the response formats based on the backend sendSuccess structure
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  login: async (credentials: any) => {
    return api.post<any, ApiResponse<AuthResponse>>('/auth/login', credentials);
  },
  
  register: async (userData: any) => {
    return api.post<any, ApiResponse<AuthResponse>>('/auth/register', userData);
  },

  getMe: async () => {
    return api.get<any, ApiResponse<User>>('/auth/me');
  },
};
