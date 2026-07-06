import { Plus, Sparkles, Trash2, LoaderCircleIcon } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import React, { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Experience = ({ data, onChange }) => {
    const [enhancingIndex, setEnhancingIndex] = useState(null);

    const handleEnhance = async (index) => {
        const desc = data[index]?.description;
        if (!desc || !desc.trim()) {
            toast.error("Please write some description first to enhance");
            return;
        }

        setEnhancingIndex(index);
        try {
            const token = localStorage.getItem('token');
            const response = await api.post(
                "/api/ai/enhanceJobDescription",
                { userContent: desc },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data?.enhancedContent) {
                updateExperience(index, "description", response.data.enhancedContent);
                toast.success("Job description enhanced successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to enhance description"
            );
        } finally {
            setEnhancingIndex(null);
        }
    };
    const addExpetrience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false,
        };
        onChange([...data, newExperience]);
    }
    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index);
        onChange(updatedExperience);
    }
    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data];
        updatedExperience[index][field] = value;
        onChange(updatedExperience);
    };

    return(
        <div className="space-y-4">
              <div className="flex justify-between items-center">

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    Professional Experience
                                </h3>
                                <p className="text-sm text-gray-500">
                                    A brief overview of your professional job experience.
                                </p>
                            </div>
                            <button 
                                className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
                                onClick={addExpetrience}
                            >
                                <Plus className="size-4" />
                                <span className="max-sm:hidden">Add Experience</span>
                            </button>
                        </div>
                        {data.length===0?(
                            <div className="text-center text-gray-500 mt-4">
                               <BriefcaseBusiness className="mx-auto mb-2 size-6 text-gray-400" />
                               <p>No experience added yet. Click "Add Experience" to start.</p>
                               <p className="text-sm text-gray-400">You can add multiple experiences and provide details for each.</p>
                            </div>
                        ):(
                            <div className="space-y-6">
                                {data.map((exp, index) => (
                                    <div key={index} className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                                            <div className='flex justify-between items-center'>
                                                <h4 className="font-semibold">Experience #{index + 1}</h4>
                                                <button
                                                    className="text-red-600 hover:text-red-800 text-sm transition-colors"
                                                    onClick={() => removeExperience(index)}>
                                                        <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Position"
                                                    value={exp.position}
                                                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                <input 
                                                    type="month"
                                                    value={exp.start_date}
                                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                                <input
                                                    type="month" disabled={exp.is_current}
                                                    value={exp.end_date}
                                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                            </div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.is_current|| false}
                                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked ? true : false)}
                                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                               <span className='text-sm text-gray-500'> Currently Working Here</span>
                                            </label>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-sm text-black border border-green-500 gap-1 px-2 py-1 text-white bg-green-400 rounded-lg">Description</label>
                                                    <button
                                                        onClick={() => handleEnhance(index)}
                                                        disabled={enhancingIndex === index}
                                                        className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg disabled:opacity-50"
                                                    >
                                                        {enhancingIndex === index ? (
                                                            <LoaderCircleIcon className="animate-spin size-4" />
                                                        ) : (
                                                            <Sparkles className="size-4" />
                                                        )}
                                                        <span className="max-sm:hidden">
                                                            {enhancingIndex === index ? "Enhancing..." : "Enhance with AI"}
                                                        </span>
                                                    </button>


                                                </div>
                                                <textarea
                                                    value={exp.description}
                                                    onChange={(e) => updateExperience(index, "description", e.target.value)}rows={5}
                                                    placeholder="Describe your role, responsibilities, and achievements."
                                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                                />
                                            </div>
                                        </div>                                        
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
    <p className="text-xs text-gray-700 text-center leading-5">
        <span className="font-bold text-blue-700">Tip:</span> Highlight your responsibilities, achievements, and measurable impact using action verbs and quantified results whenever possible.
    </p>
</div>
                                                    
                                            </div>
                              
    )
}
export default Experience