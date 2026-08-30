export const communityPaths = {
  '/courses/{courseId}/reviews': {
    get: { tags: ['Community'], summary: 'Get approved reviews for a course', parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'List of reviews' } } },
    post: { tags: ['Community'], summary: 'Submit a course review', security: [{ bearerAuth: [] }], parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { rating: { type: 'number', minimum: 1, maximum: 5 }, comment: { type: 'string' } } } } } }, responses: { '201': { description: 'Review submitted (pending approval)' } } }
  },
  '/admin/reviews/{reviewId}/approve': {
    patch: { tags: ['Community (Admin)'], summary: 'Approve a review', security: [{ bearerAuth: [] }], parameters: [{ name: 'reviewId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Review approved' } } }
  },
  '/me/favorites': {
    get: { tags: ['Community'], summary: 'Get user favorite courses', security: [{ bearerAuth: [] }], responses: { '200': { description: 'List of favorite courses' } } }
  },
  '/me/favorites/{courseId}': {
    post: { tags: ['Community'], summary: 'Toggle course in favorites', security: [{ bearerAuth: [] }], parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Added to/Removed from favorites' } } }
  }
};
