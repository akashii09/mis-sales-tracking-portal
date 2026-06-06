const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/stats",
    verifyToken,
    dashboardController.getDashboardStats
);

module.exports = router;

router.get(
    "/recent-activity",
    verifyToken,
    dashboardController.getRecentActivity
);

router.get(
    "/kpi",
    dashboardController.getKPI
);
router.get(
    "/bar-chart",
    dashboardController.getBarChart
);
router.get(
    "/product-contribution",
    dashboardController.getProductContribution
);
router.get(
    "/trend",
    dashboardController.getTrend
);
router.get(
    "/top-performers",
    dashboardController.getTopPerformers
);
router.get(
    "/bottom-performers",
    dashboardController.getBottomPerformers
);
