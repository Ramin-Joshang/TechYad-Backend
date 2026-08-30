import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import { AppError } from './common/errors/AppError.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting (Basic)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests from this IP, please try again later.' } }
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// API Routes
app.use('/api/v1', routes);

// Handle 404
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404, 'NOT_FOUND'));
});

// Global Error Handler
app.use(errorHandler);

export default app;
