import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.ts";

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Routes
app.get("/", (req, res) => {
    res.send("Server is running smoothly");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
