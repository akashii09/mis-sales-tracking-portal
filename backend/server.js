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

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/salesperson", salesPersonRoutes);
app.use("/api/product", productRoutes);
app.use("/api/target", targetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
    res.send("MIS Portal Backend Running...");
});

// SERVER
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});