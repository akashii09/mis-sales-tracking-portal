const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

// LOGIN
router.post(
    "/login",
    authController.login
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@misportal.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
// FORGOT PASSWORD
router.post(
    "/forgot-password",
    authController.forgotPassword
);
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password verification
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@misportal.com
 *     responses:
 *       200:
 *         description: Email verified
 */
// RESET PASSWORD
router.post(
    "/reset-password",
    authController.resetPassword
);
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               NewPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
module.exports = router;