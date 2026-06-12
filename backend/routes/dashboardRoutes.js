const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: MIS dashboard analytics APIs (KPIs, charts, performance stats)
 */

router.get(
    "/stats",
    verifyToken,
     dashboardController.getDashboardStats
);
/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get overall dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard summary stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
 *                 totalSalesPersons:
 *                   type: integer
 *                 totalTargets:
 *                   type: integer
 *                 totalAchievements:
 *                   type: integer
 */
router.get("/test", (req, res) => {
    res.json({ message: "Dashboard Route Working" });
});

router.get(
    "/recent-activity",
    verifyToken,
    dashboardController.getRecentActivity
);
/**
 * @swagger
 * /api/dashboard/recent-activity:
 *   get:
 *     summary: Get recent system activity logs
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Recent activity list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get(
    "/kpi",
    verifyToken,
    dashboardController.getKPI
);
/**
 * @swagger
 * /api/dashboard/kpi:
 *   get:
 *     summary: Get KPI (achievement vs target percentage)
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: view
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *         description: Time filter for KPI calculation
 *     responses:
 *       200:
 *         description: KPI data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 view:
 *                   type: string
 *                 achievement:
 *                   type: number
 *                 target:
 *                   type: number
 *                 achievementPercent:
 *                   type: number
 */
router.get(
    "/bar-chart",
    verifyToken,
    dashboardController.getBarChart
);
/**
 * @swagger
 * /api/dashboard/bar-chart:
 *   get:
 *     summary: Get bar chart data (target vs achievement trend)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Bar chart dataset
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   target:
 *                     type: number
 *                   achievement:
 *                     type: number
 */
router.get(
    "/product-contribution",
    verifyToken,
    dashboardController.getProductContribution
);
/**
 * @swagger
 * /api/dashboard/product-contribution:
 *   get:
 *     summary: Get product-wise sales contribution (pie chart)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Product contribution data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   totalSales:
 *                     type: number
 */
router.get(
    "/trend",
    verifyToken,
    dashboardController.getTrend
);
/**
 * @swagger
 * /api/dashboard/trend:
 *   get:
 *     summary: Get 30-day sales trend (line chart)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Trend data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   saleDate:
 *                     type: string
 *                   totalSales:
 *                     type: number
 */
router.get(
    "/top-performers",
    verifyToken,
    dashboardController.getTopPerformers
);
/**
 * @swagger
 * /api/dashboard/top-performers:
 *   get:
 *     summary: Get top 5 performing sales persons
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Top performers list
 */
router.get(
    "/bottom-performers",
    verifyToken,
    dashboardController.getBottomPerformers
);
/**
 * @swagger
 * /api/dashboard/bottom-performers:
 *   get:
 *     summary: Get bottom 5 performing sales persons
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Bottom performers list
 */
module.exports = router;
