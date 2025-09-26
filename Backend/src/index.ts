import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.ts";
import authRoutes from "./routes/authRoutes.ts";

dotenv.config();

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);

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
