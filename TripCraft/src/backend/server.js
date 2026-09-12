import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routes/DestinationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import spots from "./routes/places.js"
import sroute from "./routes/suggestionroutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/DestinationDeatils")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use("/api/destinations", router);
app.use("/api/auth", authRoutes);
app.use("/api/places", spots);
app.use("/api/suggestions", sroute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});