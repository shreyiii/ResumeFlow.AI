import express from "express";
import protect from "../middlewares/authmiddleware.js";
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume } from "../controllers/aicontroller.js";

const aiRouter = express.Router();

aiRouter.post("/enhanceProfessionalSummary", protect, enhanceProfessionalSummary);
aiRouter.post("/enhanceJobDescription", protect, enhanceJobDescription);
aiRouter.post("/uploadResume", protect, uploadResume);

export default aiRouter;