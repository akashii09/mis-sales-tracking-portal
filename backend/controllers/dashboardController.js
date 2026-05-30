const db = require("../config/db");

exports.getDashboardStats = async (req, res) => {

    try {

        const [users] = await db.query(
            `SELECT COUNT(*) AS totalUsers
             FROM tbl_Users
             WHERE IsActive = TRUE`
        );

        const [products] = await db.query(
            `SELECT COUNT(*) AS totalProducts
             FROM tbl_Product
             WHERE IsActive = TRUE`
        );

        const [salesPersons] = await db.query(
            `SELECT COUNT(*) AS totalSalesPersons
             FROM tbl_SalesPerson
             WHERE IsActive = TRUE`
        );

        const [targets] = await db.query(
            `SELECT COUNT(*) AS totalTargets
             FROM tbl_Target
             WHERE IsActive = TRUE`
        );

        const [achievements] = await db.query(
            `SELECT COUNT(*) AS totalAchievements
             FROM tbl_Achievement
             WHERE IsActive = TRUE`
        );

        return res.status(200).json({

            totalUsers: users[0].totalUsers,

            totalProducts: products[0].totalProducts,

            totalSalesPersons:
                salesPersons[0].totalSalesPersons,

            totalTargets:
                targets[0].totalTargets,

            totalAchievements:
                achievements[0].totalAchievements
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
exports.getRecentActivity = async (req, res) => {

    try {

        const [logs] = await db.query(
            `SELECT *
             FROM tbl_AuditLog
             ORDER BY Timestamp DESC
             LIMIT 5`
        );

        return res.status(200).json(logs);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};