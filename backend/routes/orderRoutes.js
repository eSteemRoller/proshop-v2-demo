
import express from 'express';
const router = express.Router();
import {
  createUsersOrder,
  readAllUsersOrders,
  readUsersOrderById,
  updateUsersOrderByIdAsPaid,
  updateUsersOrderByIdAsShipped,
  updateUsersOrderByIdAsDelivered,
  readAllOrders,
} from '../controllers/orderController.js'; // file extension needed
import { protect, admin } from '../middleware/authHandler.js';


router.route('/').post(protect, createUsersOrder).get(protect, admin, readAllOrders);
router.route('/my_orders').get(protect, readAllUsersOrders);
router.route('/:id').get(protect, readUsersOrderById);
router.route('/:id/paid').put(protect, updateUsersOrderByIdAsPaid);
router.route('/:id/shipped').put(protect, admin, updateUsersOrderByIdAsShipped);
router.route('/:id/delivered').put(protect, admin, updateUsersOrderByIdAsDelivered);


export default router;
