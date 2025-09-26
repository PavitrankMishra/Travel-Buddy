import mongoose from "mongoose";

// MongoDB database connection
const connectDB = async () => {
    try {
        const connReq = await mongoose.connect(process.env.MONGO_URL || "");
        console.log(`Connected to database ${connReq.connection.host}`);
    } catch (error) {
        console.log("DB Error: ", error);
    }
};

export default connectDB;
