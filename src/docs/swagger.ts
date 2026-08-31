import { authPaths } from './paths/auth.paths.js';
import { catalogPaths } from './paths/catalog.paths.js';
import { coursesPaths } from './paths/courses.paths.js';
import { learningPaths } from './paths/learning.paths.js';
import { commercePaths } from './paths/commerce.paths.js';
import { communityPaths } from './paths/community.paths.js';
import { mediaPaths } from './paths/media.paths.js';
import { blogPaths } from './paths/blog.paths.js';
import { notificationPaths } from './paths/notification.paths.js';
import { supportPaths } from './paths/support.paths.js';
import { classPaths } from './paths/class.paths.js';
import { adminPaths } from './paths/admin.paths.js';
import { instructorPaths } from './paths/instructor.paths.js';
import { commentPaths } from './paths/comment.paths.js';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'TechYad API',
    version: '1.0.0',
    description: 'Complete API documentation for TechYad LMS platform.',
  },
  servers: [
    { url: '/api/v1', description: 'API Version 1' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token in format: Bearer <token>'
      }
    }
  },
  paths: {
    ...authPaths,
    ...catalogPaths,
    ...coursesPaths,
    ...learningPaths,
    ...commercePaths,
    ...communityPaths,
    ...mediaPaths,
    ...blogPaths,
    ...notificationPaths,
    ...supportPaths,
    ...classPaths,
    ...adminPaths,
    ...instructorPaths,
    ...commentPaths
  }
};
