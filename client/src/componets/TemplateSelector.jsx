import React, { useState } from 'react';
import { LayoutTemplate, Check } from 'lucide-react';
const TemplateSelector = ({selectedTemplate,onChange}) => {
    const[isOpen,setIsOpen]=useState(false);
    const templates=[
        {id:'classic',name:'Classic',preview:"A traditional and elegant template with a clean layout, suitable for professionals seeking a timeless look."},
        {id:'modern',name:'Modern',preview:"A contemporary template with a modern design, ideal for creative professionals."},
        {id:'minimal',name:'Minimal',preview:"A clean and simple template focused on readability and clarity."},
        {id:'minimal-image',name:'Minimal Image',preview:"A minimalist template that emphasizes the use of images to convey information."}
    ]
  return (
    <div className="relative">
           {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-3 py-2 rounded-lg"
      >
        <LayoutTemplate size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-72 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 text-blue-500">
                    <div className="flex items-center gap-1 text-sm font-medium justify-center text-green-600 bg-gradient-to-br from-green-50 to-green-100 ring-1 ring-green-300 hover:ring-green-400 transition-all px-2 py-1 rounded-lg">
                  <Check className="w-4 h-4 text-violet-600" />
            </div>
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <div className="text-sm text-italic text-gray-500 mt-2 p-2 bg-green-50 rounded-text-xs">{template.preview}</div>
              </div>
            </div>
                

          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
      