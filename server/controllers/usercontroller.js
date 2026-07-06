import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";
import jwt from "jsonwebtoken";

const genrateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//post: api/user
export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const finalUsername = username || name || (email ? email.split('@')[0] : "");

        if (!finalUsername || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username: finalUsername }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username: finalUsername, email, password: hashedPassword });
        const token = genrateToken(newUser._id);
        const safeUser = newUser.toObject();
        delete safeUser.password;

        res.status(201).json({ message: "User registered successfully", token, user: safeUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

//post: api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const loginIdentifier = email || username;

        if (!loginIdentifier || !password) {
            return res.status(400).json({ message: "Email/username and password are required" });
        }

        const user = await User.findOne({ $or: [{ email: loginIdentifier }, { username: loginIdentifier }] });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = genrateToken(user._id);
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json({ message: "Login successful", token, user: safeUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

//controller for getting useer by ig
//get: api/user/:id
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId || req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//get: api/user/me
export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;
        const resume = await Resume.find({ userId });
        res.status(200).json(resume);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};