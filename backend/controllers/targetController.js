const db = require('../config/db');


// ADD TARGET
exports.addTarget = (req, res) => {
  console.log("ADD TARGET API HIT");

  try {

    const { SP_ID, ProductID, MonthYear, TargetQty, TargetValue } = req.body;

    // MONTHLY SPLIT LOGIC
    const weeklyTargetQty = TargetQty / 4;
    const dailyTargetQty = TargetQty / 30;

    const weeklyTargetValue = TargetValue / 4;
    const dailyTargetValue = TargetValue / 30;

    if (!SP_ID || !ProductID || !MonthYear || !TargetQty || !TargetValue) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // DATE FIX (YYYY-MM → YYYY-MM-01)
    const formattedMonth = MonthYear.length === 7
      ? MonthYear + "-01"
      : MonthYear;

    // DUPLICATE CHECK
    const checkSql = `
      SELECT * FROM tbl_Target
      WHERE SP_ID = ? AND ProductID = ? AND MonthYear = ?
    `;

    db.query(checkSql, [SP_ID, ProductID, formattedMonth], (err, data) => {

      if (err) {
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      if (data.length > 0) {
        return res.status(400).json({
          message: "Target already exists for this month"
        });
      }

      // INSERT
      const sql = `
        INSERT INTO tbl_Target
        (SP_ID, ProductID, MonthYear, TargetQty, TargetValue)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [SP_ID, ProductID, formattedMonth, TargetQty, TargetValue],
        (err, result) => {

          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Internal server error"
            });
          }

          res.status(201).json({
            message: "Target added successfully",

            monthlyTargetQty: TargetQty,
            weeklyTargetQty,
            dailyTargetQty,

            monthlyTargetValue: TargetValue,
            weeklyTargetValue,
            dailyTargetValue
          });

        }
      );

    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }

};


//GET TARGETS (WITH JOIN)
exports.getTargets = (req, res) => {

  try {

    const sql = `
      SELECT 
        t.TargetID,
        t.MonthYear,
        t.TargetQty,
        t.TargetValue,
        s.Name AS SalesPersonName,
        s.SP_Code,
        p.Name AS ProductName,
        p.ProductCode
      FROM tbl_Target t
      JOIN tbl_SalesPerson s ON t.SP_ID = s.SP_ID
      JOIN tbl_Product p ON t.ProductID = p.ProductID
      WHERE t.IsActive = 1
      ORDER BY t.TargetID DESC
    `;

    db.query(sql, (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      res.status(200).json(result);

    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }

};


//UPDATE TARGET
exports.updateTarget = (req, res) => {

  try {

    const { id } = req.params;
    const { TargetQty, TargetValue } = req.body;

    if (!TargetQty || !TargetValue) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const sql = `
      UPDATE tbl_Target
      SET TargetQty = ?, TargetValue = ?
      WHERE TargetID = ?
    `;

    db.query(sql, [TargetQty, TargetValue, id], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      res.status(200).json({
        message: "Target updated successfully"
      });

    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }

};


//SOFT DELETE TARGET
exports.deleteTarget = (req, res) => {

  try {

    const { id } = req.params;

    const sql = `
      UPDATE tbl_Target
      SET IsActive = 0
      WHERE TargetID = ?
    `;

    db.query(sql, [id], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      res.status(200).json({
        message: "Target deleted successfully"
      });

    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }

};


   