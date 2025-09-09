
import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';


// Protect routes
export const protectRoute = asyncHandler(async (req, res, next) => { 
  let JWToken;

  // Read the JWToken from the cookie
  JWToken = req.cookies.jwt;

  if (JWToken) {
    try {
      const decodedToken = jwt.verify(JWToken, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.userId).select('-password');
      next();
    } catch (error) { 
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token not permitted');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
export const admin = (req, res, next) => { 
  if (req.user && req.user.isAdmin) { 
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an Administrator');
  } 
};
