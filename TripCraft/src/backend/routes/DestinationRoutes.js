import express from "express";
import { Destination } from "../models/destination.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const destination = await Destination.find();
    res.status(200).json({ destination });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message }); // alert() doesn't exist in Node.js
  }
});

export default router;