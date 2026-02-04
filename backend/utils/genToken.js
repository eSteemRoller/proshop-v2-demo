
import jwt from 'jsonwebtoken';


export default function genToken(res, userId) { 
  const JWToken = jwt.sign( 
      { userId }, 
      process.env.JWT_SECRET, {
        expiresIn: '30d'
      }
  );

  // Set JWToken as HTTP-only cookie
  res.cookie('jwt', JWToken, { 
    httpOnly: true,  // cookie not stored in client local storage = better security
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000  
      // Auth session duration (30 days = 30 days * 24 hrs * 60 min * 60 sec * 1000 ms)
  });
};
