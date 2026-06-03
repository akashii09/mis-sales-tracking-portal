const db = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");



// LOGIN CONTROLLER
exports.login = async (req, res) => {

    console.log("LOGIN API HIT");
    console.log("BODY =", req.body);

    try {

        const { email, password } = req.body;

        console.log("Email =", email);
        console.log("PasswordHash =", password);

            if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        const [result] = await db.query(
            "SELECT * FROM tbl_Users WHERE Email = ?",
            [email]
        );

        console.log("QUERY COMPLETED");

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        console.log("USER FOUND =", user.Email);

        const isMatch = await bcrypt.compare(
            password,
            user.PasswordHash
        );

        console.log("PASSWORD MATCH =", isMatch);

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


/*
exports.login = async (req, res) => {

    console.log("LOGIN CONTROLLER HIT");

    return res.status(200).json({
        message: "LOGIN TEST SUCCESS"
    });

};
*/
// FORGOT PASSWORD
exports.forgotPassword = (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    db.query(
        "SELECT * FROM tbl_Users WHERE Email = ?",
        [email],
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