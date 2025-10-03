import express from "express";
const { addCityController, getUserCityController, deleteCityController } = require("../controllers/cityController");


const router = express.Router();

// routes

// Add a city from a user || POST
router.post("/addCity", addCityController);

// Get all cities of a particular user || GET
router.get("/:userId", getUserCityController);

// Delete a particular city of a particular user
router.delete("/:userId/:cityId", deleteCityController);

export default router;
