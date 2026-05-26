const db = require('../config/db');

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

    db.query(checkSql, [RegionName], (err, data) => {

      if (err) {

        return res.status(500).json({
          message: "Internal server error"
        });

      }

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

      db.query(
        sql,
        [RegionName, Zone, State, City],
        (err, result) => {

          if (err) {

            return res.status(500).json({
              message: "Internal server error"
            });

          }

          res.status(201).json({
            message: "Region added successfully"
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

exports.getRegions = async (req, res) => {

  try {

    const sql = `
      SELECT * FROM tbl_region
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

    db.query(
      sql,
      [RegionName, Zone, State, City, id],
      (err, result) => {

        if (err) {

          return res.status(500).json({
            message: "Internal server error"
          });

        }

        res.status(200).json({
          message: "Region updated successfully"
        });

      }
    );

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};

exports.deleteRegion = async (req, res) => {

  try {

    const { id } = req.params;

    const sql = `
      UPDATE tbl_region
      SET IsActive = 0
      WHERE RegionID = ?
    `;

    db.query(sql, [id], (err, result) => {

      if (err) {

        return res.status(500).json({
          message: "Internal server error"
        });

      }

      res.status(200).json({
        message: "Region deleted successfully"
      });

    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};