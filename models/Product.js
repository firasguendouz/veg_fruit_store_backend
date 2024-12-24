// models/Product.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Product = prisma.$extends({
  model: {
    product: {
      schema: `
        model Product {
          id          String   @id @default(uuid())
          sku         String   @unique @db.VarChar(100)
          name        String   @db.VarChar(100)
          category    String   @db.VarChar(50)
          quantity    Int      @default(0)
          unitPrice   Float    @default(0.0)
          pricePer100g Float?   // Optional, for items sold by weight
          status      String   @default("active") // Possible values: active, blocked
          description String?  @db.Text
          createdAt   DateTime @default(now())
          updatedAt   DateTime @updatedAt
        }
      `
    }
  }
});

export default Product;
