const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// REGION ROUTES (NEW ADDITION)
const regionRoutes = require("./routes/regionRoutes");
app.use("/api/region", regionRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("MIS Portal Backend Running");
});

//  SERVER START
app.listen(4000, () => {
  console.log("Server running on 4000");
});