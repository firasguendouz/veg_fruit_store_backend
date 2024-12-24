// routes/orderRoutes.js

import {
    cancelOrder,
    createNewOrder,
    getAllOrderHistory,
    getClientOrderHistory,
    updateOrderStatusById
} from '../controllers/orderController.js';

import { authenticateUser } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';
import express from 'express';

// Import the order controller functions
 // Authenticate user middleware
 // Authorize admin middleware

const router = express.Router();

// Route for creating a new order
// Accessible to both guest and client users
router.post('/', authenticateUser, createNewOrder);  // POST /api/orders - Create order

// Route to get the order history for a client
// Accessible only to authenticated clients
router.get('/my-orders', authenticateUser, getClientOrderHistory);  // GET /api/orders/my-orders - Get client orders

// Route to get all orders (Admin only)
router.get('/', authenticateUser, authorizeAdmin, getAllOrderHistory);  // GET /api/orders - Get all orders (Admin only)

// Route to update the order status (Admin only)
router.put('/:id/status', authenticateUser, authorizeAdmin, updateOrderStatusById);  // PUT /api/orders/:id/status - Update order status (Admin only)

// Route to cancel an order (Client only)
router.put('/:id/cancel', authenticateUser, cancelOrder);  // PUT /api/orders/:id/cancel - Cancel order (Client only)

export default router;  // Default export
