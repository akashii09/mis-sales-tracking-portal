const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

// Add product route
router.post('/add', productController.addProduct);

module.exports = router;
