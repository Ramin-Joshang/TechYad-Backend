import { api } from '@/lib/api';

export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  thumbnail?: string;
  tags?: string[];
  status: string;
  createdAt: string;
}

interface ListResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
}

interface SingleResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const blogApi = {
  getArticles: async () => {
    return api.get<any, ListResponse<Article>>('/articles');
  },
  
  getArticleBySlug: async (slug: string) => {
    return api.get<any, SingleResponse<Article>>(`/articles/${slug}`);
  }
};
