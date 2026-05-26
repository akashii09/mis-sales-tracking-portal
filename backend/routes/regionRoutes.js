const express = require("express");
const router = express.Router();

const regionController = require("../controllers/regionController");

// Debug middleware (temporary)
router.use((req, res, next) => {
  console.log("ROUTE HIT:", req.method, req.url);
  console.log("BODY:", req.body);
  next();
});

// Add region
router.post("/add", regionController.addRegion);

// Get all active regions
router.get("/", regionController.getRegions);

// Update region
router.put("/:id", regionController.updateRegion);

// Soft delete region
router.delete("/:id", regionController.deleteRegion);

module.exports = router;