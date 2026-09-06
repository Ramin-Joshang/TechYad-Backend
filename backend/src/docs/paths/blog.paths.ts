export const blogPaths = {
  '/articles': {
    get: {
      tags: ['Blog'],
      summary: 'Get published articles',
      responses: { '200': { description: 'List of articles' } }
    }
  },
  '/articles/{slug}': {
    get: {
      tags: ['Blog'],
      summary: 'Get article by slug',
      parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Article details' } }
    }
  },
  '/admin/articles': {
    post: {
      tags: ['Blog (Admin)'],
      summary: 'Create a new article',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                slug: { type: 'string' },
                excerpt: { type: 'string' },
                content: { type: 'string' },
                status: { type: 'string', enum: ['draft', 'published'] }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Article created' } }
    }
  }
};
