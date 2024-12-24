// models/Admin.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Admin = prisma.$extends({
  model: {
    admin: {
      schema: `
        model Admin {
          id           String   @id @default(uuid())
          email        String   @unique @db.VarChar(255)
          password     String   @db.VarChar(255)
          firstName    String   @db.VarChar(50)
          lastName     String   @db.VarChar(50)
          role         String   @default("superadmin") // Possible: superadmin, moderator
          createdAt    DateTime @default(now())
          updatedAt    DateTime @updatedAt
        }
      `
    }
  }
});

export default Admin;
