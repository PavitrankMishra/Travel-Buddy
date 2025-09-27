const userModel = require("../models/userModel").default;
type TUser = import("../models/userModel").TUser;
import type { Request, Response } from "express";
const bcrypt = require("bcryptjs");

// Register controller
const registerController = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, phone } = req.body || {};

        if (!userName || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Email already registered. Please login",
            });
        }

        // Hash password (fully async)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ userName, email, password: hashedPassword, phone });

        return res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Error in register API",
            err,
        });
    }
};

// Login controller
const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Provide both email and password",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User does not exist. Please register",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        return res.status(200).send({
            success: true, // fixed typo
            message: "User login successful",
            user,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Error in login API",
            err,
        });
    }
};

module.exports = { registerController, loginController };
