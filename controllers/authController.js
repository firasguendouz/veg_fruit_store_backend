// controllers/authController.js

import { AppError, handleErrorResponse } from '../utils/errorHandler.js';
import { generateRefreshToken, generateToken } from '../utils/generateToken.js';
import { loginUser, registerUser } from '../services/authService.js';

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            throw new AppError('All fields are required', 400);
        }

        const { user, token } = await registerUser({ email, password, firstName, lastName });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Authenticate user & get token
 * @route  POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        const { user, token } = await loginUser(email, password);
        const refreshToken = generateRefreshToken({ id: user.id });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token,
            refreshToken,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Refresh JWT token
 * @route  POST /api/auth/refresh
 * @access Public
 */
export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError('Refresh token is required', 400);
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const token = generateToken({ id: decoded.id });

        res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Logout user
 * @route  POST /api/auth/logout
 * @access Private
 */
export const logout = async (req, res) => {
    try {
        // Clear session or token blacklist (if implemented)
        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
