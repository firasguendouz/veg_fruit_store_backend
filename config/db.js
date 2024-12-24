// config/db.js

import mongoose from 'mongoose';

// Database Connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';

// Database Connection Function
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Graceful Shutdown for Database
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🛑 Database connection closed');
    process.exit(0);
});

// Log Database Connection Events
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose connected to the database');
});

mongoose.connection.on('error', (err) => {
    console.error(`🔴 Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('🟡 Mongoose disconnected from the database');
});

// Export mongoose for global use
export default mongoose;
