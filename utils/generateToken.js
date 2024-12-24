// utils/generateToken.js

import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {Object} payload - Data to include in the token
 * @param {String} expiresIn - Token expiration time (e.g., '7d', '1h')
 * @returns {String} JWT Token
 */
export const generateToken = (payload, expiresIn = '7d') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Generate Refresh Token
 * @param {Object} payload - Data to include in the refresh token
 * @returns {String} Refresh Token
 */
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};
