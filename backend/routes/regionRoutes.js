const express = require("express");
const router = express.Router();

const db = require("../config/db");

// ADD REGION
router.post("/add", (req, res) => {

    const { region_name } = req.body;

    const sql = "INSERT INTO tbl_region (region_name) VALUES (?)";

    db.query(sql, [region_name], (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Database error", err });
        }

        res.json({ message: "Region added successfully" });
    });
});


// GET ALL REGIONS
router.get("/all", (req, res) => {

    const sql = "SELECT * FROM tbl_region";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Database error", err });
        }

        res.json(results);
    });
});

module.exports = router;