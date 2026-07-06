import React from 'react'; 

import { Mail, User, Phone, MapPin, BriefcaseBusiness,HandshakeIcon, Globe } from 'lucide-react';

const PersonalinfoForm = ({data,onChange,removeBackground,setRemoveBackground}) => {
    const handleChange=(field,value)=>{
        onChange({...data,[field]:value})
    }
    const fields= [
  {
    key: "full_name",
    label: "Full Name",
    icon: User,
    type: "text",
    required: true,
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
    type: "tel",
  },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    type: "text",
  },
  {
    key: "profession",
    label: "Profession",
    icon: BriefcaseBusiness,
    type: "text",
  },
  {
    key: "linkedin",
    label: "LinkedIn Profile",
    icon:HandshakeIcon,
    type: "url",
  },
  {
    key: "website",
    label: "Personal Website",
    icon: Globe,
    type: "url",
  },
]

  return (
    <div>
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-500">Add your personal information.</p>
        <div className='flex items-center gap-2'>
            <label>
                {data.image ? (
                    <img
                        src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                        alt="Profile-Image"
                        className="w-16 h-16 object-cover rounded-full mt-5 ring ring-slate-300 hover:opacity-80"
                    />
                ) : (
                    <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                        <User className='size-10 p-2.5 border rounded-full'/>
                        <span>Add Image</span>
                    </div>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleChange("image", e.target.files[0])} />
           {typeof data.image === "object" && (
  <label className="relative inline-flex items-center cursor-pointer mt-5 gap-3">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={removeBackground}
      onChange={() => setRemoveBackground((prev) => !prev)}
    />

    {/* Toggle Track */}
    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors duration-300"></div>

    {/* Toggle Knob */}
    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-5"></div>

    <span className="text-sm text-gray-700">
      Remove Background
    </span>
  </label>
)}
            </label>
        
        </div>
    {fields.map((field) => {
  const Icon = field.icon;

  return (
    <div key={field.key} className="space-y-1 mt-5">
      <label className="flex items-center gap-2 font-medium text-slate-600">
        <Icon className="size-5" />
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={field.type}
        value={data[field.key] || ""}
        onChange={(e) => handleChange(field.key, e.target.value)}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm text-slate-900"
        placeholder={`Enter your ${field.label.toLowerCase()}`}
        required={field.required}
      />
    </div>
  );
})}
    </div>
  )}

export default PersonalinfoForm