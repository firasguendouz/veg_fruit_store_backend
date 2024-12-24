// app.js

import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';

import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import env from './config/env.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Routes






// Initialize Express App
const app = express();

// Global Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance security headers
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined')); // Logging

// Health Check Route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is healthy and running smoothly!',
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Catch 404 - Route Not Found
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
