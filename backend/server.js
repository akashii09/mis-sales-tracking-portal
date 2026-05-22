const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
const db = require("./config/db");

app.get("/", (req, res) => {
    res.send("MIS PORTAL WORKING");
});

app.listen(4000, () => {
    console.log("Server running on 4000");
});
