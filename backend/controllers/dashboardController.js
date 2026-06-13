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

        console.error(error);

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

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
exports.getKPI = async (req, res) => {
const view =req.query.view || "month";
   try {
      
      let achievementQuery = "";
      let targetQuery = "";
      if(view === "day"){

        achievementQuery = `
        SELECT IFNULL(SUM(AchQty),0)
        AS achievement
        FROM tbl_Achievement
        WHERE SaleDate = CURDATE()
        AND IsActive = TRUE
        `;

        targetQuery = `
        SELECT IFNULL(SUM(TargetQty),0)
        AS target
        FROM tbl_Target
        WHERE MONTH(MonthYear)=MONTH(CURDATE())
        AND YEAR(MonthYear)=YEAR(CURDATE())
        AND IsActive = TRUE
        `;
    }
     if(view === "week"){

       achievementQuery = `
       SELECT IFNULL(SUM(AchQty),0)
       AS achievement
       FROM tbl_Achievement
       WHERE YEARWEEK(SaleDate,1)
       =
       YEARWEEK(CURDATE(),1)
       AND IsActive = TRUE
       `;

       targetQuery = `
       SELECT IFNULL(SUM(TargetQty),0)
       AS target
       FROM tbl_Target
       WHERE MONTH(MonthYear)=MONTH(CURDATE())
       AND YEAR(MonthYear)=YEAR(CURDATE())
       AND IsActive = TRUE
       `;
    }
      if(view === "month"){

       achievementQuery = `
       SELECT IFNULL(SUM(AchQty),0)
       AS achievement
       FROM tbl_Achievement
       WHERE MONTH(SaleDate)=MONTH(CURDATE())
       AND YEAR(SaleDate)=YEAR(CURDATE())
       AND IsActive = TRUE
       `;

       targetQuery = `
       SELECT IFNULL(SUM(TargetQty),0)
       AS target
       FROM tbl_Target
       WHERE MONTH(MonthYear)=MONTH(CURDATE())
       AND YEAR(MonthYear)=YEAR(CURDATE())
       AND IsActive = TRUE
       `;

    } 
    const [achData] = await db.query(achievementQuery);

    const [targetData] = await db.query(targetQuery);

      const achievementPercent =
      targetData[0].target > 0
      ? ((achData[0].achievement /
      targetData[0].target) * 100).toFixed(2)
      : 0;

      return res.status(200).json({

         view,

         achievement:
         achData[0].achievement,

         target:
         targetData[0].target,

         achievementPercent
      });

   } catch(error){
      console.error(error);
      res.status(500).json({
         message:"Server Error"
      });
   }
};
exports.getBarChart = async (req, res) => {
    try {

        const [data] = await db.query(`
            SELECT
                DATE(a.SaleDate) AS date,
                SUM(t.TargetQty) AS target,
                SUM(a.AchQty) AS achievement
            FROM tbl_Achievement a
            LEFT JOIN tbl_Target t
                ON DATE(a.SaleDate) = DATE(t.CreatedAt)
            GROUP BY DATE(a.SaleDate)
            ORDER BY DATE(a.SaleDate) DESC
            LIMIT 7
        `);

        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

//PIE-CHART
exports.getProductContribution = async (req, res) => {

    try {

        const [data] = await db.query(`
            SELECT
                p.Name,
                SUM(a.AchQty) AS totalSales
            FROM tbl_Achievement a
            JOIN tbl_Product p
                ON a.ProductID = p.ProductID
            WHERE a.IsActive = TRUE
            GROUP BY p.ProductID, p.Name
            ORDER BY totalSales DESC
        `);

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
//LINE CHART
exports.getTrend = async (req, res) => {

    try {

        const [data] = await db.query(`
            SELECT
                DATE(SaleDate) AS saleDate,
                SUM(AchQty) AS totalSales
            FROM tbl_Achievement
            WHERE SaleDate >= CURDATE() - INTERVAL 30 DAY
              AND IsActive = TRUE
            GROUP BY DATE(SaleDate)
            ORDER BY saleDate
        `);

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
//TOP PERFORMERS
exports.getTopPerformers = async (req, res) => {

    try {

        const [data] = await db.query(`
            SELECT
                s.Name,
                SUM(a.AchQty) AS totalSales
            FROM tbl_Achievement a
            JOIN tbl_SalesPerson s
                ON a.SP_ID = s.SP_ID
            WHERE a.IsActive = TRUE
            GROUP BY s.SP_ID, s.Name
            ORDER BY totalSales DESC
            LIMIT 5
        `);

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
//BOTTOM PERFORMERS
exports.getBottomPerformers = async (req, res) => {

    try {

        const [data] = await db.query(`
            SELECT
                s.Name,
                SUM(a.AchQty) AS totalSales
            FROM tbl_Achievement a
            JOIN tbl_SalesPerson s
                ON a.SP_ID = s.SP_ID
            WHERE a.IsActive = TRUE
            GROUP BY s.SP_ID, s.Name
            ORDER BY totalSales ASC
            LIMIT 5
        `);

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};
