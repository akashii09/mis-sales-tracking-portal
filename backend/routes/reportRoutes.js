const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const verifyToken = require("../middleware/authMiddleware");

router.get(
    "/achievement-report",
    verifyToken,
    reportController.getAchievementReport
);

module.exports = router;