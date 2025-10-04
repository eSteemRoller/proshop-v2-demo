
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { getProducts, getProductById, postNewProduct, updateProduct } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router.route('/').get(getProducts).post(protect, admin, postNewProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

export default router;
