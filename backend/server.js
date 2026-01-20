
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';
import { globalLimiter } from './middleware/rateLimit.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageUploadRoutes from './routes/imageUploadRoutes.js';


const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Auth user Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Global rate limiter (light)
app.use(globalLimiter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes); // Links to productRoutes.js (e.g.: router.get)
app.use('/api/users', userRoutes); // Links to backend/routes/userRoutes.js (e.g.: router.get)
app.use('/api/orders', orderRoutes); // Links to orderRoutes.js (e.g.: router.get)
app.use('/api/product_image_upload', imageUploadRoutes); // Links to imageUploadRoutes.js (e.g.: router.get)

app.get('/api/config/paypal', (req, res) => 
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })  // Links to PayPal sandbox API
);

const __dirname = path.resolve();  // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));