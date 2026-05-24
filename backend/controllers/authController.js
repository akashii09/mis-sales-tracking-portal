const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// LOGIN CONTROLLER
const login = (req, res) => {

    // VALIDATION CHECK (NEW ADDITION)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    const sql = "SELECT * FROM tbl_Users WHERE Email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        // PASSWORD CHECK
        const isMatch = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password"
            });
        }

        // JWT TOKEN GENERATION
        const token = jwt.sign(
            {
                id: user.UserID,
                role: user.Role
            },
            "secretkey",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    });
};

module.exports = { login };