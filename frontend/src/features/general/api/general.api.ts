import { api } from '@/lib/api';

export const generalApi = {
  getFaqs: async () => {
    return api.get('/faqs');
  },
  submitContact: async (data: any) => {
    return api.post('/contact', data);
  },
  submitCareer: async (data: any) => {
    return api.post('/careers', data);
  }
};
