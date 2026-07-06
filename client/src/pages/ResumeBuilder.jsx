
import React, { useState, useEffect } from 'react';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets/assets';
import { ArrowLeftIcon, Briefcase, FileText, FolderIcon, GraduationCap, Icon, User,Sparkles, ChevronLeft, ChevronRight, Share2Icon, DownloadIcon,EyeOffIcon,EyeIcon } from 'lucide-react';
import PersonalinfoForm from '../componets/PersonalinfoForm';
import ResumePreview from '../componets/ResumePreview';
import TemplateSelector from '../componets/TemplateSelector';
import ColorPicker from '../componets/ColorPicker';
import ProfessionalSummary from '../componets/ProfessionalSummary';
import Experience from '../componets/Experience';
import Education from '../componets/Education';
import Projects from '../componets/Project';
import Skills from '../componets/Skills';
import { useSelector } from 'react-redux';
import api from "../api/axios";
import toast from 'react-hot-toast';

const ResumeBuilder = () => {
  const {resumeId} = useParams();
  const {token}=useSelector((state)=>state.auth);
  const resumeRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: 'classic',
    accent_color: '#6366F1',
    public:false,

  })
 const loadExistingResume = async () => {
  try {
    const { data } = await api.get(
      `/api/resumes/${resumeId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (data.resume) {
      setResumeData(data.resume);
      document.title = data.resume.title;
    }
  } catch (error) {
    console.log(error.response?.data || error.message);

    // Fallback to dummy data
    const resume = dummyResumeData.find(
      (r) => r._id === resumeId
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }
};

  
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const[removeBackground,setRemoveBackground]=useState(false);
  const sections=[
  { id: "personal", name: "Personal Info", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap},
  { id: "projects", name: "Projects", icon: FolderIcon },
  { id: "skills", name: "Skills", icon: Sparkles},
  ]
  const activeSection = sections[activeSectionIndex];
  useEffect(() => {
  if (resumeId && token) {
    loadExistingResume();
  }
}, [resumeId, token]);


const changeResumeVisibility = async () => {
  try {
    let updatedResume = structuredClone(resumeData);
    updatedResume.public = !resumeData.public;
    const hasImageFile = typeof resumeData.personal_info?.image === 'object';
    
    if (hasImageFile) {
      delete updatedResume.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeData", JSON.stringify(updatedResume));
    formData.append("removeBackground", removeBackground);

    if (hasImageFile) {
      formData.append("resume", resumeData.personal_info.image);
    }

    const { data } = await api.put(
      `/api/resumes/update/${resumeId}`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setResumeData(data.resume);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};


const handleShare = async () => {
  const resumeUrl = `${window.location.origin}/view/${resumeId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: resumeData.title,
        text: "Check out my resume!",
        url: resumeUrl,
      });
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      alert("Resume link copied to clipboard.");
    }
  } catch (err) {
    console.log(err);
  }
};

const downloadResume = () => {
  window.print();
};

const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData);
    const hasImageFile = typeof resumeData.personal_info?.image === 'object';
    
    if (hasImageFile) {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));
    formData.append("removeBackground", removeBackground);

    if (hasImageFile) {
      formData.append("resume", resumeData.personal_info.image);
    }

    const { data } = await api.put(
      `/api/resumes/update/${resumeId}`,
      formData,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setResumeData(data.resume);
    toast.success(data.message);
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Failed to update resume.");
  }
};


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6"  >
        <Link to={'/app'} className= "inline flex gap-2 items-center text-sm text-green-800 hover:text-green-600 transition-all">
          <ArrowLeftIcon className="size-4"/>Back to dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
  <div className="grid lg:grid-cols-12 gap-8">

    {/* Left */}
    <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

        {/* Progress Bar */}
        <hr className="absolute top-0 left-0 right-0 h-1 border-2 border-gray-300" />
        <hr
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 border-none transition-all duration-300"
          style={{
            width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
          }}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300">
          <div className="flex-1 flex items-center gap-2">
            <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev) => ({ ...prev, template }))} />
              <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} /> 
          </div>

          <div className="flex items-center gap-2">
            {activeSectionIndex > 0 && (
              <button
                onClick={() =>
                  setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                }
                className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
            )}

            <button
              onClick={() =>
                setActiveSectionIndex((prev) =>
                  Math.min(prev + 1, sections.length - 1)
                )
              }
              className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

     {/* Form */}
<div className="space-y-6">

  {activeSection.id === "personal" && (
    <PersonalinfoForm
      data={resumeData.personal_info}
      onChange={(data) =>
        setResumeData((prev) => ({
          ...prev,
          personal_info: data,
        }))
      }
      removeBackground={removeBackground}
      setRemoveBackground={setRemoveBackground}
    />
  )}

  {activeSection.id === "summary" && (
    <ProfessionalSummary
      data={resumeData.professional_summary}
      onChange={(summary) =>
        setResumeData((prev) => ({
          ...prev,
          professional_summary: summary,
        }))
      }
    />
  )}

  {activeSection.id === "experience" && (
    <Experience
      data={resumeData.experience}
      onChange={(experience) =>
        setResumeData((prev) => ({
          ...prev,
          experience,
        }))
      }
    />
  )}
  {activeSection.id === "education" && (
    <Education
      data={resumeData.education}
      onChange={(education) =>
        setResumeData((prev) => ({
          ...prev,
          education,
        }))
      }
    />
  )}
  {activeSection.id === "projects" && (
    <Projects
      data={resumeData.projects}
      onChange={(projects) =>
        setResumeData((prev) => ({
          ...prev,
          projects,
        }))
      }
    />
  )}

  {activeSection.id === "skills" && (
    <Skills
      data={resumeData.skills}
      onChange={(skills) =>
        setResumeData((prev) => ({
          ...prev,
          skills,
        }))
      }
    />
  )}




</div>
    <button
  onClick={saveResume}
  className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all ring-1 ring-green-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
>
  Save Changes
</button>
      </div> 

    </div>   {/* Left Column */}

    {/* Right */}
    <div className="lg:col-span-7 lg:mt-6">
      <div className="sticky top-6">
        <div className="absolute top-3 right-3 flex gap-2 z-50">
          {resumeData.public && (
  <button
    onClick={handleShare}
    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
  >
    <Share2Icon className="inline size-4 mr-2" />
    Share Resume
  </button>
)}
   <button
  onClick={changeResumeVisibility}
  className={`px-4 py-2 rounded-lg transition-all ${
    resumeData.public
      ? "bg-green-200 text-green-800"
      : "bg-purple-200 text-purple-800"
  }`}
>
  {resumeData.public ? (
    <>
      <EyeIcon className="inline size-4 mr-2" />
      Public
    </>
  ) : (
    <>
      <EyeOffIcon className="inline size-4 mr-2" />
      Private
    </>
  )}
</button>
         <button
  onClick={downloadResume}
  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-red-300"
>
  <DownloadIcon className="inline size-4 mr-2" />
  Save as PDF
</button>

        </div>
         <div ref={resumeRef}>
      <ResumePreview
        data={resumeData}
        accentColor={resumeData.accent_color}
        template={resumeData.template}
        classes={removeBackground ? "bg-white" : ""}
      />
    </div>
      </div>
    </div>

  </div>
</div>
    </div>
    
  )
};


export default ResumeBuilder