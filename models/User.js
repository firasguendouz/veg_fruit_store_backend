// models/User.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const User = prisma.$extends({
  model: {
    user: {
      schema: `
        model User {
          id           String   @id @default(uuid())
          email        String   @unique @db.VarChar(255)
          password     String   @db.VarChar(255)
          firstName    String   @db.VarChar(50)
          lastName     String   @db.VarChar(50)
          phoneNumber  String?  @db.VarChar(20)
          address      String?  @db.VarChar(255)
          wishlist     Json?    // Array of product IDs or product details
          notifications Json?   // Notification preferences
          role         String   @default("client") // Possible values: client, admin
          createdAt    DateTime @default(now())
          updatedAt    DateTime @updatedAt
        }
      `
    }
  }
});

export default User;
