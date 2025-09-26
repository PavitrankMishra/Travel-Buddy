import mongoose from "mongoose";

export interface TUser {
    userName: string,
    email: string,
    password: string,
    phone: string
}
// Schema
const userSchema = new mongoose.Schema<TUser>({
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

export default mongoose.model<TUser>("User", userSchema);