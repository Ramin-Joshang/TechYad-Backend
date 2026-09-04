import axios from 'axios';

// The base URL for the backend proxy. Since we configured rewrites in next.config.ts,
// requests to /api/* will be proxied to the backend at http://localhost:3001/api/*
export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
