import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Utility to compare passwords
import hashPassword from '../utils/hashPassword';
import { prisma } from '../config/db';
import { generateKey } from 'crypto';
import generateJWT from '../utils/generateJWT';



export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, profilePicture } = req.body;
  
      // Check for required fields
      if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required.' });
        return;
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = hashPassword(password);
  
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword, // Store the hashed password
          profilePicture,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('User Already Exist', error);
      res.status(500).json({ error: true, message: "User Already Exist" });
    }
  };


 

  
  
  export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Check for required fields
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required.' });
        return;
      }
  
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }
  
      // Hash the provided password and compare it with the stored hashed password
      const hashedInputPassword = hashPassword(password);
      if (hashedInputPassword !== user.password) {
        res.status(401).json({ error: 'Invalid email or password.' });
        return;
      }
  
      // Generate a JWT token for the authenticated user
      const token = generateJWT(user.id)
  
      res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      console.error('Login Error', error);
      res.status(500).json({ error: true, message: 'Login failed, please try again later.' });
    }
  };
  