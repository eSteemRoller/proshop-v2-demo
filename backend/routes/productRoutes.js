
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  readAllProducts, 
  readProductById, 
  createProduct, 
  updateProductById, 
  deleteProductById,
  createProductReview
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router.route('/')
  .get(readAllProducts);
router.route('/product/:id')
  .get(readProductById);
router.route('/admin/all_products/:pageNumber')
  .get(protect, admin, readAllProducts)
  .post(protect, admin, createProduct);
router.route('/admin/all_products/product/:id/edit_product')
  .put(protect, admin, updateProductById);
router.route('/admin/all_products/:id/delete_product')
  .delete(protect, admin, deleteProductById);
router.route('/product/:id/submit_review')
  .post(protect, createProductReview);

export default router;
