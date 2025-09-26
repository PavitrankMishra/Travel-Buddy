import mongoose from "mongoose";
// Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    }
});
export default mongoose.model("User", userSchema);
