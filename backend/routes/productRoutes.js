
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  readAllProducts, 
  readProductById, 
  createNewProduct, 
  putProduct, 
  deleteProduct,
  createProductReview
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router
  .route('/')
  .get(readAllProducts)
  .post(protect, admin, createNewProduct);
router
  .route('/:id')
  .get(readProductById)
  .put(protect, admin, putProduct)
  .delete(protect, admin, deleteProduct);
router 
  .route('/:id/reviews')
  .post(protect, createProductReview);

export default router;
