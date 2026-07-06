import { useEffect, useState } from "react";
import {
  FilePenIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  X,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { useRef } from "react";


const Dashboard = () => {
  const{user,token}=useSelector((state)=>state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF00FF",
    "#00FFFF",
    "#FFC0CB",
    "#808080",
    "#000000",
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setUploadResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

useEffect(() => {
  loadAllResumes();
}, []);

const loadAllResumes = async () => {
  try {
    const { data } = await api.get("/api/users/resumes", {
      headers: {
        Authorization: token,
      },
    });

    console.log("API Response:", data);

    setAllResumes(Array.isArray(data) ? data : []);
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message
    );
  }
};

const createResume = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    toast.error("Please enter resume title");
    return;
  }

  try {
    const { data } = await api.post(
      "/api/resumes/create",
      {
        title,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("Created Resume:", data);

    setAllResumes((prev) => [
      data.resume,
      ...(Array.isArray(prev) ? prev : []),
    ]);

    setTitle("");
    setShowCreateResume(false);

    navigate(`/app/builder/${data.resume._id}`);
  } catch (error) {
    console.log(error.response?.data);

    toast.error(
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message
    );
  }
};
const uploadResume = async (e) => {
  e.preventDefault();

  if (!resume) {
    return toast.error("Please select a PDF file");
  }

  if (!title.trim()) {
    return toast.error("Please enter resume title");
  }

  setIsLoading(true);

  try {
    const resumeText = await pdfToText(resume);

    const { data } = await api.post(
      "/api/ai/uploadResume",
      {
        title,
        resumeText,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    toast.success(data.message);

    setResume(null);
    setTitle("");
    setUploadResume(false);

    navigate(`/app/builder/${data.resumeId}`);
  } catch (error) {
    console.log(error.response?.data);

    toast.error(
      error?.response?.data?.message ||
      error.message
    );
  } finally {
    setIsLoading(false);
  }
};

const handleResumeChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    setResume(null);
    return;
  }

  // Optional validation
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  if (!allowedTypes.includes(file.type)) {
    toast.error("Please upload a PDF or DOC/DOCX file");
    e.target.value = "";
    return;
  }

  setResume(file);
};

const deleteResume = async (resumeId) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    const { data } = await api.delete(
      `/api/resumes/delete/${resumeId}`,
      {
        headers: { Authorization: token },
      }
    );

    setAllResumes((prev) =>
      prev.filter((r) => r._id !== resumeId)
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message
    );
  }
};

 const editTitle = async (event) => {
  try {
    event.preventDefault();

    const { data } = await api.put(
      `/api/resumes/update/${editResumeId}`,
      {
        resumeData: { title }
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setAllResumes(
      allResumes.map((resume) =>
        resume._id === editResumeId
          ? { ...resume, title }
          : resume
      )
    );

    setTitle("");
    setEditResumeId("");

    toast.success(data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message
    );
  }
};
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              My Resumes
            </h1>

            <p className="text-slate-500 mt-1">
              Create, edit and manage your resumes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUploadResume(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-blue-100 transition"
            >
              <UploadCloudIcon className="size-4" />
              Upload
            </button>

            <button
              onClick={() => setShowCreateResume(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              <PlusIcon className="size-4" />
              Create Resume
            </button>
          </div>
        </div>

        {/* Resume Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">

          {allResumes?.map((resumeItem, index) => {

            const baseColor = colors[index % colors.length];

            return (

              <div
                key={resumeItem._id}
                onClick={() =>
                  navigate(`/app/builder/${resumeItem._id}`)
                }
                className="group relative h-52 rounded-xl border cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}50`,
                }}
              >

                {/* Edit */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    setEditResumeId(resumeItem._id);
                    setTitle(resumeItem.title);
                  }}
                  className="absolute top-3 right-12 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <PencilIcon className="size-4 text-blue-600" />
                </button>

                {/* Delete */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    deleteResume(resumeItem._id);
                  }}
                  className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <TrashIcon className="size-4 text-red-500" />
                </button>

                {/* Card */}

                <div className="h-full flex flex-col items-center justify-center p-4">

                  <FilePenIcon
                    className="size-14 mb-4"
                    style={{ color: baseColor }}
                  />

                  <h3 className="font-semibold text-center text-slate-800">
                    {resumeItem.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2">
                    {resumeItem.updatedAt
                      ? new Date(
                          resumeItem.updatedAt
                        ).toLocaleDateString()
                      : ""}
                  </p>

                </div>

              </div>

            );

          })}

        </div>
      </div>
            {/* Create Resume Modal */}

      {showCreateResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <form
            onSubmit={createResume}
            className="bg-white rounded-xl shadow-xl w-[420px] p-6"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Create Resume
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              >
                <X className="size-5" />
              </button>

            </div>

            <div className="mt-6">

              <label className="text-sm font-medium">
                Resume Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Software Engineer Resume"
                className="mt-2 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Create
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Upload Resume Modal */}

      {showUploadResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <form
            onSubmit={uploadResume} 
            className="bg-white rounded-xl shadow-xl w-[420px] p-6"
          >

<div className="flex items-center justify-between">
  <h2 className="text-xl font-semibold hover:underline cursor-pointer text-green-600">
    Upload Resume
  </h2>

 <button
  type="button"
  disabled={isLoading}
  onClick={() => {
    setUploadResume(false);
    setResume(null);
    setTitle("");
  }}
  className="flex items-center justify-center disabled:opacity-50"
>
  {isLoading ? (
    <LoaderCircleIcon className="animate-spin size-5 text-green-600" />
  ) : (
    <X className="size-5" />
  )}
</button>
</div>

            <div className="mt-5">

              <label className="text-sm font-medium">
                Resume Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-2"
                required
              />

            </div>

            <div className="mt-5">

              <label className="text-sm font-medium">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="mt-2"
                required
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() => {
                  setUploadResume(false);
                  setResume(null);
                  setTitle("");
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Upload
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Edit Title Modal */}

      {editResumeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <form
            onSubmit={editTitle}
            className="bg-white rounded-xl shadow-xl w-[420px] p-6"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Edit Resume Title
              </h2>

              <button
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              >
                <X className="size-5" />
              </button>

            </div>

            <div className="mt-6">

              <label className="text-sm font-medium">
                Resume Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                required
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>

            </div>

          </form>

        </div>
      )}

    </>
  );

}
export default Dashboard;