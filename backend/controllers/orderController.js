
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


// @desc Create/POST new User order
// @route POST /api/orders
// @access Private
const createUserOrder = asyncHandler(async (req, res) => { 
  const { 
    // user,
    orderItems,
    subtotalPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingAddress,
    billingAddress,
    paymentMethod,
    paymentResult,
    isPaid,
    paidWhen,
  } = req.body;

  if (orderItems && orderItems.length === 0) { 
    res.status(400);
    throw new Error('No order items found');
  } else { 
    const order = new Order({ 
      user: req.user._id,
      orderItems: orderItems.map((orderX) => ({ 
        ...orderX,
        product: orderX._id,
        _id: undefined
      })),
      subtotalPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentResult,
      isPaid,
      paidWhen,
    });

    const createdOrder = await order.saved();

    res.status(201).json(createdOrder);

    res.send('createUserOrder');
  }
});

// @desc Read/GET all User's orders
// @route GET /api/orders/myorders
// @access Private
const readAllUsersOrders = asyncHandler(async (req, res) => { 
  const allUsersOrders = await Order.find({ user: req.user._id });
  res.status(200).json(allUsersOrders);
  res.send('readAllUsersOrders');
});

// @desc Read/GET User's order by Id
// @route GET /api/orders/:id
// @access Private (Admin)
const readUsersOrderById = asyncHandler(async (req, res) => { 
  const usersOrderById = 
    await Order.findById(req.params.id).populate('user','name email phone');

  if (usersOrderById) { 
    res.status(200).json(usersOrderById);
  } else { 
    res.status(404);
    throw new Error('Order not found');
  }
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

