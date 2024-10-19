import express, { Router } from 'express';
import {
  getUserById,
  updateUser,
  deleteUser
} from '../controller/userController';

const router: Router = express.Router();

// Routes for user operations

router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
