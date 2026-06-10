const express = require("express");
console.log("REPORT ROUTES FILE LOADED");   

const router = express.Router();

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

router.get(
    "/variance-report",
    reportController.getVarianceReport
);

module.exports = router;