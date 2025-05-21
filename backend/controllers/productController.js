const productService = require('../services/productService');

const createProduct = (req, res) => {
  try {
    const product = productService.createProduct(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllProducts = (req, res) => {
  try {
    const { products, totalCount } = productService.getAllProducts(req.query);
    res.status(200).json({ success: true, products, totalCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = (req, res) => {
  try {
    const product = productService.getProductById(req.params.id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateProduct = (req, res) => {
  try {
    const updatedProduct = productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    productService.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const searchProducts = (req, res) => {
  try {
    const { q } = req.query;
    const results = productService.searchProducts(q, req.query);
    res.status(200).json({ success: true, ...results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
};


