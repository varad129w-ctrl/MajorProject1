import mongoose from "mongoose";
import express from "express";
import { Destination } from "../models/destination.js";

let sroute = express.Router();

sroute.get("/:name", async (req, res) => {
    try {
        const suggestionname = req.params.name;
        if (!suggestionname) {
            return res.json([]); //returning empty array : 
        }
        const suggestion = await Destination.find(
            {
                Destination:
                {
                    $regex: suggestionname,
                    $options: "i"
                }
            })
            .select('Destination id') //used to pull only whats needed  
            .limit(10); // this is used to prevent giving all inputs 
        res.json(suggestion)
    }
    catch (err) {
        res.status(400).json({ error: 'Server error fetching suggestions' });
    }
})

export default sroute;