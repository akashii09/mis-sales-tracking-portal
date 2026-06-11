const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */
// Add product
router.post('/add', productController.addProduct);
/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProductCode
 *               - Name
 *               - Category
 *               - Unit
 *             properties:
 *               ProductCode:
 *                 type: string
 *                 example: P001
 *               Name:
 *                 type: string
 *                 example: Coca Cola 500ml
 *               Category:
 *                 type: string
 *                 example: Soft Drink
 *               Unit:
 *                 type: string
 *                 example: Bottle
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation error / duplicate product
 */
// Get products
router.get('/', productController.getProducts);
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all active products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProductID:
 *                     type: integer
 *                   ProductCode:
 *                     type: string
 *                   Name:
 *                     type: string
 *                   Category:
 *                     type: string
 *                   Unit:
 *                     type: string
 */
// Update product
router.put('/:id', productController.updateProduct);
/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ProductCode
 *               - Name
 *               - Category
 *               - Unit
 *             properties:
 *               ProductCode:
 *                 type: string
 *               Name:
 *                 type: string
 *               Category:
 *                 type: string
 *               Unit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
// Delete product (soft delete)
router.delete('/:id', productController.deleteProduct);
/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Soft delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
module.exports = router;