import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// Initialize Redis client if REDIS_URL is provided
const redisClient = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

const createStore = () => {
  if (!redisClient) return undefined;
  return new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  });
};

// Global light limiter for all requests
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200, // max requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  store: createStore(),
});

// Stricter limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  store: createStore(),
});

// Sensitive actions: account creation, password reset - very strict
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit to 5 requests per IP per hour
  message: { message: 'Too many requests for this operation, please try later.' },
  standardHeaders: true,
  legacyHeaders: false,
  store: createStore(),
});

export default {
  globalLimiter,
  authLimiter,
  sensitiveLimiter,
};
