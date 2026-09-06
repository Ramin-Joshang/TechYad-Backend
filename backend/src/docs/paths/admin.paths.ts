export const adminPaths = {
  '/admin/dashboard': {
    get: {
      tags: ['Admin Dashboard'],
      summary: 'Get global platform statistics',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'Statistics object' } }
    }
  },
  '/admin/users': {
    get: {
      tags: ['Admin Users'],
      summary: 'List all users',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'List of users' } }
    }
  },
  '/admin/users/{id}/status': {
    patch: {
      tags: ['Admin Users'],
      summary: 'Update user status',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { status: { type: 'string', enum: ['active', 'blocked', 'pending'] } } }
          }
        }
      },
      responses: { '200': { description: 'Status updated' } }
    }
  },
  '/admin/coupons': {
    post: {
      tags: ['Admin Coupons'],
      summary: 'Create a discount coupon',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                type: { type: 'string', enum: ['percentage', 'fixed'] },
                value: { type: 'number' }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Coupon created' } }
    },
    get: {
      tags: ['Admin Coupons'],
      summary: 'List all coupons',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'List of coupons' } }
    }
  },
  '/admin/coupons/{id}': {
    delete: {
      tags: ['Admin Coupons'],
      summary: 'Delete a coupon',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Coupon deleted' } }
    }
  }
};
