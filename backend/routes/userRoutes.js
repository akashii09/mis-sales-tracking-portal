const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");


// CREATE
router.post(
    "/add",
    userController.createUser
);

// GET
router.get(
    "/all",
    userController.getUsers
);

// UPDATE
router.put(
    "/update/:id",
    userController.updateUser
);

// DELETE
router.put(
    "/delete/:id",
    userController.deleteUser
);

module.exports = router;