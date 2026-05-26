const db = require('../config/db');

exports.addProduct = async (req, res) => {

  try {

    const { ProductCode, Name, Category, Unit } = req.body;

    if (!ProductCode || !Name || !Category || !Unit) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const checkSql = `
      SELECT * FROM tbl_product
      WHERE ProductCode = ?
    `;

    db.query(checkSql, [ProductCode], (err, data) => {

      if (err) {
        return res.status(500).json({
          message: "Internal server error"
        });
      }

      if (data.length > 0) {
        return res.status(400).json({
          message: "Product already exists"
        });
      }

      const sql = `
        INSERT INTO tbl_product
        (ProductCode, Name, Category, Unit)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql,
        [ProductCode, Name, Category, Unit],
        (err, result) => {

          if (err) {
            return res.status(500).json({
              message: "Internal server error"
            });
          }

          res.status(201).json({
            message: "Product added successfully"
          });

        });

    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }

};