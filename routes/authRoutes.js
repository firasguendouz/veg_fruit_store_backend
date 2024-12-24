// routes/authRoutes.js

import { Router } from 'express';
import { errorHandler } from '../middleware/errorMiddleware.js';
import { register } from '../controllers/authController.js'; // Import register, not registerUser
import { validateUserRegistration } from '../validators/authValidator.js';

const router = Router();

router.post('/register', validateUserRegistration, register); // Call the register function here

router.use(errorHandler);

export default router;
