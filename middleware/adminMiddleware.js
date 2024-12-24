// middleware/adminMiddleware.js

// Middleware to verify if the user has admin privileges
export const authorizeAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
        next();
    } else {
        return res.status(403).json({ message: 'Access Denied. Admin privileges required.' });
    }
};
