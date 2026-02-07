
import message from "statuses"; // not { message }
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';


// @desc  Auth user & generate JsonWebToken (Create authorization)
// @route  POST /api/users/sign_in
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { primaryEmail, password } = req.body;
  const user = await User.findOne({ primaryEmail });

  if (user && (await user.verifyPassword(password))) {
    genToken(res, user._id);
    res.status(200).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      primaryEmail: user.primaryEmail,
      secondaryEmail: user.secondaryEmail,
      primaryPhone: user.primaryPhone,
      secondaryPhone: user.secondaryPhone,
      isSubscribedToEmail: user.isSubscribedToEmail, 
      isSubscribedToText: user.isSubscribedToText,
      isAdmin: user.isAdmin,
      adminNotes: user.adminNotes
    });
  } else { 
    res.status(401);
    throw new Error("Failure: Invalid e-mail or password");
  }
});

// @desc  Create/Signup/Register user
// @route  POST /api/users
// @access  Public
const signUpUser = asyncHandler(async (req, res) => { 
  const { 
    firstName, 
    lastName, 
    primaryEmail, 
    secondaryEmail, 
    primaryPhone, 
    secondaryPhone, 
    password,
    isSubscribedToEmail, 
    isSubscribedToText,
    isAdmin,
    adminNotes 
  } = req.body;
  const userExists = await User.findOne({ primaryEmail, secondaryEmail });

  if (userExists) { 
    res.status(400);
    throw new Error("Failure: User already exists");
  }
  const user = await User.create({ 
    firstName,
    lastName,
    primaryEmail,
    secondaryEmail,
    primaryPhone, 
    secondaryPhone,
    password,
    isSubscribedToEmail, 
    isSubscribedToText,
    isAdmin,
    adminNotes
  });

  if (user) { 
    genToken(res, user._id);

    res.status(201).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      primaryEmail: user.primaryEmail,
      secondaryEmail: user.secondaryEmail,
      primaryPhone: user.primaryPhone,
      secondaryPhone: user.secondaryPhone,
      isSubscribedToEmail: user.isSubscribedToEmail, 
      isSubscribedToText: user.isSubscribedToText,
      isAdmin: user.isAdmin,
      adminNotes: user.adminNotes
    });
  } else { 
    res.status(400);
    throw new Error("Error: Invalid user data");
  }
});

// @desc  Sign out user & delete (destroy, not just clear contents) cookie
// @route  POST /api/users/sign_out
// @access  Private (User)
const signOutUser = asyncHandler(async (req, res) => { 
  if (req.user) {
    res.cookie('jwt', '', { 
    httpOnly: true,
    expires: new Date(0)
    });
    res.status(200).json({ message: 'Success: You have signed out'});
  } else {
    res.status(400);
    throw new Error('Failure: Invalid request. Please, sign in.');
  }
});

// @desc  Read/Get user profile
// @route  GET /api/users/profile
// @access  Private (User)
const userReadMyProfile = asyncHandler(async (req, res) => { 
  const user = await User.findById(req.user._id);

  if (user) { 
    res.status(200).json({ 
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      primaryEmail: user.primaryEmail,
      secondaryEmail: user.secondaryEmail,
      primaryPhone: user.primaryPhone,
      secondaryPhone: user.secondaryPhone,
      isSubscribedToEmail: user.isSubscribedToEmail, 
      isSubscribedToText: user.isSubscribedToText,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Error: User not found");
  }
});

// @desc  Update user profile
// @route  PUT /api/users/profile
// @access  Private (User)
const userUpdateMyProfile = asyncHandler(async (req, res) => { 
  const user = await User.findById(req.user._id);
  
  if (!user) { 
    res.status(404); 
    throw new Error("Error: User not found"); 
  } 

  user.firstName = req.body.firstName || user.firstName; 
  user.lastName = req.body.lastName || user.lastName; 
  user.primaryEmail = req.body.primaryEmail || user.primaryEmail; 
  user.secondaryEmail = req.body.secondaryEmail || user.secondaryEmail; 
  user.primaryPhone = req.body.primaryPhone || user.primaryPhone; 
  user.secondaryPhone = req.body.secondaryPhone || user.secondaryPhone; 
  user.isSubscribedToEmail = req.body.isSubscribedToEmail || user.isSubscribedToEmail; 
  user.isSubscribedToText = req.body.isSubscribedToText || user.isSubscribedToText; 
  user.isAdmin = req.body.isAdmin || user.isAdmin; 
  user.adminNotes = req.body.adminNotes || user.adminNotes; 
  
  if (req.body.password) { 
    user.password = req.body.password; 
  } 
  
  const updatedUser = await user.save();

  // Generate new token 
  const token = genToken(res, updatedUser._id); 
  
  // Return updated user 
  res.status(200).json({ 
    _id: updatedUser._id, 
    firstName: updatedUser.firstName, 
    lastName: updatedUser.lastName, 
    primaryEmail: updatedUser.primaryEmail, 
    secondaryEmail: updatedUser.secondaryEmail, 
    primaryPhone: updatedUser.primaryPhone, 
    secondaryPhone: updatedUser.secondaryPhone, 
    isSubscribedToEmail: updatedUser.isSubscribedToEmail, 
    isSubscribedToText: updatedUser.isSubscribedToText, 
    isAdmin: updatedUser.isAdmin,
    adminNotes: updatedUser.adminNotes,
    token, 
  }); 
});

// @desc  Add/Signup/Register user by Admin
// @route  POST /api/usersByAdmin
// @access  Private (Admin)
const adminCreateUserByAdmin = asyncHandler(async (req, res) => {
  const { 
    firstName, 
    lastName, 
    primaryEmail, 
    secondaryEmail,
    primaryPhone, 
    secondaryPhone,
    password, 
    isSubscribedToEmail, 
    isSubscribedToText, 
    isAdmin, 
    adminNotes 
  } = req.body;

  // Basic Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("primaryEmail:", JSON.stringify(primaryEmail));
  if (!primaryEmail || !emailRegex.test(primaryEmail)) {
    res.status(400);
    throw new Error('Error: Invalid e-mail address');
  }

  const userExists = await User.findOne({ primaryEmail });

  if (userExists) {
    res.status(400);
    throw new Error('Failure: User already exists');
  }

  // Create the user with a random password (required by schema) and then generate a password-reset token
  const randomPassword = crypto.randomBytes(8).toString('hex');

  const user = await User.create({
    firstName,
    lastName,
    primaryEmail,
    secondaryEmail,
    primaryPhone,
    secondaryPhone,
    password: password || randomPassword,
    isSubscribedToEmail: Boolean(isSubscribedToEmail),
    isSubscribedToText: Boolean(isSubscribedToText),
    isAdmin: Boolean(isAdmin),
    adminNotes: adminNotes || '',
    createdBy: req.user ? req.user._id : undefined,
  });

  if (!user) {
    res.status(400);
    throw new Error('Error: Invalid user data');
  }

  // Generate a password reset token and expiry
  const resetToken = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

  await user.save();

  // Build reset URL for email
  const frontendBase = process.env.FRONTEND_URL || '';
  const resetUrl = frontendBase
    ? `${frontendBase.replace(/\/$/, '')}/reset_password/${resetToken}`
    : `Reset token: ${resetToken}`;

  // Try to send reset email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const fromAddress = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com';

    if (process.env.SMTP_HOST && transporter) {
      await transporter.sendMail({
        from: fromAddress,
        to: user.primaryEmail,
        subject: "Please, complete your account setup",
        text: `An account has been created for you. To set your password, visit: ${resetUrl}\nThe link expires in 1 hour.`,
      });
    } else {
      console.warn('Error: SMTP not configured. Reset URL:', resetUrl);
    }
  } catch (error) {
    console.error('Failure: Failed to send reset email:', error.message || String(error));
  }

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    primaryEmail: user.primaryEmail,
    secondaryEmail: user.secondaryEmail,
    primaryPhone: user.primaryPhone,
    secondaryPhone: user.secondaryPhone,
    isSubscribedToEmail: user.isSubscribedToEmail,
    isSubscribedToText: user.isSubscribedToText,
    isAdmin: user.isAdmin,
    adminNotes: user.adminNotes,
    message: 'Success: User created. Password setup instructions sent if SMTP configured.'
  });
});

// @desc Reset password using token
// @route PUT /api/users/reset_password/:token
// @access Public
const userResetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }

  if (!req.body.password) {
    res.status(400);
    throw new Error('Password is required');
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: "Success: Password has been reset" });
});

// @desc  Get/Read all users
// @route  GET /api/users
// @access  Private (Admin)
const adminReadAllUsers = asyncHandler(async (req, res) => { 
  const pageSize = 2;  // Number of users allowed per page
  const currentPage = Number(req.query.pageNumber) || 1;
  const pageCount = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .populate('createdBy', 'firstName lastName primaryEmail');
  res
    .status(200)
    .json({users, currentPage, totalPages: Math.ceil(pageCount / pageSize)});
});

// @desc  Read/Get user by Id.
// @route  GET /api/users/:id
// @access  Private (Admin)
const adminReadUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select(
      '-password'
    )
    .populate(
      'createdBy', 
      'firstName lastName primaryEmail secondaryEmail primaryPhone secondaryPhone isSubscribedToEmail isSubscribedToText isAdmin adminNotes'
    )
  ;

  if (user) { 
    res.status(200).json(user);
  } else { 
    res.status(404);
    throw new Error("Failure: User not found");
  }
});

// @desc  Update user by Id.
// @route  PUT /api/users/:id
// @access  Private (Admin)
const adminUpdateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) { 
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.primaryEmail = req.body.primaryEmail || user.primaryEmail;
    user.secondaryEmail = req.body.secondaryEmail || user.secondaryEmail;
    user.primaryPhone = req.body.primaryPhone || user.primaryPhone;
    user.secondaryPhone = req.body.secondaryPhone || user.secondaryPhone;
    user.isSubscribedToEmail = req.body.isSubscribedToEmail || user.isSubscribedToEmail;
    user.isSubscribedToText = req.body.isSubscribedToText || user.isSubscribedToText;
    // user.primaryBillingAddress = req.body.primaryBillingAddress || user.primaryBillingAddress;
    // user.primaryShippingAddress = req.body.primaryShippingAddress || user.primaryShippingAddress;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.adminNotes = req.body.adminNotes || user.adminNotes;

    const updatedUser = await user.save();

    res.status(200).json({ 
      _id: updatedUser._id, 
      firstName: updatedUser.firstName, 
      lastName: updatedUser.lastName, 
      primaryEmail: updatedUser.primaryEmail, 
      secondaryEmail: updatedUser.secondaryEmail, 
      primaryPhone: updatedUser.primaryPhone, 
      secondaryPhone: updatedUser.secondaryPhone, 
      isSubscribedToEmail: updatedUser.isSubscribedToEmail, 
      isSubscribedToText: updatedUser.isSubscribedToText, 
      isAdmin: updatedUser.isAdmin,
      adminNotes: updatedUser.adminNotes
    });
  } else { 
    res.status(404);
    throw new Error("Failure: User not found");
  }
});

// @desc  Delete a user
// @route  DELETE /api/users/:id
// @access  Private (Admin)
const adminDeleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) { 
    if (user.isAdmin) { 
      res.status(400);
      throw new Error('Failure: Cannot delete admin user')
    }
    await User.deleteOne({_id: user._id});
    res.status(200).json({ message: `Success: ${user._id} ${user.primaryEmail} has been deleted`});
  } else { 
    res.status(404);
      throw new Error('User not found')
  }
});

export {
  authUser,
  signUpUser,
  signOutUser,
  userReadMyProfile,
  userUpdateMyProfile,
  adminCreateUserByAdmin,
  adminReadAllUsers,
  adminReadUserById,
  adminUpdateUserById,
  adminDeleteUserById,
  userResetPassword,
};
