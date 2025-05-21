const orderService = require('../services/orderService');

/**
 * Create a new order from cart
 * @route POST /api/orders
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orderData = req.body;
    const result = await orderService.createOrder(userId, orderData);
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Get a specific order by ID
 * @route GET /api/orders/:id
 */
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId, userId);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Get all orders for the authenticated user
 * @route GET /api/orders
 */
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const orders = await orderService.getUserOrders(userId, req.query);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update the status of an order (admin or internal usage)
 * @route PUT /api/orders/:id/status
 */
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Cancel an order
 * @route DELETE /api/orders/:id
 */
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.user_id;
    const cancelledOrder = await orderService.cancelOrder(orderId, userId);
    res.status(200).json({ success: true, order: cancelledOrder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  cancelOrder
};
