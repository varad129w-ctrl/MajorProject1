import dotenv from "dotenv";
dotenv.config();
import path from "path"
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routes/DestinationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import spots from "./routes/places.js";
import sroute from "./routes/suggestionroutes.js";
import form from "./routes/contact.js"

const app = express();
app.use(express.json());
app.use(cors());
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/DestinationDeatils";
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use("/api/destinations", router);
app.use("/api/auth", authRoutes);
app.use("/api/places", spots);
app.use("/api/suggestions", sroute);
app.use("/api/contact", form);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});