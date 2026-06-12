const db = require('../config/db');

// ADD Sales Person
exports.addSalesPerson = async (req, res) => {

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
     const [data] = await db.query(checkSql, [Email, SP_Code]);

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
     await db.query(
      sql,
      [SP_Code, Name, Email, RegionID, ManagerID || null]
    );
    return res.status(201).json({
      message: "Sales Person added successfully"
    });
   } catch (error) {
     return res.status(500).json({
      message: error.message
    });
   }
};

// GET
exports.getSalesPersons = async (req, res) => {

  try {
     const sql = `
      SELECT * FROM tbl_SalesPerson
      WHERE IsActive = 1
    `;
     const [result] = await db.query(sql);
     return res.status(200).json(result);
    } catch (error) {

    return res.status(500).json({
      message: error.message
    });
   }
};
// UPDATE
exports.updateSalesPerson = async (req, res) => {

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
     await db.query(
      sql,
      [SP_Code, Name, Email, RegionID, ManagerID || null, id]
    );
     return res.status(200).json({
      message: "Sales Person updated successfully"
    });
  } catch (error) {
     return res.status(500).json({
      message: error.message
    });
   }
 };
// DELETE
exports.deleteSalesPerson = async (req, res) => {

  try {
     const { id } = req.params;
     const sql = `
      UPDATE tbl_SalesPerson
      SET IsActive = 0
      WHERE SP_ID = ?
    `;
     await db.query(sql, [id]);
    return res.status(200).json({
      message: "Sales Person deleted successfully"
    });
 } catch (error) {

    return res.status(500).json({
      message: error.message
    });
   }
  };