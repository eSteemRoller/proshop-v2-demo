
import jwt from 'jsonwebtoken';


const genToken = (res, userId) => { 
  const JWToken = jwt.sign( 
      { userId }, 
      process.env.JWT_SECRET, {
        expiresIn: '30d'
      }
  );

  // Set JWToken as HTTP-only cookie
  res.cookie('jwt', JWToken, { 
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 1000, // Time target amount ((30 days) * ...) --> time measurement (milliseconds)
  });
}

export default genToken;