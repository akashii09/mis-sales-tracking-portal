const express = require("express");

const router = express.Router();

const achievementController = require("../controllers/achievementController");


// ADD
router.post(
    "/add",
    achievementController.addAchievement
);

// GET
router.get(
    "/all",
    achievementController.getAchievements
);

// UPDATE
router.put(
    "/update/:id",
    achievementController.updateAchievement
);

// DELETE
router.put(
    "/delete/:id",
    achievementController.deleteAchievement
);

// TARGET VS ACHIEVEMENT
router.get(
    "/compare",
    achievementController.compareTargetAchievement
);

module.exports = router;