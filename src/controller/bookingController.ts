import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller to add a booking
const addBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bikeId, userId, bookingFromDate, bookingToDate } = req.body;

    // Check if the bike is available before booking
    const bike = await prisma.bike.findUnique({
      where: { id: bikeId },
    });

    if (!bike || !bike.isAvailable) {
      res.status(400).json({ error: 'Bike is not available for booking' });
      return;
    }

    const newBooking = await prisma.booking.create({
      data: {
        bikeId,
        userId,
        bookingFromDate: new Date(bookingFromDate),
        bookingToDate: new Date(bookingToDate),
      },
    });

    // Set the bike's availability to false after booking
    await prisma.bike.update({
      where: { id: bikeId },
      data: { isAvailable: false },
    });

    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// Controller to delete a booking
const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: parseInt(id, 10) },
    });

    // Set the bike's availability to true after deleting the booking
    await prisma.bike.update({
      where: { id: booking.bikeId },
      data: { isAvailable: true },
    });

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to delete booking', details: error.message });
  }
};

export { addBooking, deleteBooking };
