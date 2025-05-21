const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

/**
 * Cart service
 */
const CartService = {
  
  getUserCart(userId) {
    try {
      // Get or create cart
      const cart = CartModel.getOrCreate(userId);
      
      // Enrich cart items with product details
      const enrichedItems = cart.items.map(item => {
        const product = ProductModel.findById(item.product_id);
        return {
          ...item,
          product: product ? {
            name: product.name,
            image_url: product.image_url,
            brand: product.brand
          } : { name: 'Product not available' }
        };
      });
      
      // Calculate cart total
      const totalAmount = CartModel.getTotal(userId);
      
      return {
        ...cart,
        items: enrichedItems,
        total_amount: totalAmount
      };
    } catch (error) {
      throw error;
    }
  },
  
  
  addItemToCart(userId, productId, quantity) {
    try {
      // Add item to cart
      const cart = CartModel.addItem(userId, productId, quantity);
      
      // Get enriched cart
      return this.getUserCart(userId);
    } catch (error) {
      throw error;
    }
  },
  
 
  updateCartItemQuantity(userId, productId, quantity) {
    try {
      // Update item quantity
      const cart = CartModel.updateItemQuantity(userId, productId, quantity);
      
      // Get enriched cart
      return this.getUserCart(userId);
    } catch (error) {
      throw error;
    }
  },
  
  
  removeCartItem(userId, productId) {
    try {
      // Remove item from cart
      const cart = CartModel.removeItem(userId, productId);
      
      // Get enriched cart
      return this.getUserCart(userId);
    } catch (error) {
      throw error;
    }
  },
  
  
  clearCart(userId) {
    try {
      // Clear cart
      const cart = CartModel.clear(userId);
      
      // Get enriched cart
      return this.getUserCart(userId);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = CartService;