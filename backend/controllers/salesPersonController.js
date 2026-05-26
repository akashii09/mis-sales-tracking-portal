const db = require('../config/db');

// ADD Sales Person
exports.addSalesPerson = (req, res) => {

  try {

    const { SP_Code, Name, Email, RegionID, ManagerID } = req.body;

    if (!SP_Code || !Name || !Email || !RegionID) {
      return res.status(400).json({
        message: "SP_Code, Name, Email, RegionID are required"
      });
    }

    const checkSql = `
      SELECT * FROM tbl_SalesPerson
      WHERE Email = ? OR SP_Code = ?
    `;

    db.query(checkSql, [Email, SP_Code], (err, data) => {

      if (err) {
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      if (data.length > 0) {
        return res.status(400).json({
          message: "Sales Person already exists"
        });
      }

      const sql = `
        INSERT INTO tbl_SalesPerson
        (SP_Code, Name, Email, RegionID, ManagerID, IsActive)
        VALUES (?, ?, ?, ?, ?, 1)
      `;

      db.query(
        sql,
        [SP_Code, Name, Email, RegionID, ManagerID || null],
        (err, result) => {

          if (err) {
            return res.status(500).json({
              message: "Internal server error"
            });
          }

          res.status(201).json({
            message: "Sales Person added successfully"
          });

        });

    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};
  //GET
exports.getSalesPersons = (req, res) => {

  try {

    const sql = `
      SELECT * FROM tbl_SalesPerson
      WHERE IsActive = 1
    `;

    db.query(sql, (err, result) => {

      if (err) {
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
//UPDATE 
exports.updateSalesPerson = (req, res) => {

  try {

    const { id } = req.params;
    const { SP_Code, Name, Email, RegionID, ManagerID } = req.body;

    if (!SP_Code || !Name || !Email || !RegionID) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const sql = `
      UPDATE tbl_SalesPerson
      SET SP_Code=?, Name=?, Email=?, RegionID=?, ManagerID=?
      WHERE SP_ID=?
    `;

    db.query(sql,
      [SP_Code, Name, Email, RegionID, ManagerID || null, id],
      (err, result) => {

        if (err) {
          return res.status(500).json({
            message: "Internal server error"
          });
        }

        res.status(200).json({
          message: "Sales Person updated successfully"
        });

      });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};
//DELETE
exports.deleteSalesPerson = (req, res) => {

  try {

    const { id } = req.params;

    const sql = `
      UPDATE tbl_SalesPerson
      SET IsActive = 0
      WHERE SP_ID = ?
    `;

    db.query(sql, [id], (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      res.status(200).json({
        message: "Sales Person deleted successfully"
      });

    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};