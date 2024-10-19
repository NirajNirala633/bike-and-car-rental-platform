
import express, { Application, Request, Response, NextFunction } from 'express';
import colors from 'colors.ts';
import userRoutes from './routes/userRoutes';
import bikeRoutes from './routes/bikeRoutes';
import bookingRoutes from './routes/bookingRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();

// Middleware to parse JSON
app.use(express.json());

// Use the user routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/bike', bikeRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/auth', authRoutes)

// Routes
app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Welcome to Wheels To Paradise');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// PORT
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000; // Ensure PORT is a number

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Node Server is running on port ${PORT}.`);
});
