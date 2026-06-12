const db = require('../config/db');

//ADD REGION
exports.addRegion = async (req, res) => {

  try {
     const { RegionName, Zone, State, City } = req.body;
     if (!RegionName || !Zone || !State || !City) {
        return res.status(400).json({
        message: "All fields are required"
        });
      }
      const checkSql = `
      SELECT * FROM tbl_region
      WHERE RegionName = ?
    `;

    const [data] = await db.query(checkSql, [RegionName]);

     if (data.length > 0) {
      return res.status(400).json({
        message: "Region already exists"
      });
    }
    const sql = `
      INSERT INTO tbl_region
      (RegionName, Zone, State, City)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(
      sql,
      [RegionName, Zone, State, City]
    );
    return res.status(201).json({
      message: "Region added successfully"
    });
    } catch (error) {
     return res.status(500).json({
      message: error.message
    });
    }
  };

//GET REGION
exports.getRegions = async (req, res) => {

  try {
     const sql = `
     SELECT * FROM tbl_region
     WHERE IsActive = 1
    `;
     const [result] = await db.query(sql);
     return res.status(200).json(result);
    } catch (error) {
    res.status(500).json({
      message: error.message
    });
   }
  };

//UPDATE REGION
exports.updateRegion = async (req, res) => {
   try {
     const { id } = req.params;
     const { RegionName, Zone, State, City } = req.body;

     if (!RegionName || !Zone || !State || !City) {
        return res.status(400).json({
         message: "All fields are required"
      });
     }
     const sql = `
      UPDATE tbl_region
      SET RegionName=?, Zone=?, State=?, City=?
      WHERE RegionID=?
    `;
     await db.query(
      sql,
      [RegionName, Zone, State, City, id]
    );
     return res.status(200).json({
      message: "Region updated successfully"
    });
} catch (error) {
    return res.status(500).json({
      message: error.message
    });
   }
  };

//DELETE REGION
exports.deleteRegion = async (req, res) => {
   try {
     const { id } = req.params;
     const sql = `
      UPDATE tbl_region
      SET IsActive = 0
      WHERE RegionID = ?
    `;
     await db.query(sql, [id]);
     return res.status(200).json({
      message: "Region deleted successfully"
    });
   } catch (error) {

     return res.status(500).json({
      message: error.message
    });
 }
};