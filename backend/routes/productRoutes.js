
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  getAllProducts, 
  getProductById, 
  postNewProduct, 
  putProduct, 
  deleteProduct,
  postProductReview
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router
  .route('/')
  .get(getAllProducts)
  .post(protect, admin, postNewProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, putProduct)
  .delete(protect, admin, deleteProduct);
router 
  .route('/:id/reviews')
  .post(protect, postProductReview);

export default router;
