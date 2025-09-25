
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
import { protectRoute, admin } from '../middleware/authHandler.js';


router.route('/').post(protectRoute, createUsersOrder).get(protectRoute, admin, readAllOrders);
router.route('/my_orders').get(protectRoute, readAllUsersOrders);
router.route('/:id').get(protectRoute, readUsersOrderById);
router.route('/:id/paid').put(protectRoute, updateUsersOrderByIdAsPaid);
router.route('/:id/shipped').put(protectRoute, admin, updateUsersOrderByIdAsShipped);
router.route('/:id/delivered').put(protectRoute, admin, updateUsersOrderByIdAsDelivered);


export default router;
