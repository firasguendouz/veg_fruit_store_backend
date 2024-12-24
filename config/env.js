// config/env.js

import dotenv from 'dotenv';
import path from 'path';

// Load .env file based on NODE_ENV
dotenv.config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
});

// Validate Required Environment Variables
const requiredEnv = [
    'JWT_SECRET',
    'REFRESH_TOKEN_SECRET',
    'DATABASE_URL',
    'NODE_ENV',
    'PORT'
];

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

// Export Configuration
export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
