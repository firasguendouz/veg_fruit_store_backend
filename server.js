// server.js

import app from './app.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import env from './config/env.js';
import http from 'http';

// Import dotenv using ES module syntax

dotenv.config();  // Load environment variables from .env file

// Start the Server
const server = http.createServer(app);

// Connect to Database
connectDB().then(() => {
    const PORT = env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT} in ${env.NODE_ENV} mode`);
    });
}).catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Graceful Shutdown
const gracefulShutdown = () => {
    console.log('🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully.');
        process.exit(0);
    });
};

// Handle Interrupt Signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
