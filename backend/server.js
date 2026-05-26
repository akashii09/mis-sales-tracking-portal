const express = require("express");
const app = express();
const cors = require("cors");
//
app.use(cors());
app.use(express.json());

// routes
const regionRoutes = require("./routes/regionRoutes");
const productRoutes = require('./routes/productRoutes');
app.use("/api/region", regionRoutes);
app.use('/api/products', productRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Server is running fine");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});