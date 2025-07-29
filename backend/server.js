
// import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';
import productRoutes from './routes/productRoutes.js';
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes); // Links to productRoutes.js: router.get

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));