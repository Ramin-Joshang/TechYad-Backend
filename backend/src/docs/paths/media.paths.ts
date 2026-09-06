export const mediaPaths = {
  '/media/upload': {
    post: {
      tags: ['Media'],
      summary: 'Upload a file',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'File uploaded successfully' },
        '400': { description: 'No file provided or file too large' }
      }
    }
  }
};
