// config/env.js

import dotenv from 'dotenv';
import path from 'path';

// Load .env file based on NODE_ENV
const ENV_FILE = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({
    path: path.resolve(process.cwd(), ENV_FILE),
});

console.log(`🛠️ Loaded environment variables from ${ENV_FILE}`);

// Define Required Environment Variables
const requiredEnv = {
    JWT_SECRET: 'A secret key for JWT authentication',
    REFRESH_TOKEN_SECRET: 'A secret key for refresh tokens',
    DATABASE_URL: 'MongoDB database connection string',
    NODE_ENV: 'Node environment (development, production, etc.)',
    PORT: 'Port on which the server will run',
};

// Validate Required Environment Variables
const missingEnv = Object.keys(requiredEnv).filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnv.forEach((key) => {
        console.error(`- ${key}: ${requiredEnv[key]}`);
    });
    process.exit(1);
}

// Normalize Environment Variables
const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
const PORT = parseInt(process.env.PORT, 10) || 3000;

// Configuration Object
const config = {
    NODE_ENV,
    PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_LEVEL: process.env.LOG_LEVEL?.toLowerCase() || 'info',
    DEBUG: process.env.DEBUG === 'true',
};

// Log Configuration in Development Mode
if (NODE_ENV === 'development') {
    console.log('🟢 Environment Configuration:', JSON.stringify(config, null, 2));
}

// Export Configuration
export default config;
