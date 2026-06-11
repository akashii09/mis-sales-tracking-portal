const express = require("express");
const router = express.Router();

const targetController = require("../controllers/targetController");
/**
 * @swagger
 * tags:
 *   name: Targets
 *   description: Target management APIs (monthly/weekly/daily business targets)
 */
//add target
/**
 * @swagger
 * /api/target/add:
 *   post:
 *     summary: Add new target for sales person and product
 *     tags: [Targets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SP_ID
 *               - ProductID
 *               - MonthYear
 *               - TargetQty
 *               - TargetValue
 *             properties:
 *               SP_ID:
 *                 type: integer
 *                 example: 1
 *               ProductID:
 *                 type: integer
 *                 example: 2
 *               MonthYear:
 *                 type: string
 *                 example: 2026-06
 *               TargetQty:
 *                 type: number
 *                 example: 1000
 *               TargetValue:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Target created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 monthlyTargetQty:
 *                   type: number
 *                 weeklyTargetQty:
 *                   type: number
 *                 dailyTargetQty:
 *                   type: number
 *       400:
 *         description: Validation error or duplicate target
 */
//get all targets
/**
 * @swagger
 * /api/target:
 *   get:
 *     summary: Get all active targets with sales person and product details
 *     tags: [Targets]
 *     responses:
 *       200:
 *         description: List of targets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TargetID:
 *                     type: integer
 *                   MonthYear:
 *                     type: string
 *                   TargetQty:
 *                     type: number
 *                   TargetValue:
 *                     type: number
 *                   SalesPersonName:
 *                     type: string
 *                   SP_Code:
 *                     type: string
 *                   ProductName:
 *                     type: string
 *                   ProductCode:
 *                     type: string
 */

//update target
/**
 * @swagger
 * /api/target/{id}:
 *   put:
 *     summary: Update target by ID
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Target ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TargetQty
 *               - TargetValue
 *             properties:
 *               TargetQty:
 *                 type: number
 *                 example: 1200
 *               TargetValue:
 *                 type: number
 *                 example: 60000
 *     responses:
 *       200:
 *         description: Target updated successfully
 *       400:
 *         description: Validation error
 */
//delete target
/**
 * @swagger
 * /api/target/{id}:
 *   delete:
 *     summary: Soft delete target
 *     tags: [Targets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Target ID
 *     responses:
 *       200:
 *         description: Target deleted successfully
 */
router.post("/add", targetController.addTarget);
router.get("/", targetController.getTargets);
router.put("/:id", targetController.updateTarget);
router.delete("/:id", targetController.deleteTarget);

module.exports = router;