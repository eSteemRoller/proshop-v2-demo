
import express from "express";
const router = express.Router();
// import products from '../data/products.js'; // original local pseudo-server data file
import { 
  getAllProducts, 
  getProductById, 
  postNewProduct, 
  editProduct, 
  deleteProduct
} from "../controllers/productController.js";
import { protect, admin } from '../middleware/authHandler.js';


router.route('/').get(getAllProducts).post(protect, admin, postNewProduct);
router.route('/:id').get(getProductById).put(protect, admin, editProduct).delete(protect, admin, deleteProduct);

export default router;
