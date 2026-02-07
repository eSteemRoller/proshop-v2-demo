
import express from "express";
const router = express.Router();
import {
  authUser,
  signUpUser,
  signOutUser,
  userResetPassword,
  userReadMyProfile,
  userUpdateMyProfile,
  adminReadAllUsers,
  adminReadUserById,
  adminUpdateUserById,
  adminCreateUserByAdmin,
  adminDeleteUserById,
} from '../controllers/userController.js'; // file extension needed
import { protect, admin } from "../middleware/authHandler.js";
import { authLimiter, sensitiveLimiter } from "../middleware/rateLimit.js";


router.route('/sign_in')
  .post(authLimiter, authUser);
router.route('/sign_up')
  .post(authLimiter, signUpUser);
router.route('/user/:id/my_profile')
  .get(protect, userReadMyProfile)
  .put(protect, userUpdateMyProfile);
// router.route('/user/:id/my_profile/order/:id').get(protect, readMyOrderDetails).post(protect, reorderMyOrder).put(protect, cancelMyOrder);
router.route('/sign_out')
  .post(signOutUser);
router.route('/reset_password/:token')
  .put(sensitiveLimiter, userResetPassword);

router.route('/admin/all_users/:pageNumber')
  .get(protect, admin, adminReadAllUsers);
router.route('/admin/all_users/user/:id/edit_user')
  .get(protect, admin, adminReadUserById)
  .put(protect, admin, adminUpdateUserById);
router.route('/admin/all_users/add_user')
  .post(protect, admin, sensitiveLimiter, adminCreateUserByAdmin);
router.route('/admin/all_users/page/:pageNumber/user/:id/delete_user')
  .delete(protect, admin, adminDeleteUserById);


export default router;
