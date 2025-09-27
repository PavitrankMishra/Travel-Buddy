import express from "express";
const {addCityController, getUserCityController} = require("../controllers/cityController");


const router = express.Router();

// routes

// Add a city from a user || POST
router.post("/addCity", addCityController);

// Get all cities of a particular user || GET
router.get("/:userId", getUserCityController);

export default router;
