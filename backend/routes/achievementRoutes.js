const authMiddleware = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");
const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievementController");

router.post(
    "/add",
    authMiddleware,
    checkRole("Admin", "Manager", "Sales Executive"),
    achievementController.addAchievement
);

router.get(
    "/all",
    authMiddleware,
    checkRole("Admin", "Manager", "Viewer"),
    achievementController.getAchievements
);

router.put(
    "/update/:id",
    authMiddleware,
    checkRole("Admin", "Manager", "Sales Executive"),
    achievementController.updateAchievement
);

router.put(
    "/delete/:id",
    authMiddleware,
    checkRole("Admin"),
    achievementController.deleteAchievement
);

router.get(
    "/compare",
    authMiddleware,
    checkRole("Admin", "Manager"),
    achievementController.compareTargetAchievement
);
