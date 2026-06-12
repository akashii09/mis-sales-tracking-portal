const express = require("express");  

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: MIS reporting APIs (business reports, analytics, variance, achievement reports)
 */

router.get("/hello", (req,res) => {
    res.send("HELLO REPORT");
});
router.get("/test", (req, res) => {
    res.json({
        message: "Report Route Working"
    });
});

const reportController = require("../controllers/reportController");

const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/achievement-report",
    reportController.getAchievementReport);
/**
 * @swagger
 * /api/reports/achievement-report:
 *   get:
 *     summary: Get achievement vs target report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Achievement report data
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
 *                   AchQty:
 *                     type: number
 *                   TargetValue:
 *                     type: number
 *                   AchValue:
 *                     type: number
 */
router.get(
    "/variance-report",
    reportController.getVarianceReport
);
/**
 * @swagger
 * /api/reports/variance-report:
 *   get:
 *     summary: Get variance report (target vs achievement gap)
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Variance report data
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
 *                   Variance:
 *                     type: number
 */
module.exports = router;