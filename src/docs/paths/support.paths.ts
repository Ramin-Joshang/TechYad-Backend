export const supportPaths = {
  '/me/tickets': {
    get: {
      tags: ['Support'],
      summary: 'Get user support tickets',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'List of tickets' } }
    },
    post: {
      tags: ['Support'],
      summary: 'Create a new support ticket',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                subject: { type: 'string' },
                message: { type: 'string' },
                category: { type: 'string' },
                priority: { type: 'string', enum: ['low', 'medium', 'high'] }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Ticket created' } }
    }
  },
  '/me/tickets/{id}': {
    get: {
      tags: ['Support'],
      summary: 'Get ticket details and messages',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Ticket data' } }
    }
  },
  '/me/tickets/{id}/messages': {
    post: {
      tags: ['Support'],
      summary: 'Reply to a ticket',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { message: { type: 'string' } } }
          }
        }
      },
      responses: { '201': { description: 'Reply added' } }
    }
  }
};
