
import express from "express";
const router = express.Router();
import {
  authUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController.js'; // file extension needed

router.route('/').post(signupUser).get(getAllUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/userProfile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

export default router;
