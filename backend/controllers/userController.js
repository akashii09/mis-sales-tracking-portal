const db = require("../config/db");
const bcrypt = require("bcrypt");


// CREATE USER
exports.createUser = async (req, res) => {

    try {

        const {
            Username,
            Password,
            Role,
            Email
        } = req.body;

        // VALIDATION
        if (!Username || !Password || !Role || !Email) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(Password, 10);

        // INSERT
        await db.query(
            `INSERT INTO tbl_Users
            (Username, PasswordHash, Role, Email)
            VALUES (?, ?, ?, ?)`,
            [
                Username,
                hashedPassword,
                Role,
                Email
            ]
        );

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};



// GET USERS
exports.getUsers = async (req, res) => {

    try {

        const [users] = await db.query(
            `SELECT
                UserID,
                Username,
                Role,
                Email
             FROM tbl_Users
             WHERE IsActive = TRUE`
        );

        res.status(200).json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};



// UPDATE USER
exports.updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            Username,
            Role,
            Email
        } = req.body;

        await db.query(
            `UPDATE tbl_Users
             SET
             Username = ?,
             Role = ?,
             Email = ?
             WHERE UserID = ?`,
            [
                Username,
                Role,
                Email,
                id
            ]
        );

        res.status(200).json({
            message: "User updated successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};



// SOFT DELETE
exports.deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `UPDATE tbl_Users
             SET IsActive = FALSE
             WHERE UserID = ?`,
            [id]
        );

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};