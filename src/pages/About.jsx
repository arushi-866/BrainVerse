import React from "react";
import { ChefHat, Heart, Search, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300 px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">About RecipAI</h1>
        <p className="text-lg mt-3 text-gray-400">
          Your <span className="text-gray-200 font-semibold">AI-powered kitchen assistant</span> for discovering, organizing, and enjoying delicious recipes effortlessly!
        </p>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Feature Cards */}
        {[
          { Icon: ChefHat, title: "Smart Recipe Suggestions", text: "Enter ingredients and get instant recipes!" },
          { Icon: Search, title: "Advanced Search", text: "Filter by diet, cuisine, and difficulty." },
          { Icon: Heart, title: "Save & Share", text: "Save favorites and share with friends." },
          { Icon: Sparkles, title: "AI Chat Assistant", text: "Get instant cooking advice from AI." },
        ].map(({ Icon, title, text }, index) => (
          <div key={index} className="flex items-center space-x-4 p-5 rounded-lg bg-gray-800/50 text-gray-300 shadow-lg backdrop-blur-lg transition transform hover:scale-105 hover:bg-gray-700/60">
            <Icon className="h-14 w-14 text-gray-200" />
            <div>
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="text-gray-400">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Start Cooking with RecipAI!</h2>
        <p className="text-lg text-gray-400">Discover amazing recipes and unleash your inner chef today.</p>
        <button className="mt-6 px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
          Explore Recipes
        </button>
      </div>
    </div>
  );
};

export default About;
