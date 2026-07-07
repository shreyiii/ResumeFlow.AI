import React from "react";
import ClassicTemplate from "../assets/assets/templates/ClassicTemplate";
import ModernTemplate from "../assets/assets/templates/ModernTemplate";
import MinimalTemplate from "../assets/assets/templates/MinimalTemplate";
import MinimalImageTemplate from "../assets/assets/templates/MinimalImageTemplate";

const ResumePreview = ({
  data,
  accentColor,
  template,
  classes = "",
}) => {

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return (
          <ClassicTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      case "modern":
        return (
          <ModernTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      case "minimal":
        return (
          <MinimalTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      case "minimal-image":
        return (
          <MinimalImageTemplate
            data={data}
            accentColor={accentColor}
          />
        );

      default:
        return (
          <ClassicTemplate
            data={data}
            accentColor={accentColor}
          />
        );
    }
  };

  return (
    <div className={"w-full bg-gray-100 " + classes}>
      <div
        id="resume-preview"
        className="border border-gray-200 print:border-none print:shadow-none"
      >
        {renderTemplate()}
      </div>

      <style>{`
        @page{
          size:A4;
          margin:1cm;
        }
        
        @media print {
  @page {
    size: A4;
    margin: 10mm;
  }

  body {
    margin: 0;
  }

  #resume-preview {
    width: 100%;
    box-shadow: none !important;
    border: none !important;
  }
}

       
      `}
      </style>
    </div>
  );
};

export default ResumePreview;