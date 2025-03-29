import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  { question: "How does RecipAI work?", answer: "RecipAI uses AI to recommend recipes based on your preferences and available ingredients." },
  { question: "Is RecipAI free to use?", answer: "Yes! RecipAI is free to use, with optional premium features for an enhanced experience." },
  { question: "Can I customize my dietary preferences?", answer: "Absolutely! RecipAI allows you to filter recipes based on your diet, allergies, and food restrictions." },
  { question: "Does RecipAI support different cuisines?", answer: "Yes! You can explore recipes from various cuisines worldwide, from Italian to Asian fusion." },
  { question: "How do I save my favorite recipes?", answer: "You can create an account and save your favorite recipes for easy access later." },
  { question: "What should I do if a recipe isn’t accurate?", answer: "You can report issues via our feedback section, and we continuously improve our AI recommendations." },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-10">Frequently Asked Questions</h1>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-5 rounded-lg shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-700"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </div>
              {openIndex === index && <p className="mt-3 text-gray-400">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
