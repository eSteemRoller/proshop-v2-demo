
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
    billingAddress,
    shippingAddress,
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
      billingAddress,
      shippingAddress,
      paymentMethod,
      paymentResult,
      isPaid,
      paidWhen,
    });

    const createdOrder = await order.saved();

    res.status(201).json(createdOrder);

    res.send('createUsersOrder');
  }
});

// @desc Read/GET all User's orders
// @route GET /api/orders/my_orders
// @access Private
const readAllMyOrders = asyncHandler(async (req, res) => { 
  const allUsersOrders = await Order.find({ user: req.user._id });
  res.status(200).json(allUsersOrders);
  res.send('readMyOrders');
});

// @desc Read/GET User's order by Id
// @route GET /api/orders/:id
// @access Private (Admin)
const readUserOrderById = asyncHandler(async (req, res) => { 
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
const updateUserOrderByIdAsPaid = asyncHandler(async (req, res) => { 
  const order = await order.findById(req.params.id);

  if (order) { 
    order.isPaid = true;
    order.paidWhen = Date.now();
    order.paymentResult = { 
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    res.send('updateUsersOrderByIdAsPaid');

    const paidOrder = await order.save();

    res.status(200).json(paidOrder);
  } else { 
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update/PUT User's order as Shipped
// @route PUT /api/orders/:id/shipped
// @access Private
const updateUserOrderByIdAsShipped = asyncHandler(async (req, res) => {
  res.send('updateUsersOrderByIdAsShipped');
});

// @desc Update/PUT User's order as Delivered
// @route PUT /api/orders/:id/delivered
// @access Private
const updateUserOrderByIdAsDelivered = asyncHandler(async (req, res) => { 
  const order = await Order.findById(req.params.id);

  if (order) { 
    order.isDelivered = true;
    order.deliveredWhen = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } else { 
    res.status(404);
    throw new Error('Order not found')
  }

  res.send('updateUsersOrderByIdAsDelivered');
});

// @desc Read/GET all orders
// @route GET /api/orders
// @access Private (Admin)
const readAllOrders = asyncHandler(async (req, res) => { 
  const pageSize = 2;  // Number of users allowed per page
  const currentPage = Number(req.query.pageNumber) || 1;
  const pageCount = await Order.countDocuments();

  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .populate('user', 'id lastName');
  res
    .status(200)
    .json({orders, currentPage, totalPages: Math.ceil(pageCount / pageSize)});
  res
    .send('readAllOrders');
});


export { 
  createUserOrder,
  readAllMyOrders,
  readUserOrderById,
  updateUserOrderByIdAsPaid,
  updateUserOrderByIdAsShipped,
  updateUserOrderByIdAsDelivered,
  readAllOrders,
};

