export const catalogPaths = {
  '/categories': {
    get: {
      tags: ['Catalog'],
      summary: 'Get all categories',
      responses: { '200': { description: 'List of categories' } }
    }
  },
  '/admin/categories': {
    post: {
      tags: ['Catalog (Admin)'],
      summary: 'Create a new category',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { name: { type: 'string' }, slug: { type: 'string' }, parentId: { type: 'string' } } }
          }
        }
      },
      responses: { '201': { description: 'Category created' } }
    }
  },
  '/admin/categories/{id}': {
    patch: {
      tags: ['Catalog (Admin)'],
      summary: 'Update category',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } } } }
        }
      },
      responses: { '200': { description: 'Category updated' } }
    },
    delete: {
      tags: ['Catalog (Admin)'],
      summary: 'Delete category',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Category deleted' } }
    }
  }
};
