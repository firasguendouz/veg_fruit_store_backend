// controllers/userController.js

import { AppError, handleErrorResponse } from '../utils/errorHandler.js';
import {
    getUserProfile,
    updateUserProfile,
    updateWishlist,
} from '../services/userService.js';

/**
 * @desc   Get user profile
 * @route  GET /api/users/profile
 * @access Private (Client)
 */
export const getProfile = async (req, res) => {
    try {
        const user = await getUserProfile(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update user profile
 * @route  PUT /api/users/profile
 * @access Private (Client)
 */
export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, address } = req.body;

        if (!firstName && !lastName && !email && !phoneNumber && !address) {
            throw new AppError('At least one field must be updated', 400);
        }

        const updatedUser = await updateUserProfile(req.user.id, {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
        });

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update wishlist
 * @route  PUT /api/users/wishlist
 * @access Private (Client)
 */
export const updateUserWishlist = async (req, res) => {
    try {
        const { wishlist } = req.body;

        if (!wishlist || !Array.isArray(wishlist)) {
            throw new AppError('Wishlist must be an array of product IDs', 400);
        }

        const updatedUser = await updateWishlist(req.user.id, wishlist);

        res.status(200).json({
            success: true,
            message: 'Wishlist updated successfully',
            data: updatedUser.wishlist,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update notification settings
 * @route  PUT /api/users/notifications
 * @access Private (Client)
 */
export const updateNotifications = async (req, res) => {
    try {
        const { notifications } = req.body;

        if (!notifications || typeof notifications !== 'object') {
            throw new AppError('Notifications must be a valid object', 400);
        }

        const updatedUser = await updateUserProfile(req.user.id, { notifications });

        res.status(200).json({
            success: true,
            message: 'Notification settings updated successfully',
            data: updatedUser.notifications,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
