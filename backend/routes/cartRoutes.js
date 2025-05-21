const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

// Get current user's cart
router.get('/', protect, cartController.getCart);

// Add item to cart
router.post('/', protect, cartController.addItem);

// Update item quantity in cart
router.put('/', protect, cartController.updateItem);

// Remove specific item from cart
router.delete('/item/:productId', protect, cartController.removeItem);

// Clear the entire cart
router.delete('/', protect, cartController.clearCart);

module.exports = router;
