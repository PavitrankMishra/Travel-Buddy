const userModel = require("../models/userModel").default;
type TUser = import("../models/userModel").TUser;
import type { Request, Response } from "express";
const bcrypt = require("bcryptjs");

// Controller for handling user registration
const registerController = async (req: Request, res: Response) => {
    try {
        // Destructure user data from request body
        const { userName, email, password, phone } = req.body || {};
        console.log("The data type of phone is: ", typeof(phone));

        // If any of userName, email, password and phone is empty 
        if (!userName || !email || !password || !phone) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Checks if the user exist with the given email
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Email already registered. Please login",
            });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user record in the database with the provided details and hashed password
        const user = await userModel.create({ userName, email, password: hashedPassword, phone });

        return res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in register API",
            err,
        });
    }
};


// Controller for handling user login
const loginController = async (req: Request, res: Response) => {
    try {
        // Destructure user data from request body
        const { email, password } = req.body || {};

        // Checks if email or password is empty
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Provide both email and password",
            });
        }

        // Checks if the user exists with the given email
        const user = await userModel.findOne({ email });

        // If value is false than return message with success as false
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User does not exist. Please register",
            });
        }

        // Checks if the given password and password in the database match
        const isMatch = await bcrypt.compare(password, user.password);

        // If password don't match than return success and message
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Resets password to undefined 
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "User login successful",
            user,
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in login API",
            err,
        });
    }
};

module.exports = { registerController, loginController };
