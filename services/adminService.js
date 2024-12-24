// services/adminService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get All Users
export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

// Get User by ID
export const getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
};

// Update User Role
export const updateUserRole = async (id, role) => {
    return await prisma.user.update({
        where: { id },
        data: { role },
    });
};

// Get System Analytics (Example: Count Orders)
export const getSystemAnalytics = async () => {
    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();

    return { userCount, orderCount };
};
