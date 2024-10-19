import { Request, Response, Router } from 'express';
import { addBooking, deleteBooking } from '../controller/bookingController'; // Adjust the path as needed

const router: Router = Router();

// Route to create a new booking
router.post('/bookings', (req: Request, res: Response) => addBooking(req, res));

// Route to delete a booking by ID
router.delete('/bookings/:id', (req: Request, res: Response) => deleteBooking(req, res));

export default router;
