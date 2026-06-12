const db = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");



// LOGIN CONTROLLER
exports.login = async (req, res) => {
     try {

        const { email, password } = req.body;
             if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        const [result] = await db.query(
            "SELECT * FROM tbl_Users WHERE Email = ?",
            [email]
        );
        
        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        
        const isMatch = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                UserID: user.UserID,
                Role: user.Role
            },
            process.env.JWT_SECRET || "secretkey",
            {
                expiresIn: "30m"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
    console.error("LOGIN ERROR FULL =", error);
    console.error("MESSAGE =", error.message);
    console.error("STACK =", error.stack);

    return res.status(500).json({
        message: error.message
    });
 }
};



// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const [result] = await db.query(
            "SELECT * FROM tbl_Users WHERE Email = ?",
            [email]
        );

        if (result.length === 0) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        return res.status(200).json({
            message: "User verified. Reset password allowed."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });

    }

};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {

    try {

        const { Email, NewPassword } = req.body;

        if (!Email || !NewPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(
            NewPassword,
            10
        );

        await db.query(
            `UPDATE tbl_Users
             SET PasswordHash = ?
             WHERE Email = ?`,
            [hashedPassword, Email]
        );

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });

    }

};