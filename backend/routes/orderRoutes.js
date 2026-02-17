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
router.route('/user/:id/my_orders/order/:id')
  .get(protect, userReadMyOrderById);
router.route('/user/:id/my_orders')
  .get(protect, userReadAllMyOrders);

router.route('/admin/all_orders/order/:id/edit_order')
  .put(protect, admin, adminUpdateUserOrderById);
router.route('/admin/all_orders/order/:id')
  .get(protect, admin, adminReadUserOrderById);
router.route('/admin/all_orders')
  .get(protect, admin, adminReadAllOrders)


export default router;