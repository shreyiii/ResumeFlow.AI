import express from "express";
import protect from "../middlewares/authmiddleware.js";
import {
  createResume,
  updateResume,
  deleteResume,
  getResumeById,
  getPublicResumeById,
} from "../controllers/resumecontroller.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update/:resumeId", protect, upload.single("resume"), updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);


export default resumeRouter;