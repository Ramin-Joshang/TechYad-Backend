import app from './app.js';
import { connectDB } from './config/database.js';
import { env } from './config/env.js';

const startServer = async () => {
  // 1. Connect to Database
  await connectDB();

  // 2. Start Express Server
  const server = app.listen(env.PORT, () => {
    console.log(`✅ Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  // 3. Handle unhandled rejections globally
  process.on('unhandledRejection', (err: Error) => {
    console.error('❌ UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

startServer();
