import { Sparkles, LoaderCircleIcon } from 'lucide-react';
import React, { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const ProfessionalSummary = ({ data, onChange }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleEnhance = async () => {
        if (!data || !data.trim()) {
            toast.error("Please write some summary first to enhance");
            return;
        }

        setIsEnhancing(true);
        try {
            const token = localStorage.getItem('token');
            const response = await api.post(
                "/api/ai/enhanceProfessionalSummary",
                { userContent: data },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data?.enhancedContent) {
                onChange(response.data.enhancedContent);
                toast.success("Summary enhanced successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Failed to enhance summary"
            );
        } finally {
            setIsEnhancing(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500">
                        A brief overview of your professional background and key skills.
                    </p>
                </div>
                <button
                    onClick={handleEnhance}
                    disabled={isEnhancing}
                    className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg disabled:opacity-50"
                >
                    {isEnhancing ? (
                        <LoaderCircleIcon className="animate-spin size-4" />
                    ) : (
                        <Sparkles className="size-4" />
                    )}
                    <span className="max-sm:hidden">{isEnhancing ? "Enhancing..." : "AI Enhance"}</span>
                </button>
            </div>
            <div className="mt-6">
                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={7}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Write your professional summary here..."
                />
                <div className="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <p className="text-xs text-gray-700 text-center leading-5">
                        <span className="font-bold text-blue-700">Tip:</span> Write a concise 3–4 sentence summary highlighting your experience, key skills, achievements, and career goals.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalSummary;