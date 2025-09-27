import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes").default;
const cityRoutes = require("./routes/citiesRoutes").default;
dotenv.config();

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cities", cityRoutes);

app.get("/", (req, res) => {
    console.log("Route visited /");
    res.send("Server is running smoothly");
});

// Start server
const PORT = process.env.PORT;
console.log(PORT);
console.log("PORT is: ", PORT);
app.listen(PORT, () => {
    console.log(`Our server is running on ${PORT}`);
});
