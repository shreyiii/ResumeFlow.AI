import fs from "fs";
import Resume from "../models/Resume.js";
import imagekit from "../configs/imagekit.js";

// ================= CREATE RESUME =================
export const createResume = async (req, res) => {
  console.log("=== createResume called ===");

  try {
    console.log("Body:", req.body);
    console.log("UserId:", req.userId);

    const userId = req.userId;
    const { title, public: isPublic } = req.body;

    console.log("Before Resume.create()");

    const resume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      public: Boolean(isPublic),
    });

    console.log("After Resume.create()");

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    console.error("ERROR:");
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};


// ================= DELETE RESUME =================
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndDelete({
      userId,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// ================= GET RESUME =================
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// ================= PUBLIC RESUME =================
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      public: true,
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// ================= UPDATE RESUME =================
export const updateResume = async (req, res) => {
  try {
    console.log("========== UPDATE RESUME ==========");
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("User ID:", req.userId);

    const userId = req.userId;
    const { resumeId } = req.params;

    const { resumeData, removeBackground } = req.body;

    const image = req.file || null;

let resumeDataCopy =
  typeof resumeData === "string"
    ? JSON.parse(resumeData)
    : resumeData;

console.log("Parsed Resume Data:");
console.log(resumeDataCopy);
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",

        transformation: {
          pre: `w-300,h-300,fo-face,z-0.75${
            removeBackground ? ",e-bgremove" : ""
          }`,
        },
      });

      resumeDataCopy.personal_info =
        resumeDataCopy.personal_info || {};

      resumeDataCopy.personal_info.image =
        response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      {
        userId,
        _id: resumeId,
      },
      resumeDataCopy,
      {
        new: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("========== UPDATE ERROR ==========");
    console.error(error);

    return res.status(500).json({
      error: error.message,
    });
  }
};