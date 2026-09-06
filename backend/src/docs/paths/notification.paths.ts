export const notificationPaths = {
  '/me/notifications': {
    get: {
      tags: ['Notifications'],
      summary: 'Get user notifications',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'List of notifications' } }
    }
  },
  '/me/notifications/read-all': {
    patch: {
      tags: ['Notifications'],
      summary: 'Mark all notifications as read',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'All marked as read' } }
    }
  },
  '/me/notifications/{id}/read': {
    patch: {
      tags: ['Notifications'],
      summary: 'Mark specific notification as read',
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Notification marked as read' } }
    }
  }
};
