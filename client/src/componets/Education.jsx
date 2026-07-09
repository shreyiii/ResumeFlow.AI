import React from "react";
import { GraduationCap, Plus, Sparkles, Trash2 } from "lucide-react";

const Education = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...data];
    updatedEducation[index][field] = value;
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Education
          </h3>

          <p className="text-sm text-gray-500">
            Add your educational qualifications and academic achievements.
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          <span className="max-sm:hidden">Add Education</span>
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          <GraduationCap className="mx-auto mb-2 size-6 text-gray-400" />
          <p>No education added yet. Click "Add Education" to start.</p>
          <p className="text-sm text-gray-400">
            Include your degrees, institutions, and academic performance.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((edu, index) => (
            <div key={index} className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">

                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">
                    Education #{index + 1}
                  </h4>

                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />


                  <input
                    type="month"
                    value={edu.graduation_date}
                    onChange={(e) =>
                      updateEducation(index, "graduation_date", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="text"
                    placeholder="CGPA / Percentage"
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(index, "gpa", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 md:col-span-2"
                  />

                </div>

                <div className="space-y-2">

                  <div className="flex justify-between items-center">

                    <label className="text-sm text-white bg-green-400 border border-green-500 px-2 py-1 rounded-lg">
                      Academic Highlights
                    </label>

                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tip */}
      <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
        <p className="text-xs text-gray-700 text-center leading-5">
          <span className="font-bold text-blue-700">Tip:</span> Include your highest qualifications with institution name, degree, graduation year, and CGPA or percentage if it strengthens your profile.
        </p>
      </div>
    </div>
  );
};

export default Education;