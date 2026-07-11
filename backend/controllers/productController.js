const db = require('../config/db');
//ADD PRODUCTS
exports.addProduct = async (req, res) => {

  try {
      const { ProductCode, Name, Category, Unit } = req.body;
      if (!ProductCode || !Name || !Category || !Unit) {
      return res.status(400).json({
        message: "All fields are required"
         });
       }

    const checkSql = `
      SELECT * FROM tbl_Product
      WHERE ProductCode = ?
    `;

    const [data] = await db.query(checkSql, [ProductCode]);

    if (data.length > 0) {
      return res.status(400).json({
        message: "Product already exists"
      });
    }
    const sql = `
      INSERT INTO tbl_Product
      (ProductCode, Name, Category, Unit)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql,
      [ProductCode, Name, Category, Unit]
    );
    return res.status(201).json({
      message: "Product added successfully"
    });
} catch (error) {
  return res.status(500).json({
      message: error.message
    });
 }
};
//GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
   try {
      const sql = `
      SELECT * FROM tbl_Product
      WHERE IsActive = 1
    `;
     const [result] = await db.query(sql);
     res.status(200).json(result);
  } catch (error) {
     return res.status(500).json({
      message: error.message
    });
   }
  };

//UPDATE PRODUCTS
exports.updateProduct = async (req, res) => {
   try {
    const { id } = req.params;
    const { ProductCode, Name, Category, Unit } = req.body;
     if (!ProductCode || !Name || !Category || !Unit) {

      return res.status(400).json({
        message: "All fields are required"
      });
     }
     const sql = `
      UPDATE tbl_Product
      SET ProductCode=?, Name=?, Category=?, Unit=?
      WHERE ProductID=?
    `;

     await db.query(sql,
      [ProductCode, Name, Category, Unit, id]
    );
    return res.status(200).json({
      message: "Product updated successfully"
    });
    } catch (error) {

    return res.status(500).json({
      message: error.message
    });
   }
};

// DELETE PRODUCTS
exports.deleteProduct = async (req, res) => {

  try {
     const { id } = req.params;
     const sql = `
      UPDATE tbl_Product
      SET IsActive = 0
      WHERE ProductID = ?
    `;
   await db.query(sql, [id]);
   return res.status(200).json({
      message: "Product deleted successfully"
    });
   } catch (error) {
     return res.status(500).json({
      message: error.message
    });
   }
  };