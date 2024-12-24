'''
Service layer for handling business logic related to users.
'''
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      role: 'user',
    },
  });
  return user;
};
exports.login = async (loginData) => {
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });
  if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
// Additional user-related service methods...