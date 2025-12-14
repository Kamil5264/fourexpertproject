 const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const protectedRoutes = require("./routes/protectedRoutes");
app.use("/api", protectedRoutes);

// Test route
app.get("/", (req, res) => res.send("API Running"));

module.exports = app;
