// routes/adminRoutes.js

import {
    getAllUsersController,
    getSystemAnalyticsController,
    getUserByIdController,
    updateUserRoleController,
} from '../controllers/adminController.js';

import { authenticateUser } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';
import express from 'express';

// Keep authenticateUser here
 // Correct the import for authorizeAdmin
// Import admin controller functions



const router = express.Router();

// Admin Routes for Users
router.get('/users', authenticateUser, authorizeAdmin, getAllUsersController); // Get all users
router.get('/users/:id', authenticateUser, authorizeAdmin, getUserByIdController); // Get user by ID
router.put('/users/:id/role', authenticateUser, authorizeAdmin, updateUserRoleController); // Update user role

// Admin Route for System Analytics
router.get('/analytics', authenticateUser, authorizeAdmin, getSystemAnalyticsController); // Get system analytics

export default router;
