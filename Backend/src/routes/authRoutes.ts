import express from "express";
import { registerController } from "../controllers/authController.ts";

const router = express.Router();

// routes
// REGISTER || POST

router.post("/register", registerController);

export default router;