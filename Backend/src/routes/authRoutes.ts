import express from "express";
const {loginController, registerController} = require("../controllers/authController");

const router = express.Router();

// routes

// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

export default router;