const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ADD THIS
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("MIS Portal Backend Running");
});

app.listen(4000, () => {
  console.log("Server running on 4000");
});