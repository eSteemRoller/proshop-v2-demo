
import message from "statuses"; // not { message }
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";


// @desc  Auth user & get JsonWebToken (Create authorization)
// @route  POST /api/users/sign_in
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    genToken(res, user._id);

    res.status(200).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });

  } else { 
    res.status(401);
    throw new Error('Invalid e-mail or password');
  }
});

// @desc  Create/Signup/Register user
// @route  POST /api/users
// @access  Public
const signUpUser = asyncHandler(async (req, res) => { 
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) { 
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ 
    firstName,
    lastName,
    email,
    password,
  });

  if (user) { 
    genToken(res, user._id);

    res.status(201).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else { 
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc  Sign out user & clear (delete, not just clear contents) cookie
// @route  POST /api/users/sign_out
// @access  Private (User)
const signOutUser = asyncHandler(async (req, res) => { 
  // if (req.user) {
    res.cookie('jwt', '', { 
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Signed out successfully'});
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid request. Please, sign in.');
  // }
});

// @desc  Read/Get user profile
// @route  GET /api/users/profile
// @access  Private (User)
const getUserProfile = asyncHandler(async (req, res) => { 
  const user = await User.findById(req.user._id);

  if (user) { 
    res.status(200).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  Update user profile
// @route  PUT /api/users/profile
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req, res) => { 
  const user = await User.findById(req.user._id);

  if (user) { 
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) { 
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({ 
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else { 
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc  Create/Signup/Register user by Admin
// @route  POST /api/usersByAdmin
// @access  Private (Admin)
const createUser = asyncHandler(async (req, res) => {
  res.send('(POST) Admin - Create user by Admin');
});

// @desc  Get/Read all users
// @route  GET /api/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc  Get/Read all users by Admin
// @route  GET /api/users/usersByAdmin
// @access  Private (Admin)
const getAllUsersByAdmin = asyncHandler(async (req, res) => {
  res.send('(GET) Admin - Read all users by Admin');
});

// @desc  Read/Get user by Id.
// @route  GET /api/users/:id
// @access  Private (Admin)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) { 
    res.status(200).json(user);
  } else { 
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Update user by Id.
// @route  PUT /api/users/:id
// @access  Private (Admin)
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) { 
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({ 
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else { 
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Delete a user
// @route  DELETE /api/users/:id
// @access  Private (Admin)
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) { 
    if (user.isAdmin) { 
      res.status(400);
      throw new Error('Cannot delete admin user')
    }
    await User.deleteOne({_id: user._id});
    res.status(201).json({ message: `Success: ${user._id} ${user.name} has been deleted`});
  } else { 
    res.status(404);
      throw new Error('User not found')
  }
});

export {
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
};
