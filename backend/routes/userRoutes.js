
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


console.log("userRoutes.js loaded");

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

router.route('/admin/all_users/user/:id/edit_user')
  .put(
    (req, res, next) => {
      console.log("Route hit!");
      next();
    },
    protect, 
    admin, 
    adminUpdateUserById
  );

router.route('/admin/all_users/user/:id/delete_user')
  .delete(protect, admin, adminDeleteUserById); 
router.route('/admin/all_users/user/:id')
  .get(protect, admin, adminReadUserById);
router.route('/admin/all_users/add_user')
  .post(protect, admin, sensitiveLimiter, adminCreateUserByAdmin);
router.route('/admin/all_users')
  .get(protect, admin, adminReadAllUsers);


export default router;
