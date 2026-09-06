export const commercePaths = {
  '/me/cart': {
    get: { tags: ['Commerce'], summary: 'Get current user cart', security: [{ bearerAuth: [] }], responses: { '200': { description: 'Cart data' } } },
    delete: { tags: ['Commerce'], summary: 'Clear cart', security: [{ bearerAuth: [] }], responses: { '200': { description: 'Cart cleared' } } }
  },
  '/me/cart/items': {
    post: { tags: ['Commerce'], summary: 'Add item to cart', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { itemType: { type: 'string', enum: ['course', 'class'] }, itemId: { type: 'string' } } } } } }, responses: { '201': { description: 'Item added' } } }
  },
  '/me/cart/items/{itemId}': {
    delete: { tags: ['Commerce'], summary: 'Remove item from cart', security: [{ bearerAuth: [] }], parameters: [{ name: 'itemId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Item removed' } } }
  },
  '/checkout/preview': {
    post: { tags: ['Commerce'], summary: 'Preview checkout (calculate total)', security: [{ bearerAuth: [] }], requestBody: { required: false, content: { 'application/json': { schema: { type: 'object', properties: { couponCode: { type: 'string' } } } } } }, responses: { '200': { description: 'Preview data' } } }
  },
  '/checkout/create': {
    post: { tags: ['Commerce'], summary: 'Create order', security: [{ bearerAuth: [] }], requestBody: { required: false, content: { 'application/json': { schema: { type: 'object', properties: { couponCode: { type: 'string' } } } } } }, responses: { '201': { description: 'Order created' } } }
  },
  '/me/orders': {
    get: { tags: ['Commerce'], summary: 'Get user orders', security: [{ bearerAuth: [] }], responses: { '200': { description: 'List of orders' } } }
  },
  '/me/orders/{id}': {
    get: { tags: ['Commerce'], summary: 'Get order details', security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Order data' } } }
  },
  '/payments/{orderId}/create': {
    post: { tags: ['Commerce'], summary: 'Create payment mock', security: [{ bearerAuth: [] }], parameters: [{ name: 'orderId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Payment intent created' } } }
  }
};
