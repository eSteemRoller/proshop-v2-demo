
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const port = process.env.PORT;

connectDB(); // Connect to MongoDB

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));