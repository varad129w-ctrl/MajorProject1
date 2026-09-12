import mongoose from "mongoose";

const userdetails = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userdetails);