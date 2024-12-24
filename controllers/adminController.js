// controllers/adminController.js

import { AppError, handleErrorResponse } from '../utils/errorHandler.js';
import {
    getAllUsers,
    getSystemAnalytics,
    getUserById,
    updateUserRole,
} from '../services/adminService.js';

/**
 * @desc   Get all users
 * @route  GET /api/admin/users
 * @access Admin
 */
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get user by ID
 * @route  GET /api/admin/users/:id
 * @access Admin
 */
export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update user role
 * @route  PUT /api/admin/users/:id/role
 * @access Admin
 */
export const updateUserRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role || !['client', 'admin', 'superadmin'].includes(role)) {
            throw new AppError('Invalid role. Valid roles are: client, admin, superadmin', 400);
        }

        const updatedUser = await updateUserRole(id, role);

        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            data: updatedUser,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get system analytics
 * @route  GET /api/admin/analytics
 * @access Admin
 */
export const getSystemAnalyticsController = async (req, res) => {
    try {
        const analytics = await getSystemAnalytics();

        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
