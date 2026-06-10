const express = require("express");
console.log("DASHBOARD ROUTES FILE LOADED");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");

router.get(
    "/stats",
    verifyToken,
     dashboardController.getDashboardStats
);
router.get("/test", (req, res) => {
    res.json({ message: "Dashboard Route Working" });
});

router.get(
    "/recent-activity",
    verifyToken,
    dashboardController.getRecentActivity
);

router.get(
    "/kpi",
    verifyToken,
    dashboardController.getKPI
);
router.get(
    "/bar-chart",
    verifyToken,
    dashboardController.getBarChart
);
router.get(
    "/product-contribution",
    verifyToken,
    dashboardController.getProductContribution
);
router.get(
    "/trend",
    verifyToken,
    dashboardController.getTrend
);
router.get(
    "/top-performers",
    verifyToken,
    dashboardController.getTopPerformers
);
router.get(
    "/bottom-performers",
    verifyToken,
    dashboardController.getBottomPerformers
);
module.exports = router;
