
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  readAllProducts, 
  readProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  createProductReview
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router
  .route('/')
  .get(readAllProducts)
  .post(protect, admin, createProduct);
router
  .route('/:id')
  .get(readProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router 
  .route('/:id/reviews')
  .post(protect, createProductReview);

export default router;
