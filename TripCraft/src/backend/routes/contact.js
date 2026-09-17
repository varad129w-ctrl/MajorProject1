import express from "express";
import contact from "../models/contact.js";

const form = express.Router(); 
form.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newcontact = await contact.create({ name, email, subject, message });
        return res.status(201).json({
            message: "Message sent successfully!",
            data: newcontact
        });
    }

    catch (err) { return res.status(400).json({ message: "There is problem Try Again !" }); }
})
export default form; 