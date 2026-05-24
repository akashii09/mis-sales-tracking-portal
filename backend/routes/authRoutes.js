const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");

// middleware import
const verifyToken = require("../middleware/authMiddleware");

// login route
router.post("/login", login);

// protected route
router.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "Protected route working",
        user: req.user
    });
});

// logout route
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

module.exports = router;