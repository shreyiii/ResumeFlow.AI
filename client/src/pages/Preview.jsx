import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import { dummyResumeData } from "../assets/assets/assets";
import ResumePreview from "../componets/ResumePreview";
import api from "../api/axios";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        if (data?.resume) {
          setResumeData(data.resume);
        } else {
          const resume = dummyResumeData.find((r) => r._id === resumeId);
          setResumeData(resume || null);
        }
      } catch (error) {
        console.error("Failed to fetch public resume:", error);
        const resume = dummyResumeData.find((r) => r._id === resumeId);
        setResumeData(resume || null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublicResume();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Resume Not Found
        </h1>

        <Link
          to="/app"
          className="mt-5 flex items-center gap-2 text-green-600"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;