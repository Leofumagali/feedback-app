import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedback.routes.js';
import authRoutes from './routes/auth.routes.js'
import logger from './middlewares/logger.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/feedbacks', feedbackRoutes);

export default app;
