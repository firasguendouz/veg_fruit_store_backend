// controllers/orderController.js

import { AppError, handleErrorResponse } from '../utils/errorHandler.js';
import {
    createOrder,
    getAllOrders,
    getClientOrders,
    updateOrderStatus
} from '../services/orderService.js';

/**
 * @desc   Create a new order
 * @route  POST /api/orders
 * @access Public (Guest) / Private (Client)
 */
export const createNewOrder = async (req, res) => {
    try {
        const {
            recipientName,
            recipientAddress,
            recipientPhone,
            productList,
            totalAmount,
            paymentMethod,
            deliveryType,
        } = req.body;

        if (!recipientName || !recipientAddress || !productList || !totalAmount || !paymentMethod) {
            throw new AppError('All required fields must be provided', 400);
        }

        const orderData = {
            recipientName,
            recipientAddress,
            recipientPhone,
            productList,
            totalAmount,
            paymentMethod,
            deliveryType,
            clientId: req.user ? req.user.id : null,
            guestId: !req.user ? 'guest_' + Date.now() : null,
        };

        const order = await createOrder(orderData);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get orders for a client
 * @route  GET /api/orders/my-orders
 * @access Private (Client)
 */
export const getClientOrderHistory = async (req, res) => {
    try {
        const orders = await getClientOrders(req.user.id);

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Get all orders (Admin only)
 * @route  GET /api/orders
 * @access Admin
 */
export const getAllOrderHistory = async (req, res) => {
    try {
        const orders = await getAllOrders();

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Update order status
 * @route  PUT /api/orders/:id/status
 * @access Admin
 */
export const updateOrderStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            throw new AppError('Order status is required', 400);
        }

        const updatedOrder = await updateOrderStatus(id, status);

        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: updatedOrder,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

/**
 * @desc   Cancel an order (Client)
 * @route  PUT /api/orders/:id/cancel
 * @access Private (Client)
 */
export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedOrder = await updateOrderStatus(id, 'cancelled');

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: updatedOrder,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
