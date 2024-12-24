import { errorHandler } from '../middleware/errorMiddleware.js';
import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { validateUserRegistration } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);

router.use(errorHandler);

export default router;
