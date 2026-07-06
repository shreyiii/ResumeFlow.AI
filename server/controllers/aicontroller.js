import ai from "../configs/openai.js";
import Resume from "../models/Resume.js";

// controller for enhancing a resume summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Enhance the professional summary. Keep it 1-2 sentences, ATS-friendly, highlight skills, experience, and career objective. Return only the summary.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices?.[0]?.message?.content || "";

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for enhancing a resume job description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Enhance the job description. Keep it 1-2 sentences, ATS-friendly, highlight skills, experience, and career objective. Use action verbs and quantifiable results where possible. Return only the text no other options.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices?.[0]?.message?.content || "";

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const buildFallbackResumeData = (resumeText, title) => {
  const text = typeof resumeText === "string" ? resumeText : "";
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(/(\+?\d[\d\s().-]{7,}\d)/);
  const firstLine = text.split(/\r?\n/).find((line) => line.trim())?.trim() || "";

  return {
    professional_summary: title ? `Professional resume for ${title}` : "Professional resume uploaded",
    personal_info: {
      image: "",
      full_name: firstLine || "",
      profession: "",
      email: emailMatch?.[0] || "",
      phone: phoneMatch?.[0] || "",
      location: "",
      linkedin: "",
      website: "",
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
  };
};

// controller for uploading a resume to database

export const uploadResume = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.userId);

    if (!req.body) {
      return res.status(400).json({
        message: "req.body is undefined",
      });
    }

    const { resumeText, title } = req.body;

    console.log("TITLE:", title);
    console.log("TEXT LENGTH:", resumeText?.length);

    const userId = req.userId;
    const textForParsing =
      typeof resumeText === "string" ? resumeText.trim() : "";


    let parsedData = buildFallbackResumeData(textForParsing, title);

    if (process.env.OPENAI_API_KEY && textForParsing) {
      try {
        const systemPrompt = "You are an expert AI Agent to extract the data from resume.";
        const userPrompt = `Extract data from this resume: ${textForParsing}
Provide data in the following JSON format with no additional text before or after:
{
  "professional_summary": "",
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "education": [],
  "projects": [],
  "skills": []
}`;

        const response = await ai.chat.completions.create({
  model: process.env.OPENAI_MODEL || "gemini-2.5-flash",
  messages: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ],
});

        let extractedData =
  response.choices?.[0]?.message?.content || "{}";

extractedData = extractedData
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

parsedData = JSON.parse(extractedData);

console.log("Parsed Data:");
console.log(JSON.stringify(parsedData, null, 2));
      } catch (error) {
  console.log("Gemini Error:");
  console.log(error);

  console.log(
    "Resume extraction failed. Using fallback."
  );
}
    }

// Normalize skills
if (Array.isArray(parsedData.skills)) {
  parsedData.skills = parsedData.skills.map((skill) =>
    typeof skill === "string"
      ? { name: skill, level: "" }
      : skill
  );
}

// Normalize projects
if (Array.isArray(parsedData.projects)) {
  parsedData.projects = parsedData.projects.map((project) =>
    typeof project === "string"
      ? { name: project, description: "" }
      : project
  );
}

// Normalize experience
if (Array.isArray(parsedData.experience)) {
  parsedData.experience = parsedData.experience.map((exp) => ({
    ...exp,
    description: Array.isArray(exp.description)
      ? exp.description.join("\n")
      : exp.description || "",
  }));
}
    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    return res.status(200).json({ resumeId: newResume._id, message: "Resume uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message || "Failed to upload resume" });
  }
};
