const cityModel = require("../models/citiesModel").default;
import type { Request, Response } from "express";
import { Types } from "mongoose";

// Library for password hashing
const bcrypt = require("bcryptjs");

// Add new city to the user || POST
const addCityController = async (req: Request, res: Response) => {
    try {
        // Destructure userId and visitedCities from the request body
        const { userId, visitedCities } = req.body;

        // Checks if userId, visitedCities exist and visitedCities is an array
        if (!userId || !visitedCities || !Array.isArray(visitedCities)) {
            return res.status(400).json({
                success: false,
                message: "Please provide userId and visitedCities array"
            });
        }

        // Checks if the required keys exist
        for (const city of visitedCities) {
            if (!city.cityName) {
                return res.status(400).json({
                    success: false,
                    message: "City required"
                });
            } else if (!city.country) {
                return res.status(400).json({
                    success: false,
                    message: "Country Required"
                });
            } else if (!city.notes) {
                return res.status(400).json({
                    success: false,
                    message: "Description Required",
                });
            } else if (!city.visitedOn) {
                return res.status(400).json({
                    success: false,
                    message: "Date Required",
                });
            } else if (!city.lat) {
                return res.status(400).json({
                    success: false,
                    message: "Latitude Required",
                });
            } else if (!city.lng) {
                return res.status(400).json({
                    success: false,
                    message: "Longitude Required"
                })
            }
        }

        // Find cities of the user with the userId
        let userCities = await cityModel.findOne({ userId });

        // Adds currently sent city to the array of the user with given userId
        if (userCities) {
            userCities.visitedCities.push(...visitedCities);
            await userCities.save();
        } else {
            // Create a new city record for the user with the provided userId and visitedCities
            userCities = new cityModel({
                userId: new Types.ObjectId(userId),
                visitedCities
            });
            await userCities.save();
        }

        // Returns success, message and userCities data
        return res.status(200).json({
            success: true,
            message: "Success",
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
        // Destructure userId from the paramters
        const { userId } = req.params;

        // Checks if userId exist
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is required"
            })
        }

        // Find cities of the user with the userId
        const userCities = await cityModel.findOne({ userId });

        // Checks if cities exist for the user
        if (!userCities) {
            return res.status(404).json({
                success: false,
                message: "No cities found for this user",
            })
        }

        // Returns success, message and data
        return res.status(200).json({
            success: true,
            message: "User cities fetched successfully",
            data: userCities
        });
    } catch (err) {
        // Return success, message and err
        return res.status(500).send({
            success: false,
            message: "Error in get cities api",
            err
        })
    }
}

// Delete city of a particular user || DELETE
const deleteCityController = async (req: Request, res: Response) => {
    try {
        // Destructure userId and cityId from parameters
        const { userId, cityId } = req.params;

        // Checks if userId exist
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId required"
            });
        // Checks if cityId exist
        } else if (!cityId) {
            return res.status(400).json({
                success: false,
                message: "City Id required"
            })
        }

        // Use MongoDB $pull to remove the city
        const updatedUserCities = await cityModel.findOneAndUpdate(
            { userId },
            { $pull: { visitedCities: { _id: cityId } } },
            { new: true }
        );

        // Checks if city exist with the same Id
        if (!updatedUserCities) {
            return res.status(404).json({
                success: false,
                message: "No user or city found with this ID"
            });
        }

        // Returns success, message and data
        return res.status(200).json({
            success: true,
            message: "Success",
            data: updatedUserCities
        });
    } catch (err) {
        // Returns success, message and err
        return res.status(500).send({
            success: false,
            message: "Error in delete city api",
            err
        });
    }
};

module.exports = { addCityController, getUserCityController, deleteCityController };