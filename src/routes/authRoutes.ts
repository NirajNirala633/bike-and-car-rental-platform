import { Router } from 'express';
import { register, login } from '../controller/authController'; // Import the register and login controllers

const router = Router();

// Define the routes for user registration and login
router.post('/register', register);
router.post('/login', login);

export default router;
