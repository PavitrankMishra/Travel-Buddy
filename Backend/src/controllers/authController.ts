import userModel from "../models/userModel.ts";

export const registerController = async (req, res) => {
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
}