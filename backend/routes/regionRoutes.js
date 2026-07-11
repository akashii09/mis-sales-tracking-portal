const express = require("express");
const router = express.Router();

const regionController = require("../controllers/regionController");

// Add Region
router.post("/add", regionController.addRegion);

// Get All Regions
router.get("/", regionController.getRegions);

// Update Region
router.put("/:id", regionController.updateRegion);

// Soft Delete Region
router.delete("/:id", regionController.deleteRegion);


module.exports = router;