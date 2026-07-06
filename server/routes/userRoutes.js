import express from "express";
import { registerUser } from "../controllers/usercontroller.js";
import { loginUser } from "../controllers/usercontroller.js";
import { getUserById } from "../controllers/usercontroller.js";
import protect from "../middlewares/authmiddleware.js";
import { getUserResume } from "../controllers/usercontroller.js";   

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes", protect, getUserResume);
export default userRouter
