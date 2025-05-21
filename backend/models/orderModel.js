const { v4: uuidv4 } = require('uuid');
const { carts } = require('../utils/mockData');
const ProductModel = require('./productModel');

/**
 * Cart model for in-memory data store
 */
const CartModel = {
  
  findByUserId(userId) {
    return carts.find(cart => cart.user_id === userId) || null;
  },

  
  create(userId) {
    const newCart = {
      cart_id: uuidv4(),
      user_id: userId,
      items: [],
      created_at: new Date(),
      updated_at: new Date()
    };
    
    carts.push(newCart);
    return newCart;
  },
  
  
  getOrCreate(userId) {
    // Find existing cart
    let cart = this.findByUserId(userId);
    
    // Create new cart if none exists
    if (!cart) {
      cart = this.create(userId);
    }
    
    return cart;
  },
  
  
  addItem(userId, productId, quantity) {
    // Get the cart
    const cart = this.getOrCreate(userId);
    
    // Get the product
    const product = ProductModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Check if product is in stock
    if (product.stock_quantity < quantity) {
      throw new Error('Not enough stock available');
    }
    
    // Find item index if already in cart
    const itemIndex = cart.items.findIndex(item => item.product_id === productId);
    
    if (itemIndex > -1) {
      // Item already in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item not in cart, add it
      cart.items.push({
        product_id: productId,
        quantity,
        price: product.price
      });
    }
    
    // Update cart timestamp
    cart.updated_at = new Date();
    
    return cart;
  },
  
  
  updateItemQuantity(userId, productId, quantity) {
    // Get the cart
    const cart = this.findByUserId(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Find item index
    const itemIndex = cart.items.findIndex(item => item.product_id === productId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
    
    // If quantity is 0 or less, remove item
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Get the product
      const product = ProductModel.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Check if product is in stock
      if (product.stock_quantity < quantity) {
        throw new Error('Not enough stock available');
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }
    
    // Update cart timestamp
    cart.updated_at = new Date();
    
    return cart;
  },
  
  
  removeItem(userId, productId) {
    // Get the cart
    const cart = this.findByUserId(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Find item index
    const itemIndex = cart.items.findIndex(item => item.product_id === productId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
    
    // Remove item
    cart.items.splice(itemIndex, 1);
    
    // Update cart timestamp
    cart.updated_at = new Date();
    
    return cart;
  },
  
  
  clear(userId) {
    // Get the cart
    const cart = this.findByUserId(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Clear items
    cart.items = [];
    
    // Update cart timestamp
    cart.updated_at = new Date();
    
    return cart;
  },
  
  
  getTotal(userId) {
    // Get the cart
    const cart = this.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      return 0;
    }
    
    // Calculate total
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
};

module.exports = CartModel;