export const coursesPaths = {
  '/courses': {
    get: { tags: ['Courses'], summary: 'Get published courses', responses: { '200': { description: 'List of courses' } } }
  },
  '/courses/{slug}': {
    get: { tags: ['Courses'], summary: 'Get course by slug', parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Course details' } } }
  },
  '/courses/{courseId}/chapters': {
    get: { tags: ['Courses'], summary: 'Get course chapters', parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'List of chapters' } } }
  },
  '/chapters/{chapterId}/lessons': {
    get: { tags: ['Courses'], summary: 'Get chapter lessons', parameters: [{ name: 'chapterId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'List of lessons' } } }
  },
  '/instructor/courses': {
    post: { tags: ['Courses (Instructor)'], summary: 'Create a course', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, slug: { type: 'string' }, categoryId: { type: 'string' }, price: { type: 'number' } } } } } }, responses: { '201': { description: 'Course created' } } }
  },
  '/instructor/courses/{id}': {
    patch: { tags: ['Courses (Instructor)'], summary: 'Update a course', security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' } } } } } }, responses: { '200': { description: 'Course updated' } } }
  },
  '/instructor/courses/{courseId}/chapters': {
    post: { tags: ['Courses (Instructor)'], summary: 'Create a chapter', security: [{ bearerAuth: [] }], parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, order: { type: 'number' } } } } } }, responses: { '201': { description: 'Chapter created' } } }
  },
  '/instructor/chapters/{chapterId}/lessons': {
    post: { tags: ['Courses (Instructor)'], summary: 'Create a lesson', security: [{ bearerAuth: [] }], parameters: [{ name: 'chapterId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, type: { type: 'string' }, order: { type: 'number' } } } } } }, responses: { '201': { description: 'Lesson created' } } }
  },
  '/admin/courses/{id}/publish': {
    post: { tags: ['Courses (Admin)'], summary: 'Publish a course', security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Course published' } } }
  }
};
