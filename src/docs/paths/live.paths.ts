export const livePaths = {
  '/courses/{courseId}/live-classes': {
    get: {
      tags: ['Live Classes'],
      summary: 'Get live classes for a course',
      parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'List of live classes' } }
    }
  },
  '/instructor/courses/{courseId}/live-classes': {
    post: {
      tags: ['Live Classes (Instructor)'],
      summary: 'Schedule a new live class room (Skyroom/BigBlueButton mock)',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                scheduledAt: { type: 'string', format: 'date-time' },
                durationMinutes: { type: 'number' }
              }
            }
          }
        }
      },
      responses: { '201': { description: 'Live class scheduled and room created' } }
    }
  },
  '/instructor/live-classes/{roomId}/status': {
    patch: {
      tags: ['Live Classes (Instructor)'],
      summary: 'Update live class status',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'roomId', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { status: { type: 'string', enum: ['active', 'completed', 'cancelled'] } } }
          }
        }
      },
      responses: { '200': { description: 'Status updated' } }
    }
  }
};
