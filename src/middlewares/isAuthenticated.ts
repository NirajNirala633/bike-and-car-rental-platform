import { Request, Response, NextFunction } from 'express';

const checkAuthentication = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (req.user) {
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not authenticated, return a response indicating the need to log in
    return res.status(401).json({ authRequired: true, message: 'Please Login to continue.' });
  }
};

export default checkAuthentication;
