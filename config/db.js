// config/db.js

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['warn'],
    errorFormat: 'pretty',
});

// Database Connection Test
export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Graceful Shutdown for Database
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('🛑 Database connection closed');
    process.exit(0);
});

// Export Prisma Client for Global Use
export default prisma;
