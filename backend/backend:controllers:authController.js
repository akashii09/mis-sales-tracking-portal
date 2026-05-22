const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = result[0];

    if (password !== user.password) {
      return res.status(400).send("Wrong password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  });
};

module.exports = { login };