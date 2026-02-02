
import express from 'express';
const router = express.Router();
import {
  readAllMyOrders,
  readUserOrderById,
  updateUserOrderByIdAsPaid,
  updateUserOrderByIdAsShipped,
  updateUserOrderByIdAsDelivered,
  readAllOrders,
  createUserOrder,
} from '../controllers/orderController.js'; // file extension needed
import { protect, admin } from '../middleware/authHandler.js';


router.route('/user/:id/my_profile/my_orders/:pageNumber')
  .get(protect, readAllMyOrders);
router.route('/user/:id/my_profile/')
  .get(protect, readAllMyOrders);
router.route('/user/:id/my_profile/my_orders/order/:id')
  .get(protect, readUserOrderById);

router.route('/admin/all_orders/:pageNumber')
  .get(protect, admin, readAllOrders)
  .post(protect, admin, createUserOrder);
router.route('/admin/all_orders/order/:id')
  .get(protect, admin, readUserOrderById);
router.route('/admin/all_orders/order/:id/edit_order')
  .put(protect, updateUserOrderByIdAsPaid);
router.route('/:id/shipped').put(protect, admin, updateUserOrderByIdAsShipped);
router.route('/:id/delivered').put(protect, admin, updateUserOrderByIdAsDelivered);


export default router;
