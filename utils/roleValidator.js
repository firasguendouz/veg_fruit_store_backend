// utils/roleValidator.js

/**
 * Check if a user has the required role
 * @param {String[]} requiredRoles - Array of allowed roles
 * @returns {Function} Middleware function
 */
export const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied. Insufficient privileges.' });
        }

        next();
    };
};

/**
 * Check if a user is a Super Admin
 * @returns {Function} Middleware function
 */
export const isSuperAdmin = () => {
    return (req, res, next) => {
        if (req.user && req.user.role === 'superadmin') {
            return next();
        }
        return res.status(403).json({ message: 'Super Admin privileges required.' });
    };
};
