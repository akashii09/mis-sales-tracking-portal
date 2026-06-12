const express = require("express");
const router = express.Router();

const regionController = require("../controllers/regionController");


/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Region management APIs (geo hierarchy - Zone, State, City)
 */

// Add region
router.post("/add", regionController.addRegion);
/**
 * @swagger
 * /api/region/add:
 *   post:
 *     summary: Add new region
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - RegionName
 *               - Zone
 *               - State
 *               - City
 *             properties:
 *               RegionName:
 *                 type: string
 *                 example: North Region
 *               Zone:
 *                 type: string
 *                 example: North Zone
 *               State:
 *                 type: string
 *                 example: Uttar Pradesh
 *               City:
 *                 type: string
 *                 example: Ayodhya
 *     responses:
 *       201:
 *         description: Region added successfully
 *       400:
 *         description: Validation error or duplicate region
 */

// Get all active regions
router.get("/", regionController.getRegions);
/**
 * @swagger
 * /api/region:
 *   get:
 *     summary: Get all active regions
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: List of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   RegionID:
 *                     type: integer
 *                   RegionName:
 *                     type: string
 *                   Zone:
 *                     type: string
 *                   State:
 *                     type: string
 *                   City:
 *                     type: string
 */

// Update region
router.put("/:id", regionController.updateRegion);
/**
 * @swagger
 * /api/region/{id}:
 *   put:
 *     summary: Update region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - RegionName
 *               - Zone
 *               - State
 *               - City
 *             properties:
 *               RegionName:
 *                 type: string
 *               Zone:
 *                 type: string
 *               State:
 *                 type: string
 *               City:
 *                 type: string
 *     responses:
 *       200:
 *         description: Region updated successfully
 *       400:
 *         description: Validation error
 */

// Soft delete region
router.delete("/:id", regionController.deleteRegion);
/**
 * @swagger
 * /api/region/{id}:
 *   delete:
 *     summary: Soft delete region
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 */

module.exports = router;