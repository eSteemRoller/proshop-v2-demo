
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";


// @desc  Auth user & get token (Create authorization)
// @route  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    res.json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else { 
    res.status(401);
    throw new Error('Invalid e-mail or password');
  }

  res.send('(POST) Public - Auth User');
});

// @desc  Create/Signup/Register user
// @route  POST /api/users
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  res.send('(POST) Public - Signup (Create) user');
});

// @desc  Logout user & clear (delete) cookie
// @route  POST /api/users/logout
// @access  Private (User)
const logoutUser = asyncHandler(async (req, res) => {
  res.send('(POST) User - Logout User');
});

// @desc  Read/Get user profile
// @route  GET /api/users/user
// @access  Private (User)
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('(GET) User - Read User (self) profile');
});

// @desc  Update user profile
// @route  PUT /api/users/user
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('(PUT) User - Update User (self) profile');
});

// @desc  Create/Signup/Register user
// @route  POST /api/users
// @access  Private (Admin)
const createUser = asyncHandler(async (req, res) => {
  res.send('(POST) Admin - Create user');
});

// @desc  Get/Read all users
// @route  GET /api/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  res.send('(GET) Admin - Read all users');
});

// @desc  Read/Get user by Id.
// @route  GET /api/users/:id
// @access  Private (Admin)
const getUserById = asyncHandler(async (req, res) => {
  res.send('(GET) Admin - Read User by Id');
});

// @desc  Update user by Id.
// @route  PUT /api/users/:id
// @access  Private (Admin)
const updateUserById = asyncHandler(async (req, res) => {
  res.send('(PUT) Admin - Update User by Id');
});

// @desc  Delete a user
// @route  DELETE /api/users/:id
// @access  Private (Admin)
const deleteUserById = asyncHandler(async (req, res) => {
  res.send('(DELETE) Admin - Delete User by Id');
});

export {
  authUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
