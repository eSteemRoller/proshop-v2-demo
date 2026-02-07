
import express from 'express';
const router = express.Router();
import { 
  userCreateMyOrder,
  userReadAllMyOrders,
  userReadMyOrderById,
  adminReadAllOrders,
  adminReadUserOrderById,
  adminUpdateUserOrderById,
} from '../controllers/orderController.js'; // file extension needed
import { protect, admin } from '../middleware/authHandler.js';



router.route('/user/:id/order/submit_order')
  .post(protect, userCreateMyOrder);
router.route('/user/:id/my_orders/:pageNumber')
  .get(protect, userReadAllMyOrders);
router.route('/user/:id/my_orders/order/:id')
  .get(protect, userReadMyOrderById);

router.route('/admin/all_orders/:pageNumber')
  .get(protect, admin, adminReadAllOrders)
router.route('/admin/all_orders/order/:id')
  .get(protect, admin, adminReadUserOrderById);
router.route('/admin/all_orders/order/:id/edit_order')
  .put(protect, admin, adminUpdateUserOrderById);


export default router;
