import express from "express";
import { Places } from "../models/places.js";

const spots = express.Router();

spots.get("/:destination", async (req, res) => {
  try {
    const place = await Places.findOne({
      Destination: req.params.destination
    });

    if (!place) {
      return res.status(404).json({
        message: "Place details not found"
      });
    }

    res.status(200).json(place);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

spots.get("/:id", async (req, res) => {
  try {
    const spot = await Places.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: "No place is found" });
    }
    res.status(200).json(spot);
  } catch (err) {
    res.status(400).json({ message: "This is message with working of ID" }); // alert() doesn't exist in Node.js
  }
});

export default spots;