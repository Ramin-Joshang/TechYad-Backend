export const instructorPaths = {
  '/instructors': {
    get: {
      tags: ['Instructors'],
      summary: 'Get all approved instructors',
      responses: { '200': { description: 'List of instructors' } }
    }
  },
  '/instructors/{id}': {
    get: {
      tags: ['Instructors'],
      summary: 'Get public profile of an instructor',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Instructor profile data' } }
    }
  },
  '/instructor/profile': {
    put: {
      tags: ['Instructor Dashboard'],
      summary: 'Create or update instructor profile',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                bio: { type: 'string' },
                specialties: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        }
      },
      responses: { '200': { description: 'Profile updated' } }
    }
  },
  '/instructor/earnings': {
    get: {
      tags: ['Instructor Dashboard'],
      summary: 'Get instructor financial earnings',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'Earnings statistics' } }
    }
  }
};
