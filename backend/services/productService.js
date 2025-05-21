const ProductModel = require('../models/productModel');

const ProductService = {
  createProduct(productData) {
    return ProductModel.create(productData);
  },

  getProductById(productId) {
    const product = ProductModel.findById(productId);
    if (!product) {
      console.log("PRODUCT NOT FOUND")
      throw new Error('Product not found');
    }
    return product;
  },

  getAllProducts(query) {
    const { skip = 0, limit = 10, category, brand, minPrice, maxPrice } = query;

    const options = {
      skip: parseInt(skip),
      limit: parseInt(limit),
      filters: {
        category,
        brand,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      }
    };

    return ProductModel.findAll(options);
  },

  updateProduct(productId, updateData) {
    const updatedProduct = ProductModel.update(productId, updateData);
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  },

  deleteProduct(productId) {
    const result = ProductModel.delete(productId);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  },

  searchProducts(query, options) {
    const { skip = 0, limit = 10 } = options;
    return ProductModel.search(query, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    });
  }
};

module.exports = ProductService;

