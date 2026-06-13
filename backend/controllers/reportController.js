const db = require("../config/db");

exports.getAchievementReport = async (req, res) => {

    try {

        const [report] = await db.query(
            `SELECT
                s.Name AS SalesPerson,
                p.Name AS Product,
                t.TargetQty,
                a.AchQty,
                t.TargetValue,
                a.AchValue
            FROM tbl_Target t

            JOIN tbl_SalesPerson s
            ON t.SP_ID = s.SP_ID

            JOIN tbl_Product p
            ON t.ProductID = p.ProductID

            LEFT JOIN tbl_Achievement a
            ON t.SP_ID = a.SP_ID
            AND t.ProductID = a.ProductID`
        );

        return res.status(200).json(report);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
exports.getVarianceReport = async (req, res) => {

    try {

        const [report] = await db.query(`
            SELECT
                s.Name AS SalesPerson,
                p.Name AS Product,

                t.TargetQty,

                IFNULL(SUM(a.AchQty),0)
                AS AchievementQty,

                (
                    t.TargetQty -
                    IFNULL(SUM(a.AchQty),0)
                ) AS Variance

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
                t.TargetQty

            ORDER BY Variance DESC
        `);

        return res.status(200).json(report);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};