import mongoose from "mongoose";

// Interface defining the details of the user
export interface TUser {
    userName: string,
    email: string,
    password: string,
    phone: string
}

// Mongoose schema defining the structure of 'User' collection
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