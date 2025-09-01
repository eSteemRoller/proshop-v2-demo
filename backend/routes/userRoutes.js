
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
import { protectRoute, adminUser } from "../middleware/authHandler.js";


router.route('/').post(signUpUser).get(protectRoute, adminUser, getAllUsers);
router.route('/usersByAdmin').post(protectRoute, adminUser, createUser).get(protectRoute, adminUser, getAllUsersByAdmin);
router.post('/signout', signOutUser);
router.post('/signin', authUser);
router.route('/user').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile);
router.route('/:id').get(protectRoute, adminUser, getUserById).put(protectRoute, adminUser, updateUserById).delete(protectRoute, adminUser, deleteUserById);

export default router;
