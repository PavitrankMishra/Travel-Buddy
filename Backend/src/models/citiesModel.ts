import mongoose, { Schema, Types } from "mongoose";

// Interface for details of single visited city
// Contains keys like cityName, country, notes and visitedOn for details of city
export interface IVisitedCity {
    cityName: string,
    country: string,
    notes: string,
    visitedOn: Date
}

// Interface representing data of cities of a particular user
export interface ICities extends Document {
    userId: Types.ObjectId,
    visitedCities: IVisitedCity[],
    createdAt: Date,
    updatedAt: Date,
}

// Mongoose schema for structure of a cities location
const citySchema = new mongoose.Schema<ICities>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    visitedCities: [
        {
            cityName: { type: String, required: true },
            country: { type: String, required: true },
            notes: { type: String },
            visitedOn: { type: Date, default: Date.now },
            lat: { type: Number },
            lng: { type: Number }
        }
    ]
}, { timestamps: true });

// Model for interacting with cities collection in mongodb
const Cities = mongoose.model<ICities>("cities", citySchema);

export default Cities;
