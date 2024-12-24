// routes/userRoutes.js

import {
    getProfile,
    updateNotifications,
    updateProfile,
    updateUserWishlist
} from '../controllers/userController.js';

import { authenticateUser } from '../middleware/authMiddleware.js';
import express from 'express';

// Import the user controller functions
 // Authenticate user middleware

const router = express.Router();

// Route to get user profile
// Accessible to authenticated users (clients)
router.get('/profile', authenticateUser, getProfile);  // GET /api/users/profile - Get user profile

// Route to update user profile
// Accessible to authenticated users (clients)
router.put('/profile', authenticateUser, updateProfile);  // PUT /api/users/profile - Update user profile

// Route to update user wishlist
// Accessible to authenticated users (clients)
router.put('/wishlist', authenticateUser, updateUserWishlist);  // PUT /api/users/wishlist - Update wishlist

// Route to update user notification settings
// Accessible to authenticated users (clients)
router.put('/notifications', authenticateUser, updateNotifications);  // PUT /api/users/notifications - Update notifications

export default router;
