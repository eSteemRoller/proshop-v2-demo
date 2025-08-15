
// import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Auth user Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes); // Links to productRoutes.js: router.get
app.use('/api/users', userRoutes); // Links to userRoutes.js: router.get

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));