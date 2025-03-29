import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const termsData = [
  { 
    title: "Acceptance of Terms", 
    content: "By accessing and using RecipAI, you agree to be bound by these terms and conditions. If you do not agree, please do not use our service."
  },
  { 
    title: "User Responsibilities", 
    content: "You are responsible for ensuring that any information you provide is accurate and that you comply with all applicable laws while using RecipAI."
  },
  { 
    title: "Privacy Policy", 
    content: "We value your privacy. Your personal data is handled according to our Privacy Policy, which explains how we collect and use your information."
  },
  { 
    title: "Limitations of Liability", 
    content: "RecipAI is provided as is. We do not guarantee the accuracy of recipes or advice, and we are not liable for any issues arising from their use."
  },
  { 
    title: "Modifications to Terms", 
    content: "We reserve the right to update these terms at any time. Continued use of RecipAI after changes means you accept the new terms."
  },
];

const Terms = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-10">Terms & Conditions</h1>
        <p className="text-gray-400 text-center mb-6">
          Please read these terms carefully before using RecipAI.
        </p>

        {/* Terms List */}
        <div className="space-y-4">
          {termsData.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-5 rounded-lg shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-700"
              onClick={() => toggleSection(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </div>
              {openIndex === index && <p className="mt-3 text-gray-400">{item.content}</p>}
            </div>
          ))}
        </div>

        {/* Agreement Notice */}
        <div className="mt-10 text-center">
          <p className="text-gray-400">By continuing to use RecipAI, you agree to these terms.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
