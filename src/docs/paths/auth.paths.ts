export const authPaths = {
  '/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'Register a new student',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['firstName', 'lastName', 'email', 'password'],
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string', format: 'email' },
                mobile: { type: 'string' },
                password: { type: 'string', minLength: 6 }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'User registered successfully' },
        '400': { description: 'Validation error or Email exists' }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        '200': { description: 'Login successful (returns token)' },
        '401': { description: 'Invalid credentials' }
      }
    }
  },
  '/auth/me': {
    get: {
      tags: ['Authentication'],
      summary: 'Get current user profile',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': { description: 'User profile data' },
        '401': { description: 'Unauthorized' }
      }
    }
  }
};
