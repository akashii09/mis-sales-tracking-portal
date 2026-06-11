const authMiddleware = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");
const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievementController");
/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Sales achievement tracking APIs (core MIS performance module)
 */
router.post(
    "/add",
    authMiddleware,
    checkRole("Admin", "Manager", "Sales Executive"),
    achievementController.addAchievement
);
/**
 * @swagger
 * /api/achievement/add:
 *   post:
 *     summary: Add sales achievement entry
 *     tags: [Achievements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SP_ID
 *               - ProductID
 *               - SaleDate
 *               - AchQty
 *               - AchValue
 *             properties:
 *               SP_ID:
 *                 type: integer
 *                 example: 1
 *               ProductID:
 *                 type: integer
 *                 example: 2
 *               SaleDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-11
 *               AchQty:
 *                 type: number
 *                 example: 50
 *               AchValue:
 *                 type: number
 *                 example: 2500
 *               CustomerName:
 *                 type: string
 *                 example: ABC Store
 *               Remarks:
 *                 type: string
 *                 example: Bulk order
 *     responses:
 *       201:
 *         description: Achievement added successfully
 *       400:
 *         description: Validation error / duplicate entry
 */
router.get(
    "/all",
    authMiddleware,
    checkRole("Admin", "Manager", "Viewer"),
    achievementController.getAchievements
);
/**
 * @swagger
 * /api/achievement/all:
 *   get:
 *     summary: Get all achievements
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: List of achievements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   AchID:
 *                     type: integer
 *                   SalesPerson:
 *                     type: string
 *                   Product:
 *                     type: string
 *                   SaleDate:
 *                     type: string
 *                   AchQty:
 *                     type: number
 *                   AchValue:
 *                     type: number
 *                   CustomerName:
 *                     type: string
 *                   Remarks:
 *                     type: string
 */
router.put(
    "/update/:id",
    authMiddleware,
    checkRole("Admin", "Manager", "Sales Executive"),
    achievementController.updateAchievement
);
/**
 * @swagger
 * /api/achievement/update/{id}:
 *   put:
 *     summary: Update achievement (only same-day updates allowed)
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Achievement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AchQty:
 *                 type: number
 *               AchValue:
 *                 type: number
 *               CustomerName:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Achievement updated successfully
 *       403:
 *         description: Only same-day updates allowed
 *       404:
 *         description: Record not found
 */
router.put(
    "/delete/:id",
    authMiddleware,
    checkRole("Admin"),
    achievementController.deleteAchievement
);
/**
 * @swagger
 * /api/achievement/delete/{id}:
 *   put:
 *     summary: Soft delete achievement (only same-day allowed)
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Achievement ID
 *     responses:
 *       200:
 *         description: Achievement deleted successfully
 *       403:
 *         description: Only same-day deletion allowed
 */
router.get(
    "/compare",
    authMiddleware,
    checkRole("Admin", "Manager"),
    achievementController.compareTargetAchievement
);
/**
 * @swagger
 * /api/achievement/compare:
 *   get:
 *     summary: Compare target vs achievement performance
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: Comparison report generated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SalesPerson:
 *                     type: string
 *                   Product:
 *                     type: string
 *                   TargetQty:
 *                     type: number
 *                   AchievementQty:
 *                     type: number
 *                   RemainingTarget:
 *                     type: number
 */
module.exports = router;