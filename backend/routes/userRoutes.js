
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
import { protectRoute, admin } from "../middleware/authHandler.js";


router.route('/').post(signUpUser).get(protectRoute, admin, getAllUsers);
router.route('/usersByAdmin').post(protectRoute, admin, createUser).get(protectRoute, admin, getAllUsersByAdmin);
router.post('/signout', signOutUser);
router.post('/signin', authUser);
router.route('/profile').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile);
router.route('/:id').get(protectRoute, admin, getUserById).put(protectRoute, admin, updateUserById).delete(protectRoute, admin, deleteUserById);

export default router;
