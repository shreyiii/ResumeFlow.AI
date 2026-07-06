import React from "react";
import { Brain, Plus, Sparkles, Trash2 } from "lucide-react";

const Skills = ({ data, onChange }) => {

  const addSkill = () => {
    onChange([...data, ""]);
  };

  const removeSkill = (index) => {
    const updatedSkills = data.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };

  const updateSkill = (index, value) => {
    const updatedSkills = [...data];
    updatedSkills[index] = value;
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Skills
          </h3>

          <p className="text-sm text-gray-500">
            Showcase your technical and professional skills.
          </p>
        </div>

        <button
          onClick={addSkill}
          className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
        >
          <Plus className="size-4" />
          <span className="max-sm:hidden">Add Skill</span>
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          <Brain className="mx-auto mb-2 size-6 text-gray-400" />
          <p>No skills added yet. Click "Add Skill" to start.</p>
          <p className="text-sm text-gray-400">
            Add technical and soft skills relevant to your profile.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {data.map((skill, index) => (

            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
            >

              <div className="flex justify-between items-center">

                <h4 className="font-semibold">
                  Skill #{index + 1}
                </h4>

                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>

              </div>

              <input
                type="text"
                placeholder="Enter Skill"
                value={skill}
                onChange={(e) =>
                  updateSkill(index, e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex justify-end">

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Tip */}
      <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
        <p className="text-xs text-gray-700 text-center leading-5">
          <span className="font-bold text-blue-700">Tip:</span> Include technical and soft skills relevant to your target role, prioritizing the skills mentioned in the job description.
        </p>
      </div>

    </div>
  );
};

export default Skills;