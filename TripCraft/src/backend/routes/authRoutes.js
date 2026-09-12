import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

let authRoutes = express.Router();

authRoutes.post("/signup", async (req, res ) => {
  try {
    const { name, email, password } = req.body;
        
        const emailExists = await User.findOne({ email });
        if(emailExists){
            return res.status(400).json({message : "Email already Exists , Sign In"})
        }
        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await User.create({ name, email, passwordHash });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token, user: { name: user.name, role: user.role } });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email, create an account first" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password "});
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, user: { name: user.name, role: user.role } });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default authRoutes;