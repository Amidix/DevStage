import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Get order by ID
// @route POST /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    /* order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }*/

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to delivered
// @route GET /api/orders/:id/deliiver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'orderItems.product',
    match: {
      user: req.user._id,
    },
    select: 'user',
  })

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id, isPaid: true })
  res.json(orders)
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 30
  const page = req.query.pageNumber || 1
  const count = await Order.count({})
  const pages = Math.ceil(count / pageSize)

  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('user', 'id name')
    .sort({ createdAt: -1 })
  res.json({ orders, page, pages })
})

// @desc Get logged in vendor orders
// @route GET /api/orders/vendororders
// @access Private

/*, orderItems:{product : req.user._id}*/
const getVendorOrders = asyncHandler(async (req, res) => {
  const pageSize = 20
  const page = req.query.pageNumber || 1
  const count = await Order.count({})
  const pages = Math.ceil(count / pageSize)
  const orders = await Order.find({
    isPaid: true,
  })
    .populate({
      path: 'orderItems.product',
      match: {
        user: req.user._id,
      },
      select: 'user',
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ paidAt: -1 })

  res.json({ orders, page, pages })
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getVendorOrders,
  getOrders,
}
