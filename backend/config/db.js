const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "226516",   //  IMPORTANT
  database: "mis_portal"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed");
    console.log(err.message);   // IMPORTANT
  } else {
    console.log("✔ MySQL Connected");
  }
});

module.exports = db;