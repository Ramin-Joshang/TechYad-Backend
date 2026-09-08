import { api } from '@/lib/api';

export const commerceApi = {
  // Sync the local cart to the backend before checkout
  syncCart: async (items: Array<{ itemType: string, itemId: string }>) => {
    // Clear the existing remote cart
    await api.delete('/me/cart');
    // Add all items
    for (const item of items) {
      try {
        await api.post('/me/cart/items', item);
      } catch (e) {
        console.error('Error syncing cart item', item, e);
      }
    }
  },

  checkoutPreview: async () => {
    return api.post<any, { success: boolean; data: any }>('/checkout/preview', {});
  },

  createOrder: async () => {
    return api.post<any, { success: boolean; data: any }>('/checkout/create', {});
  },
  
  createPayment: async (orderId: string) => {
    return api.post<any, { success: boolean; data: any }>(`/payments/${orderId}/create`, {});
  }
};
