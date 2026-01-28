
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


router.route('/').post(authLimiter, signUpUser);
router.route('/usersByAdmin').get(protect, admin, readAllUsers).post(protect, admin, sensitiveLimiter, addUserByAdmin).put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);
router.route('/users/admin/all_users').get(protect, admin, readAllUsers).post(protect, admin, sensitiveLimiter, addUserByAdmin).put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);
router.post('/sign_out', signOutUser);
router.post('/sign_in', authLimiter, authUser);
router.put('/reset_password/:token', sensitiveLimiter, resetPassword);
router.route('/:id/my_profile').get(protect, readMyUserProfile).put(protect, updateMyUserProfile);
router.route('/:id').get(protect, readUserById).put(protect, updateUserById).delete(protect, admin, deleteUserById);

export default router;
