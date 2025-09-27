"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { loginController, registerController } from "../controllers/authController.ts";
const { loginController, registerController } = require("../controllers/authController");
const router = express_1.default.Router();
// routes
// REGISTER || POST
router.post("/register", registerController);
// LOGIN || POST
router.post("/login", loginController);
exports.default = router;
