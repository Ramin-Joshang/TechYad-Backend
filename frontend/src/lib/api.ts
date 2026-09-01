import axios from 'axios';
import Cookies from 'js-cookie';

// The base URL for the backend proxy. Since we configured rewrites in next.config.ts,
// requests to /api/* will be proxied to the backend at http://localhost:3001/api/*
export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use(
  (config) => {
    // We use js-cookie to store the token so it's accessible by Next.js SSR if needed.
    // The backend returns the JWT in the response body rather than an HttpOnly cookie.
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response.data, // Unwrap the response to directly return the data
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        Cookies.remove('token');
        // If not already on the login page, redirect
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
