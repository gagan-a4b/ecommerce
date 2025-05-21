const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// Create a new order from user's cart
router.post('/', protect, orderController.createOrder);

// Get all orders for the logged-in user
router.get('/', protect, orderController.getUserOrders);

// Get details of a specific order
router.get('/:id', protect, orderController.getOrderById);

// Update order status (admin or internal)
router.put('/:id/status', protect, orderController.updateOrderStatus);

// Cancel an order
router.delete('/:id', protect, orderController.cancelOrder);

module.exports = router;
