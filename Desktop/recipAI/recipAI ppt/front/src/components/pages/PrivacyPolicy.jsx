import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const privacyData = [
  { 
    title: "Data Collection", 
    content: "We collect minimal data necessary for improving your experience, such as saved recipes and user preferences. No personal data is shared without consent."
  },
  { 
    title: "How We Use Your Data", 
    content: "Your data is used to personalize recipe recommendations and improve our AI's accuracy. We do not sell your data to third parties."
  },
  { 
    title: "Third-Party Sharing", 
    content: "We do not share your data with advertisers. However, anonymized usage statistics may be used to enhance our service."
  },
  { 
    title: "Security Measures", 
    content: "We use encryption and secure servers to protect your data. Regular audits are conducted to ensure compliance with privacy laws."
  },
  { 
    title: "Your Rights", 
    content: "You can request access, modification, or deletion of your data at any time. Contact our support team for assistance."
  },
];

const Privacy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-10">Privacy Policy</h1>
        <p className="text-gray-400 text-center mb-6">
          Your privacy is important to us. We ensure your data is handled responsibly.
        </p>

        {/* Privacy Sections */}
        <div className="space-y-4">
          {privacyData.map((item, index) => (
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
          <p className="text-gray-400">
            By using RecipAI, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
