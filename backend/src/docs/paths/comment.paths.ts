export const commentPaths = {
  '/lessons/{lessonId}/comments': {
    get: {
      tags: ['Comments'],
      summary: 'Get comments for a lesson',
      parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'List of comments' } }
    },
    post: {
      tags: ['Comments'],
      summary: 'Add a comment to a lesson',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                text: { type: 'string' },
                parentId: { type: 'string', description: 'Optional ID of the parent comment to reply to' }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Comment added' } }
    }
  }
};
