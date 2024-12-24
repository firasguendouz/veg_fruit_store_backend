// models/Order.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Order = prisma.$extends({
  model: {
    order: {
      schema: `
        model Order {
          id              String   @id @default(uuid())
          recipientName   String   @db.VarChar(100)
          recipientAddress String  @db.VarChar(255)
          recipientPhone  String?  @db.VarChar(20)
          productList     Json     // Array of product objects (id, sku, name, quantity, price)
          totalAmount     Float    @default(0.0)
          paymentMethod   String   @default("unpaid") // Possible: unpaid, credit_card, cash, online
          paymentStatus   String   @default("pending") // Possible: pending, completed, failed
          orderStatus     String   @default("processing") // Possible: processing, shipped, delivered, cancelled
          deliveryType    String   @default("delivery") // Possible: delivery, pickup
          clientId        String?  @db.VarChar(100) // Linked to User ID
          guestId         String?  @db.VarChar(100) // For guest users
          createdAt       DateTime @default(now())
          updatedAt       DateTime @updatedAt
        }
      `
    }
  }
});

export default Order;
