// routes/routes.ts

import { Router } from 'express';
import { addBike, deleteBike, editBike } from '../controller/bikeController';

const router = Router();

// Add a new bike
router.post('/bikes', addBike);

// Delete a bike
router.delete('/bikes/:id', deleteBike);

// Edit a bike
router.put('/bikes/:id', editBike);

export default router;
