const cityModel = require("../models/citiesModel").default;
import type { Request, Response } from "express";
import { Types } from "mongoose";

const bcrypt = require("bcryptjs");

// Add new city to the user || POST
const addCityController = async (req: Request, res: Response) => {
    try {
        const { userId, visitedCities } = req.body;
        if (!userId || !visitedCities || !Array.isArray(visitedCities)) {
            return res.status(400).json({
                success: false,
                message: "Please provide userId and visitedCities array"
            });
        }

        let userCities = await cityModel.findOne({ userId });

        if (userCities) {
            userCities.visitedCities.push(...visitedCities);
            await userCities.save();
        } else {
            userCities = new cityModel({
                userId: new Types.ObjectId(userId),
                visitedCities
            });
            await userCities.save();
        }

        return res.status(200).json({
            success: true,
            message: "City added successfully",
            data: userCities
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in cities api",
            err
        })
    }
};

// Get the list of the city from the user || GET
const getUserCityController = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if(!userId) {
            return res.status(400).json({
                success:false,
                message: "UserId is required"
            })
        }

        const userCities = await cityModel.findOne({userId});
        if(!userCities) {
            return res.status(404).json({
                success: false,
                message: "No cities found for this user",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User cities fetched successfully",
            data: userCities
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in get cities api",
            err
        })
    }
}

module.exports = { addCityController, getUserCityController };