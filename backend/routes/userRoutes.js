
import express from "express";
const router = express.Router();
import {
  authUser,
  signUpUser,
  signOutUser,
  getUserProfile,
  updateUserProfile,
  createUser,
  getAllUsers,
  getAllUsersByAdmin,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'; // file extension needed
import { protect, admin } from "../middleware/authHandler.js";


router.route('/').post(signUpUser).get(protect, admin, getAllUsers);
router.route('/usersByAdmin').post(protect, admin, createUser).get(protect, admin, getAllUsersByAdmin).put(protect, admin, updateUserById).delete(protect, admin, deleteUserById);
router.post('/sign_out', signOutUser);
router.post('/sign_in', authUser);
router.route('/my_profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, getUserById).put(protect, updateUserById).delete(protect, admin, deleteUserById);

export default router;
