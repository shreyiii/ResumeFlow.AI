import React from "react";
import { FolderOpen, Plus, Sparkles, Trash2 } from "lucide-react";

const Projects = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };

    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updatedProjects = data.filter((_, i) => i !== index);
    onChange(updatedProjects);
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...data];
    updatedProjects[index][field] = value;
    onChange(updatedProjects);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Projects
          </h3>

          <p className="text-sm text-gray-500">
            Showcase your best academic and personal projects.
          </p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          <span className="max-sm:hidden">Add Project</span>
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          <FolderOpen className="mx-auto mb-2 size-6 text-gray-400" />
          <p>No projects added yet. Click "Add Project" to start.</p>
          <p className="text-sm text-gray-400">
            You can add multiple projects to showcase your work.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div key={index} className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">

                {/* Title */}
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">
                    Project #{index + 1}
                  </h4>

                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="text"
                    placeholder="Project Type"
                    value={project.type}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

                {/* Description */}
                <div className="space-y-2">

                  <div className="flex justify-between items-center">

                    <label className="text-sm text-black border border-green-500 px-2 py-1 bg-green-400 text-white rounded-lg">
                      Description
                    </label>


                  </div>

                  <textarea
                    rows={5}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    placeholder="Describe your project, technologies used and your contribution."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tip */}
      <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
        <p className="text-xs text-gray-700 text-center leading-5">
          <span className="font-bold text-blue-700">Tip:</span> Highlight the problem solved, technologies used, your contribution, and the impact of each project in a clear and concise manner.
        </p>
      </div>
    </div>
  );
};

export default Projects;