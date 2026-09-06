export const classPaths = {
  '/classes': {
    get: {
      tags: ['Classes'],
      summary: 'Get public classes',
      responses: { '200': { description: 'List of classes' } }
    }
  },
  '/classes/{slug}': {
    get: {
      tags: ['Classes'],
      summary: 'Get class by slug',
      parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Class details' } }
    }
  },
  '/me/classes': {
    get: {
      tags: ['Classes'],
      summary: 'Get my enrolled classes',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'List of classes' } }
    }
  },
  '/classes/{id}/join': {
    get: {
      tags: ['Classes'],
      summary: 'Join an online class',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Join link generated' } }
    }
  },
  '/instructor/classes': {
    post: {
      tags: ['Classes (Instructor)'],
      summary: 'Create a new class',
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
                description: { type: 'string' },
                mode: { type: 'string', enum: ['online', 'in_person'] },
                price: { type: 'number' },
                capacity: { type: 'number' },
                startDate: { type: 'string', format: 'date-time' },
                endDate: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Class created' } }
    }
  }
};
