// routes/productRoutes.js

import {
    createNewProduct,
    deleteProductById,
    getProduct,
    getProducts,
    updateProductDetails
} from '../controllers/productController.js';

import { authenticateUser } from '../middleware/authMiddleware.js';
import { authorizeAdmin } from '../middleware/adminMiddleware.js';
import express from 'express';

// Import the product controller functions
 // Authenticate user middleware
 // Authorize admin middleware

const router = express.Router();

// Route for creating a new product (Admin only)
router.post('/', authenticateUser, authorizeAdmin, createNewProduct);  // POST /api/products - Create product

// Route for getting all active products (Public access)
router.get('/', getProducts);  // GET /api/products - Get all products

// Route for getting a single product by ID (Public access)
router.get('/:id', getProduct);  // GET /api/products/:id - Get product by ID

// Route for updating product details (Admin only)
router.put('/:id', authenticateUser, authorizeAdmin, updateProductDetails);  // PUT /api/products/:id - Update product

// Route for deleting a product (Admin only)
router.delete('/:id', authenticateUser, authorizeAdmin, deleteProductById);  // DELETE /api/products/:id - Delete product

export default router;
