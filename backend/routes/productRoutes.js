
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  userReadAllProducts, 
  userReadProductById, 
  userCreateProductReview,
  adminCreateProduct, 
  adminReadAllProducts,
  adminUpdateProductById, 
  adminDeleteProductById,
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router.route('/') 
  .get(userReadAllProducts); 
router.route('/product/:id') 
  .get(userReadProductById); 
router.route('/product/:id/submit_review') 
  .post(protect, userCreateProductReview); 
router.route('/admin/all_products/:pageNumber') 
  .get(protect, admin, adminReadAllProducts) 
  .post(protect, admin, adminCreateProduct); 
router.route('/admin/all_products/product/:id/edit_product') 
  .put(protect, admin, adminUpdateProductById); 
router.route('/admin/all_products/page/:pageNumber/product/:id/delete_product') 
  .delete(protect, admin, adminDeleteProductById); 


export default router;
