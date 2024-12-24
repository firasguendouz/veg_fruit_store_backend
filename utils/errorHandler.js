// utils/errorHandler.js

/**
 * Custom Error Class
 * @extends Error
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Format and Send Error Response
 * @param {Response} res - Express response object
 * @param {Error} error - Error object
 */
export const handleErrorResponse = (res, error) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};

/**
 * Handle Prisma-Specific Errors
 * @param {Error} error - Prisma error object
 */
export const handlePrismaError = (error) => {
    if (error.code) {
        switch (error.code) {
            case 'P2002':
                throw new AppError('Unique constraint failed. Duplicate entry.', 400);
            case 'P2025':
                throw new AppError('Record not found.', 404);
            default:
                throw new AppError('Database error occurred.', 500);
        }
    }
    throw error;
};
