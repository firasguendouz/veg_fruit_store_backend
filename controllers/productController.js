// controllers/productController.js

import { AppError, handleErrorResponse } from '../utils/errorHandler.js';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../services/productService.js';

/**
 * @desc   Create a new product
 * @route  POST /api/products
 * @access Admin
 */
export const createNewProduct = async (req, res) => {
    try {
        const { name, sku, category, quantity, unitPrice, pricePer100g, description, status } = req.body;

        if (!name || !sku || !category || !quantity || !unitPrice) {
            throw new AppError('All required fields must be provided', 400);
        }

        const product = await createProduct({
            name,
            sku,
            category,
            quantity,
            unitPrice,
            pricePer100g,
            description,
            status: status || 'active',
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get all active products
 * @route  GET /api/products
 * @access Public
 */
export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get product by ID
 * @route  GET /api/products/:id
 * @access Public
 */
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update product details
 * @route  PUT /api/products/:id
 * @access Admin
 */
export const updateProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedProduct = await updateProduct(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Delete a product
 * @route  DELETE /api/products/:id
 * @access Admin
 */
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteProduct(id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
