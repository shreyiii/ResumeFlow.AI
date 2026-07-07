import React, { useState } from "react";
import { Check, Palette } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Purple", value: "#6366F1" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#FBBF24" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Pink", value: "#EC4899" },
    { name: "Violet", value: "#8B5CF6" },
    { name: "Cyan", value: "#22D3EE" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Indigo", value: "#4F46E5" },
    { name: "Gray", value: "#6B7280" },
    { name: "Emerald", value: "#059669" },
    { name: "Fuchsia", value: "#D946EF" },
    { name: "Crimson", value: "#E11D48" },
    { name: "Lime", value: "#84CC16" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Sky", value: "#0EA5E9" },
    { name: "Slate", value: "#64748B" },
    { name: "Zinc", value: "#71717A" },
    { name: "Stone", value: "#78716C" },
    { name: "Neutral", value: "#3F3F46" },
    
    
  
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Color</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-20">

          <div className="grid grid-cols-4 gap-3">

            {colors.map((color) => (
              <div
                key={color.value}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
              >
                <div
                  className="relative w-8 h-8 rounded-full border-2 border-transparent group-hover:border-gray-500 transition"
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-center mt-1">
                  {color.name}
                </p>
              </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
};

export default ColorPicker;