// services/userService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get User Profile
export const getUserProfile = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { id, email, firstName, lastName, wishlist, notifications },
    });

    if (!user) throw new Error('User not found');
    return user;
};

// Update User Profile
export const updateUserProfile = async (id, updateData) => {
    return await prisma.user.update({
        where: { id },
        data: updateData,
    });
};

// Update Wishlist
export const updateWishlist = async (id, wishlist) => {
    return await prisma.user.update({
        where: { id },
        data: { wishlist },
    });
};
