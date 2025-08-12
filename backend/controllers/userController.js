
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";


// @desc  Auth user & get token (Create authorization)
// @route  POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send('(POST) Auth User');
});

// @desc  Create/Signup/Register user
// @route  POST /api/users
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  res.send('(POST) Signup (Create) User');
});

// @desc  Logout user & clear (delete) cookie
// @route  POST /api/users/logout
// @access  Private (User)
const logoutUser = asyncHandler(async (req, res) => {
  res.send('(POST) Logout User');
});

// @desc  Read/Get user profile
// @route  GET /api/users/userProfile
// @access  Private (User)
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('(GET) Read User (self) profile');
});

// @desc  Update user profile
// @route  PUT /api/users/userProfile
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('(PUT) Update User (self) profile');
});

// @desc  Get/Read all users
// @route  GET /api/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  res.send('(GET) Read all users');
});

// @desc  Read/Get user by Id.
// @route  GET /api/users/:id
// @access  Private (Admin)
const getUserById = asyncHandler(async (req, res) => {
  res.send('(GET) Read User by Id');
});

// @desc  Update user by Id.
// @route  PUT /api/users/:id
// @access  Private (Admin)
const updateUserById = asyncHandler(async (req, res) => {
  res.send('(PUT) Update User by Id');
});

// @desc  Delete a user
// @route  DELETE /api/users/:id
// @access  Private (Admin)
const deleteUserById = asyncHandler(async (req, res) => {
  res.send('(DELETE) User by Id');
});

export {
  authUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
