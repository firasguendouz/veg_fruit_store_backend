// services/adminService.js

import prisma from '../config/db.js';

// Import Prisma instance

// Fetch all users
export const getAllUsers = async () => {
    return await prisma.user.findMany();  // Using Prisma to fetch users from the database
};

// Fetch user by ID
export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

// Update user role
export const updateUserRole = async (id, role) => {
    return await prisma.user.update({
        where: { id },
        data: { role },
    });
};

// Get system analytics (e.g., total users, orders, etc.)
export const getSystemAnalytics = async () => {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();

    return {
        totalUsers,
        totalOrders,
        totalProducts,
    };
};
