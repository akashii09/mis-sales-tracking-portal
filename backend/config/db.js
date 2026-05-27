const mysql = require("mysql2/promise");

const db = mysql.createPool( {
  host: "localhost",
  user: "root",
  password: "226516",
  database: "mis_portal"
} );

module.exports = db;