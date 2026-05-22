const mysql = require("mysql2");

// ye "connection box" hai
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",   // yahan apna MySQL password dalna
    database: "mis_portal"
});

// connect try karega
db.connect((err) => {
    if (err) {
        console.log("❌ DB connection failed");
    } else {
        console.log("✅ MySQL Connected");
    }
});

module.exports = db;
