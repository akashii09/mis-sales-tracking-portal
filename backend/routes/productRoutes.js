const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

// Add product
router.post('/add', productController.addProduct);

// Get products
router.get('/', productController.getProducts);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product (soft delete)
router.delete('/:id', productController.deleteProduct);

module.exports = router;