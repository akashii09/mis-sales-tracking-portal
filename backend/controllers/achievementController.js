const db = require("../config/db");


// ADDing ACHIEVEMENT
exports.addAchievement = async (req, res) => {
    try {

        const {
            SP_ID,
            ProductID,
            SaleDate,
            AchQty,
            AchValue,
            CustomerName,
            Remarks
        } = req.body;

        // REQUIRED FIELD VALIDATION
        if (!SP_ID || !ProductID || !SaleDate || !AchQty || !AchValue) {
            return res.status(400).json({
                message: "All required fields must be filled"
            });
        }

        // NEGATIVE VALUE VALIDATION
        if (AchQty < 0 || AchValue < 0) {
            return res.status(400).json({
                message: "Quantity and Value cannot be negative"
            });
        }

        // DUPLICATE CHECK
        const [existing] = await db.query(
            `SELECT * FROM tbl_Achievement
             WHERE SP_ID = ?
             AND ProductID = ?
             AND SaleDate = ?
             AND IsActive = TRUE`,
            [SP_ID, ProductID, SaleDate]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Duplicate entry not allowed for same product on same date"
            });
        }

        // INSERT QUERY
        await db.query(
            `INSERT INTO tbl_Achievement
            (SP_ID, ProductID, SaleDate, AchQty, AchValue, CustomerName, Remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                SP_ID,
                ProductID,
                SaleDate,
                AchQty,
                AchValue,
                CustomerName,
                Remarks
            ]
        );

        return res.status(201).json({
            message: "Achievement added successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
// GET ALL ACHIEVEMENTS
exports.getAchievements = async (req, res) => {

    try {
        const [data] = await db.query(
            `SELECT
                a.AchID,
                s.Name AS SalesPerson,
                p.Name AS Product,
                a.SaleDate,
                a.AchQty,
                a.AchValue,
                a.CustomerName,
                a.Remarks
            FROM tbl_Achievement a
            JOIN tbl_SalesPerson s
            ON a.SP_ID = s.SP_ID
            JOIN tbl_Product p
            ON a.ProductID = p.ProductID
            WHERE a.IsActive = TRUE`
        );

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
};
// UPDATE ACHIEVEMENT
exports.updateAchievement = async (req, res) => {

    try {

        const { id } = req.params;

        // FIND RECORD
        const [existing] = await db.query(
            `SELECT SaleDate FROM tbl_Achievement
             WHERE AchID = ?`,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: "Achievement record not found"
            });
        }

        // CURRENT DATE
        const today = new Date().toISOString().split("T")[0];

        // DB DATE
        const saleDate = new Date(existing[0].SaleDate)
            .toISOString()
            .split("T")[0];

        // CHECK DATE
        if (saleDate !== today) {
            return res.status(403).json({
                message: "Only current date entries can be updated"
            });
        }

        const {
            AchQty,
            AchValue,
            CustomerName,
            Remarks
        } = req.body;

        await db.query(
            `UPDATE tbl_Achievement
             SET
             AchQty = ?,
             AchValue = ?,
             CustomerName = ?,
             Remarks = ?
             WHERE AchID = ?`,
            [
                AchQty,
                AchValue,
                CustomerName,
                Remarks,
                id
            ]
        );

        return res.status(200).json({
            message: "Achievement updated successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
};

// SOFT DELETE
exports.deleteAchievement = async (req, res) => {

    try {

        const { id } = req.params;

        // FIND RECORD
        const [existing] = await db.query(
            `SELECT SaleDate FROM tbl_Achievement
             WHERE AchID = ?`,
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: "Achievement record not found"
            });
        }

        // TODAY DATE
        const today = new Date().toISOString().split("T")[0];

        // SALE DATE
        const saleDate = new Date(existing[0].SaleDate)
            .toISOString()
            .split("T")[0];

        // CHECK
        if (saleDate !== today) {
            return res.status(403).json({
                message: "Only current date entries can be deleted"
            });
        }

        // SOFT DELETE
        await db.query(
            `UPDATE tbl_Achievement
             SET IsActive = FALSE
             WHERE AchID = ?`,
            [id]
        );

        return res.status(200).json({
            message: "Achievement deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
};

// TARGET VS ACHIEVEMENT
exports.compareTargetAchievement = async (req, res) => {

    try {

        const [data] = await db.query(
            `SELECT
                s.Name AS SalesPerson,
                p.Name AS Product,
                t.TargetQty,
                IFNULL(SUM(a.AchQty), 0) AS AchievementQty,
                (t.TargetQty - IFNULL(SUM(a.AchQty), 0)) AS RemainingTarget
            FROM tbl_Target t

            JOIN tbl_SalesPerson s
            ON t.SP_ID = s.SP_ID

            JOIN tbl_Product p
            ON t.ProductID = p.ProductID

            LEFT JOIN tbl_Achievement a
            ON t.SP_ID = a.SP_ID
            AND t.ProductID = a.ProductID
            AND a.IsActive = TRUE

            WHERE t.IsActive = TRUE

            GROUP BY
            s.Name,
            p.Name,
            t.TargetQty`
        );

       return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }
};