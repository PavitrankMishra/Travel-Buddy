import userModel, { type TUser } from "../models/userModel.ts";
import type { Request, Response } from "express";

// Controller to register user
export const registerController = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, phone } = req.body || {};
        // validation
        if (!userName || !email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            })
        }

        // check user

        const existing = await userModel.findOne({ email: email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: "Email already registered. Please Login"
            })
        }

        // Create user

        const user = await userModel.create({ userName, email, password, phone });
        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in register api",
            err
        })
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body || {};
        // Check if both email id an password are sent
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Provide both email and password",
            })
        }

        // Check if the user exist
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User does not exist. Please register",
            })
        }

        // Successfully login user
        return res.status(200).send({
            succes: true,
            message: "User Login successfull",
            user
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in login api",
            err
        })
    }
}