
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


// @desc Create/POST new User order
// @route POST /api/orders
// @access Private
const createUserOrder = asyncHandler(async (req, res) => {
  res.send('createUserOrder');
});

// @desc Read/GET all User's orders
// @route GET /api/orders/myorders
// @access Private
const readAllUsersOrders = asyncHandler(async (req, res) => {
  res.send('readAllUsersOrders');
});

// @desc Read/GET User's order by Id
// @route GET /api/orders/:id
// @access Private (Admin)
const readUsersOrderById = asyncHandler(async (req, res) => {
  res.send('readUsersOrderById');
});

// @desc Update/PUT User's order as Paid
// @route PUT /api/orders/:id/paid
// @access Private
const updateUsersOrderByIdAsPaid = asyncHandler(async (req, res) => {
  res.send('updateUsersOrderByIdAsPaid');
});

// @desc Update/PUT User's order as Shipped
// @route PUT /api/orders/:id/shipped
// @access Private
const updateUsersOrderByIdAsShipped = asyncHandler(async (req, res) => {
  res.send('updateUsersOrderByIdAsShipped');
});

// @desc Update/PUT User's order as Delivered
// @route PUT /api/orders/:id/delivered
// @access Private
const updateUsersOrderByIdAsDelivered = asyncHandler(async (req, res) => {
  res.send('updateUsersOrderByIdAsDelivered');
});

// @desc Read/GET all orders
// @route GET /api/orders
// @access Private (Admin)
const readAllOrders = asyncHandler(async (req, res) => {
  res.send('readAllOrders');
});


export { 
  createUserOrder,
  readAllUsersOrders,
  readUsersOrderById,
  updateUsersOrderByIdAsPaid,
  updateUsersOrderByIdAsShipped,
  updateUsersOrderByIdAsDelivered,
  readAllOrders,
};

