"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes").default;
dotenv_1.default.config();
// Connect to DB
connectDB();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
