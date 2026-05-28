const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// LOGIN
router.post(
    "/login",
    authController.login
);

// FORGOT PASSWORD
router.post(
    "/forgot-password",
    authController.forgotPassword
);
// RESET PASSWORD
router.post(
    "/reset-password",
    authController.resetPassword
);

module.exports = router;