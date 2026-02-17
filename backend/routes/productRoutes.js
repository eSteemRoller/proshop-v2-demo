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


router.route('/user/:id/product/:id/submit_review') 
  .post(protect, userCreateProductReview);
router.route('/product/:id') 
  .get(userReadProductById);
router.route('/') 
  .get(userReadAllProducts);

router.route('/admin/all_products/product/:id/edit_product') 
  .put(protect, admin, adminUpdateProductById); 
router.route('/admin/all_products/product/:id/delete_product') 
  .delete(protect, admin, adminDeleteProductById);
router.route('/admin/all_products/add_product')
  .post(protect, admin, adminCreateProduct);
router.route('/admin/all_products') 
  .get(protect, admin, adminReadAllProducts);


export default router;