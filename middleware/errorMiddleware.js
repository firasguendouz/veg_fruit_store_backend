// middleware/errorMiddleware.js

// Middleware to handle application errors
export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Check for known Prisma errors
    if (err.code && err.meta) {
        statusCode = 400; // Bad Request for known database errors
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unknown error occurred.',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

// Middleware for 404 Not Found errors
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found.`
    });
};
