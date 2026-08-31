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
    },
    patch: {
      tags: ['Authentication'],
      summary: 'Update current user profile',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                avatar: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        '200': { description: 'User profile updated' },
        '401': { description: 'Unauthorized' }
      }
    }
  },
  '/auth/forgot-password': {
    post: {
      tags: ['Authentication'],
      summary: 'Request password reset',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { email: { type: 'string', format: 'email' } } }
          }
        }
      },
      responses: { '200': { description: 'Reset link sent' } }
    }
  },
  '/auth/reset-password': {
    post: {
      tags: ['Authentication'],
      summary: 'Reset password with token',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { token: { type: 'string' }, newPassword: { type: 'string', minLength: 8 } } }
          }
        }
      },
      responses: { '200': { description: 'Password reset successful' } }
    }
  }
};
