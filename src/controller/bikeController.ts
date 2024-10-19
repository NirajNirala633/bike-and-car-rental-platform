// controllers/bikeController.ts

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a new bike
const addBike = async (req: Request, res: Response): Promise<void> => {
    const { name, mileage, photo, isAvailable }: { name: string; mileage: number; photo: string; isAvailable?: boolean } = req.body;

    try {
        const newBike = await prisma.bike.create({
            data: {
                name,
                mileage,
                photo,
                isAvailable: isAvailable ?? true, // Default to true if not specified
            },
        });
        res.status(201).json(newBike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add bike' });
    }
};

// Delete a bike
const deleteBike = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedBike = await prisma.bike.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(deletedBike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete bike' });
    }
};

// Edit a bike
const editBike = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, mileage, photo, isAvailable }: { name: string; mileage: number; photo: string; isAvailable?: boolean } = req.body;

    try {
        const updatedBike = await prisma.bike.update({
            where: { id: Number(id) },
            data: {
                name,
                mileage,
                photo,
                isAvailable,
            },
        });
        res.status(200).json(updatedBike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update bike' });
    }
};

export {
    addBike,
    deleteBike,
    editBike,
};
