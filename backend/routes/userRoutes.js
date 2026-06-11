const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

// CREATE
router.post(
    "/add",
    userController.createUser
);
/**
 * @swagger
 * /api/users/add:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Password
 *               - Role
 *               - Email
 *             properties:
 *               Username:
 *                 type: string
 *                 example: john_doe
 *               Password:
 *                 type: string
 *                 example: 123456
 *               Role:
 *                 type: string
 *                 example: Manager
 *               Email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error / Email already exists
 */
// GET
router.get(
    "/all",
    userController.getUsers
);
/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all active users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                   Username:
 *                     type: string
 *                   Role:
 *                     type: string
 *                   Email:
 *                     type: string
 */
// UPDATE
router.put(
    "/update/:id",
    userController.updateUser
);
/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               Role:
 *                 type: string
 *               Email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
// DELETE
router.put(
    "/delete/:id",
    userController.deleteUser
);
/**
 * @swagger
 * /api/users/delete/{id}:
 *   put:
 *     summary: Soft delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
module.exports = router;