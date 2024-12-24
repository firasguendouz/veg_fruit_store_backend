// services/orderService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Order
export const createOrder = async (orderData) => {
    const {
        recipientName,
        recipientAddress,
        recipientPhone,
        productList,
        totalAmount,
        paymentMethod,
        clientId,
        guestId,
        deliveryType,
    } = orderData;

    return await prisma.order.create({
        data: {
            recipientName,
            recipientAddress,
            recipientPhone,
            productList,
            totalAmount,
            paymentMethod,
            paymentStatus: 'pending',
            orderStatus: 'processing',
            clientId,
            guestId,
            deliveryType,
        },
    });
};

// Get Orders (Client)
export const getClientOrders = async (clientId) => {
    return await prisma.order.findMany({
        where: { clientId },
    });
};

// Get Orders (Admin)
export const getAllOrders = async () => {
    return await prisma.order.findMany();
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
    return await prisma.order.update({
        where: { id },
