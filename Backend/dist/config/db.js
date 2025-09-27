"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB database connection
const connectDB = async () => {
    try {
        const connReq = await mongoose_1.default.connect(process.env.MONGO_URL || "");
        console.log(`Connected to database ${connReq.connection.host}`);
    }
    catch (error) {
        console.log("DB Error: ", error);
    }
};
module.exports = { connectDB };
