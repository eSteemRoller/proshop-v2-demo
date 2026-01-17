
import express from "express";
const router = express.Router();
import {
  authUser,
  signUpUser,
  signOutUser,
  resetPassword,
  readUserProfile,
  updateUserProfile,
  createUser,
  readAllUsers,
  readAllUsersByAdmin,
  readUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'; // file extension needed
import { protect, admin } from "../middleware/authHandler.js";
import { authLimiter, sensitiveLimiter } from "../middleware/rateLimit.js";


router.route('/').post(authLimiter, signUpUser).get(protect, admin, readAllUsers);
router.route('/usersByAdmin').post(protect, admin, sensitiveLimiter, createUser).get(protect, admin, readAllUsersByAdmin).put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);
router.post('/sign_out', signOutUser);
router.post('/sign_in', authLimiter, authUser);
router.put('/reset_password/:token', sensitiveLimiter, resetPassword);
router.route('/my_profile').get(protect, readUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, readUserById).put(protect, updateUserById).delete(protect, admin, deleteUserById);

export default router;
