// services/productService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Product
export const createProduct = async (productData) => {
    return await prisma.product.create({
        data: productData,
    });
};

// Get All Products
export const getAllProducts = async () => {
    return await prisma.product.findMany({
        where: { status: 'active' },
    });
};

// Get Product by ID
export const getProductById = async (id) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Product not found');
    return product;
};

// Update Product
export const updateProduct = async (id, updateData) => {
    return await prisma.product.update({
        where: { id },
        data: updateData,
    });
};

// Delete Product
export const deleteProduct = async (id) => {
    return await prisma.product.delete({ where: { id } });
};
