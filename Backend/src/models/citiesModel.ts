import mongoose, { Schema, Types } from "mongoose";

// Interface for a single visited city

export interface IVisitedCity {
    cityName: string,
    country: string,
    notes: string,
    visitedOn: Date
}

export interface ICities extends Document {
    userId: Types.ObjectId,
    visitedCities: IVisitedCity[],
    createdAt: Date,
    updatedAt: Date,
}
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

const Cities = mongoose.model<ICities>("cities", citySchema);

export default Cities;
