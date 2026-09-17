import mongoose, { Schema } from "mongoose";

const contact = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: {
        type: String,
        enum: ['General question', 'Suggest a destination', 'Report a mistake', 'Feedback', 'Other'],
        default: 'General question',
        message: '{VALUE} is not a valid role'
    },
    message: { type: String, required: true }
})

const form = mongoose.model("Contact", contact); //! this is very imoportant  
export default form;