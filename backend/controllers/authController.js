const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// LOGIN CONTROLLER
exports.login = (req, res) => {

    const { Email, Password } = req.body;

    // VALIDATION
    if (!Email || !Password) {

        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    // FIND USER
    db.query(
        `SELECT * FROM tbl_Users WHERE Email = ?`,
        [Email],
        async (err, result) => {

            // DB ERROR
            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Server Error"
                });
            }

            // USER NOT FOUND
            if (result.length === 0) {

                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            try {

                // PASSWORD CHECK
                const isMatch = await bcrypt.compare(
                    Password,
                    user.PasswordHash
                );

                // INVALID PASSWORD
                if (!isMatch) {

                    return res.status(401).json({
                        message: "Invalid password"
                    });
                }

                // JWT TOKEN
                const token = jwt.sign(
                    {
                        UserID: user.UserID,
                        Role: user.Role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30m"
                    }
                );

                // SUCCESS RESPONSE
                return res.status(200).json({
                    message: "Login successful",
                    token
                });

            } catch (compareError) {

                console.log(compareError);

                return res.status(500).json({
                    message: "Password compare failed"
                });
            }
        }
    );
};



// FORGOT PASSWORD
exports.forgotPassword = (req, res) => {

    const { Email } = req.body;

    if (!Email) {

        return res.status(400).json({
            message: "Email is required"
        });
    }

    db.query(
        `SELECT * FROM tbl_Users WHERE Email = ?`,
        [Email],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Server Error"
                });
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "Email not found"
                });
            }

            return res.status(200).json({
                message: "User verified. Reset password allowed."
            });
        }
    );
};



// RESET PASSWORD
exports.resetPassword = async (req, res) => {

    const { Email, NewPassword } = req.body;

    if (!Email || !NewPassword) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(
            NewPassword,
            10
        );

        db.query(
            `UPDATE tbl_Users
             SET PasswordHash = ?
             WHERE Email = ?`,
            [hashedPassword, Email],
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Server Error"
                    });
                }

                return res.status(200).json({
                    message: "Password reset successfully"
                });
            }
        );

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Password reset failed"
        });
    }
};