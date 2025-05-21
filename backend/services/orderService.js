const OrderModel = require('../models/orderModel');
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

/**
 * Order service
 */
const OrderService = {
  
  createOrder(userId, orderData) {
    try {
      // Get user's cart
      const cart = CartModel.findByUserId(userId);
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }
      
      // Prepare order items with product details
      const orderItems = cart.items.map(item => {
        const product = ProductModel.findById(item.product_id);
        if (!product) {
          throw new Error(`Product ${item.product_id} not found`);
        }
        
        // Check stock
        if (product.stock_quantity < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }
        
        return {
          product_id: item.product_id,
          name: product.name,
          price: product.price,
          quantity: item.quantity
        };
      });
      
      // Calculate total
      const totalAmount = CartModel.getTotal(userId);
      
      // Create order
      const order = OrderModel.create({
        user_id: userId,
        items: orderItems,
        total_amount: totalAmount,
        shipping_address: orderData.shipping_address,
        payment_method: orderData.payment_method
      });
      
      // Process payment
      const paymentResult = OrderModel.processPayment(order.order_id);
      
      // Clear cart after successful order
      CartModel.clear(userId);
      
      return {
        order,
        payment: paymentResult
      };
    } catch (error) {
      throw error;
    }
  },
  
  
  getOrderById(orderId, userId) {
    try {
      const order = OrderModel.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      
      // Check if order belongs to user
      if (order.user_id !== userId) {
        throw new Error('Not authorized to access this order');
      }
      
      return order;
    } catch (error) {
      throw error;
    }
  },
  
  
  getUserOrders(userId, options) {
    try {
      return OrderModel.findByUserId(userId, options);
    } catch (error) {
      throw error;
    }
  },
  
  
  updateOrderStatus(orderId, status) {
    try {
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
      }
      
      const updatedOrder = OrderModel.update(orderId, { status });
      if (!updatedOrder) {
        throw new Error('Order not found');
      }
      
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  },
  
  
  cancelOrder(orderId, userId) {
    try {
      // Check if order exists and belongs to user
      const order = this.getOrderById(orderId, userId);
      
      // Cancel order
      return OrderModel.cancel(orderId);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = OrderService;