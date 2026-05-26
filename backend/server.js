const express = require("express");
const app = express();
const cors = require("cors");
//
app.use(cors());
app.use(express.json());

// routes
const regionRoutes = require("./routes/regionRoutes");
const productRoutes = require('./routes/productRoutes');
const salesPersonRoutes = require('./routes/salesPersonRoutes');
const targetRoutes = require('./routes/targetRoutes');
app.use("/api/region", regionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/salesperson', salesPersonRoutes);
app.use('/api/targets', targetRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Server is running fine");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});