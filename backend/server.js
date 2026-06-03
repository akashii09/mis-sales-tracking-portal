const express = require("express");
require("dotenv").config();

const cors = require("cors");

const app = express();

// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const salesPersonRoutes = require("./routes/salesPersonRoutes");
const productRoutes = require("./routes/productRoutes");
const targetRoutes = require("./routes/targetRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const regionRoutes = require("./routes/regionRoutes");
const achievementRoutes = require("./routes/achievementRoutes");

// DEBUG ROUTE 
console.log("authRoutes =", typeof authRoutes);
console.log("salesPersonRoutes =", typeof salesPersonRoutes);
console.log("productRoutes =", typeof productRoutes);
console.log("targetRoutes =", typeof targetRoutes);
console.log("userRoutes =", typeof userRoutes);
console.log("dashboardRoutes =", typeof dashboardRoutes);
console.log("reportRoutes =", typeof reportRoutes);
console.log("regionRoutes =", typeof regionRoutes);
console.log("achievementRoutes =", typeof achievementRoutes);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use((req, res, next)=>{
    console.log("REQUEST:", req.method, req.url);
    next();
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/salesperson", salesPersonRoutes);
app.use("/api/product", productRoutes);
app.use("/api/target", targetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/achievement", achievementRoutes);
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR =", err);
    res.status(500).json({
        message: err.message
    });
});

// DEFAULT ROUTE
app.get("/", (req, res) => {
    res.send("MIS Portal Backend Running...");
});

// SERVER
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});