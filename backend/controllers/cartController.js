const cartService = require('../services/cartService');

/**
 * Get the user's cart
 * @route GET /api/cart
 */
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.user.user_id);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add an item to the cart
 * @route POST /api/cart
 * @body { productId, quantity }
 */
const addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(req.user.user_id, productId, quantity);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Update item quantity in cart
 * @route PUT /api/cart
 * @body { productId, quantity }
 */
const updateItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCartItemQuantity(req.user.user_id, productId, quantity);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Remove an item from the cart
 * @route DELETE /api/cart/item/:productId
 */
const removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeCartItem(req.user.user_id, productId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Clear the entire cart
 * @route DELETE /api/cart
 */
const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.user_id);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
};
