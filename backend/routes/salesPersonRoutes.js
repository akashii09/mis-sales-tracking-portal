const express = require('express');
const router = express.Router();

const salesPersonController = require('../controllers/salesPersonController');
/**
 * @swagger
 * tags:
 *   name: SalesPersons
 *   description: Sales person management APIs
 */
//add salesPerson
/**
 * @swagger
 * /api/salesperson/add:
 *   post:
 *     summary: Add new sales person
 *     tags: [SalesPersons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SP_Code
 *               - Name
 *               - Email
 *               - RegionID
 *             properties:
 *               SP_Code:
 *                 type: string
 *                 example: SP001
 *               Name:
 *                 type: string
 *                 example: Rahul Sharma
 *               Email:
 *                 type: string
 *                 example: rahul@example.com
 *               RegionID:
 *                 type: integer
 *                 example: 1
 *               ManagerID:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Sales person added successfully
 *       400:
 *         description: Validation error or duplicate entry
 */
//get all salesPerson
/**
 * @swagger
 * /api/salesperson:
 *   get:
 *     summary: Get all active sales persons
 *     tags: [SalesPersons]
 *     responses:
 *       200:
 *         description: List of sales persons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SP_ID:
 *                     type: integer
 *                   SP_Code:
 *                     type: string
 *                   Name:
 *                     type: string
 *                   Email:
 *                     type: string
 *                   RegionID:
 *                     type: integer
 *                   ManagerID:
 *                     type: integer
 */
//update
/**
 * @swagger
 * /api/salesperson/{id}:
 *   put:
 *     summary: Update sales person by ID
 *     tags: [SalesPersons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sales Person ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SP_Code
 *               - Name
 *               - Email
 *               - RegionID
 *             properties:
 *               SP_Code:
 *                 type: string
 *               Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               RegionID:
 *                 type: integer
 *               ManagerID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sales person updated successfully
 *       400:
 *         description: Validation error
 */
//delete 
/**
 * @swagger
 * /api/salesperson/{id}:
 *   delete:
 *     summary: Soft delete sales person
 *     tags: [SalesPersons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Sales Person ID
 *     responses:
 *       200:
 *         description: Sales person deleted successfully
 */

router.post('/add', salesPersonController.addSalesPerson);
router.get('/', salesPersonController.getSalesPersons);
router.put('/:id', salesPersonController.updateSalesPerson);
router.delete('/:id', salesPersonController.deleteSalesPerson);

module.exports = router;