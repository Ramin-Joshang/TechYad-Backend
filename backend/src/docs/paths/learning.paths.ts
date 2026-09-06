export const learningPaths = {
  '/me/enrollments': {
    get: { tags: ['Learning'], summary: 'Get user enrollments', security: [{ bearerAuth: [] }], responses: { '200': { description: 'List of enrollments' } } }
  },
  '/courses/{courseId}/enroll': {
    post: { tags: ['Learning'], summary: 'Enroll in a free course', security: [{ bearerAuth: [] }], parameters: [{ name: 'courseId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '201': { description: 'Enrolled successfully' } } }
  },
  '/me/lessons/{lessonId}/progress': {
    get: { tags: ['Learning'], summary: 'Get lesson progress', security: [{ bearerAuth: [] }], parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Progress details' } } },
    post: { tags: ['Learning'], summary: 'Update lesson progress', security: [{ bearerAuth: [] }], parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { watchedSeconds: { type: 'number' }, progress: { type: 'number' }, completed: { type: 'boolean' } } } } } }, responses: { '200': { description: 'Progress updated' } } }
  },
  '/lessons/{lessonId}/assignments': {
    get: { tags: ['Assignments'], summary: 'Get assignments for a lesson', parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Assignments list' } } }
  },
  '/assignments/{assignmentId}/submit': {
    post: { tags: ['Assignments'], summary: 'Submit an assignment', security: [{ bearerAuth: [] }], parameters: [{ name: 'assignmentId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { answerText: { type: 'string' } } } } } }, responses: { '201': { description: 'Assignment submitted' } } }
  },
  '/instructor/lessons/{lessonId}/assignments': {
    post: { tags: ['Assignments (Instructor)'], summary: 'Create an assignment', security: [{ bearerAuth: [] }], parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, type: { type: 'string', enum: ['file_upload', 'text_answer', 'mixed'] } } } } } }, responses: { '201': { description: 'Assignment created' } } }
  },
  '/me/quizzes/{quizId}/start': {
    post: { tags: ['Quizzes'], summary: 'Start a quiz', security: [{ bearerAuth: [] }], parameters: [{ name: 'quizId', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Quiz session started' } } }
  },
  '/me/quizzes/{quizId}/submit': {
    post: { tags: ['Quizzes'], summary: 'Submit quiz answers', security: [{ bearerAuth: [] }], parameters: [{ name: 'quizId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { answers: { type: 'array', items: { type: 'object', properties: { questionId: { type: 'string' }, selectedOptionIds: { type: 'array', items: { type: 'string' } } } } } } } } } }, responses: { '200': { description: 'Quiz graded and submitted' } } }
  },
  '/instructor/lessons/{lessonId}/quizzes': {
    post: { tags: ['Quizzes (Instructor)'], summary: 'Create a quiz', security: [{ bearerAuth: [] }], parameters: [{ name: 'lessonId', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { title: { type: 'string' }, questions: { type: 'array', items: { type: 'object' } } } } } } }, responses: { '201': { description: 'Quiz created' } } }
  }
};
