
import express from "express";
const router = express.Router();
import {
  authUser,
  signUpUser,
  signOutUser,
  resetPassword,
  readMyUserProfile,
  updateMyUserProfile,
  addUserByAdmin,
  readAllUsers,
  readUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'; // file extension needed
import { protect, admin } from "../middleware/authHandler.js";
import { authLimiter, sensitiveLimiter } from "../middleware/rateLimit.js";


router.route('/sign_in').post(authLimiter, authUser);
router.route('/sign_up').post(authLimiter, signUpUser);
router.route('/user/:id/my_profile').get(protect, readMyUserProfile).put(protect, updateMyUserProfile);
// router.route('/user/:id/my_profile/order/:id').get(protect, readMyOrderDetails).post(protect, reorderMyOrder).put(protect, cancelMyOrder);
router.route('/sign_out').post(signOutUser);
router.route('/reset_password/:token').put(sensitiveLimiter, resetPassword);

router.route('/admin/all_users').get(protect, admin, readAllUsers).delete(protect, admin, deleteUserById);
router.route('/admin/all_users/user/:id/edit_user-edit_orders').get(protect, admin, readUserById).put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);
router.route('/admin/all_users/add_user').post(protect, admin, sensitiveLimiter, addUserByAdmin);


export default router;
