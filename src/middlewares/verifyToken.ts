import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db'; // Assuming this is where the Prisma instance is exported

interface DecodedToken {
  id: number; // Updated to number to match the `id` type in Prisma schema
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const authHeader = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

    if (!authHeader) {
      req.user = null;
      return res.status(401).json({ success: false, authRequired: true, message: 'Invalid authorization' });
    }

    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET || 'OGebj_*^5?>{N+E=o') as DecodedToken;
    } catch (err) {
      return res.status(401).json({ success: false, authRequired: true, message: 'Please Login to continue.' });
    }

    if (!decodedToken) {
      return res.status(401).json({ success: false, authRequired: true, message: 'Please Login to continue.' });
    }

    // Use Prisma to fetch user information using the decoded token's ID
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      return res.status(401).json({ success: false, authRequired: true, message: 'Please Login to continue.' });
    }

    req.user = user; // Attaching the user object to the request object
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ success: false, authRequired: true, message: 'Please Login to continue.' });
  }
};

export default authMiddleware;
