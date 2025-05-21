const { v4: uuidv4 } = require('uuid');
const { products } = require('../utils/mockData');

/**
 * Product model for in-memory data store
 */
const ProductModel = {
  
  create(productData) {
    const newProduct = {
      product_id: productData.product_id || uuidv4(),
      name: productData.name,
      description: productData.description || '',
      price: productData.price,
      category: productData.category || '',
      brand: productData.brand || '',
      image_url: productData.image_url || '',
      stock_quantity: productData.stock_quantity || 0,
      specifications: productData.specifications || {},
      created_at: new Date(),
      updated_at: new Date()
    };
    
    products.push(newProduct);
    return newProduct;
  },
  
 
  findById(productId) {
    return products.find(product => product.product_id === productId) || null;
  },
  
 
  findAll({ skip = 0, limit = 10, filters = {} }) {
    // Apply filters if any
    let filteredProducts = [...products];
    
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase());
    }
    
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(p => 
        p.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => 
        p.price <= filters.maxPrice);
    }
    
    // Get total count
    const totalCount = filteredProducts.length;
    
    // Apply pagination
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);
    
    return {
      products: paginatedProducts,
      totalCount
    };
  },
  
  
  update(productId, updateData) {
    const productIndex = products.findIndex(p => p.product_id === productId);
    if (productIndex === -1) return null;
    
    // Update product
    products[productIndex] = {
      ...products[productIndex],
      ...updateData,
      updated_at: new Date()
    };
    
    return products[productIndex];
  },
  
  
  delete(productId) {
    const productIndex = products.findIndex(p => p.product_id === productId);
    if (productIndex === -1) return false;
    
    products.splice(productIndex, 1);
    return true;
  },
  
  
  search(query, { skip = 0, limit = 10 }) {
    if (!query) {
      return this.findAll({ skip, limit });
    }
    
    const searchQuery = query.toLowerCase();
    
    // Search in name, description, brand, category
    const searchResults = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.brand.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
    
    // Get total count
    const totalCount = searchResults.length;
    
    // Apply pagination
    const paginatedResults = searchResults.slice(skip, skip + limit);
    
    return {
      products: paginatedResults,
      totalCount
    };
  }
};

module.exports = ProductModel;