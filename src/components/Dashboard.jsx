import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  {
    name: "AI-Powered Summarization",
    icon: "📝",
    description: "Transform lengthy documents into concise summaries using advanced natural language processing. Our AI identifies key points and maintains context while reducing content by up to 80%.",
    color: "from-blue-400 to-indigo-500",
    keyBenefits: [
      "Reduce reading time by up to 80%",
      "Maintain critical context in summaries",
      "Supports 15+ document formats"
    ],
    exampleUseCase: "Instantly condense a 50-page research paper into key findings and conclusions while preserving technical details.",
    route: "/summarization"
  },
  {
    name: "Interactive Mind Maps",
    icon: "🧠",
    description: "Visualize complex information hierarchies with dynamic, interactive mind maps. Click to expand nodes, drag to reorganize concepts, and see relationships between ideas instantly.",
    color: "from-purple-400 to-indigo-600",
    keyBenefits: [
      "Visualize concept relationships",
      "Drag-and-drop reorganization",
      "Export as image or PDF"
    ],
    exampleUseCase: "Convert lecture notes into a color-coded knowledge graph showing connections between historical events.",
    route: "/mindmap"
  },
  {
    name: "Quiz Generation",
    icon: "❓",
    description: "Automatically generate quizzes from your content with customizable question types (multiple choice, true/false, short answer). Adjust difficulty levels and question focus areas.",
    color: "from-cyan-400 to-blue-500",
    keyBenefits: [
      "Multiple question types",
      "Adaptive difficulty levels",
      "Performance analytics"
    ],
    exampleUseCase: "Create a practice quiz from textbook chapters with questions weighted toward upcoming exam topics.",
    route: "/quiz"
  },
  {
    "name": "Flash Cards",
    "icon": "📖",
    "description": "Enhance your learning with interactive flash cards, designed to help with memorization and quick recall of key concepts. Ideal for students and professionals alike.",
    "color": "from-yellow-400 to-orange-500",
    "keyBenefits": [
      "Efficient memorization",
      "Active recall technique",
      "Customizable learning experience"
    ],
    "exampleUseCase": "Create flash cards to study medical terminology for an upcoming exam.",
    "route": "/flashcards"
  },
  
  {
    name: "Real-Time Processing",
    icon: "⚡",
    description: "Experience near-instantaneous analysis as you type. Watch summaries, mind maps, and quizzes update live with each keystroke for seamless workflow integration.",
    color: "from-pink-400 to-rose-500",
    keyBenefits: [
      "Instant updates",
      "Live collaboration",
      "Version history"
    ],
    exampleUseCase: "Collaborate with teammates on a shared document with real-time mind map updates during editing.",
    route: "/realtime"
  },
  {
    name: "Community Collaborative Study",
    icon: "👥",
    description: "Engage in shared learning with study groups, collaborative note-taking, and real-time discussions. Work together with peers to enhance understanding and retention.",
    color: "from-green-400 to-blue-600",
    keyBenefits: [
      "Shared workspaces",
      "Real-time chat",
      "Collaborative annotation"
    ],
    exampleUseCase: "Organize a virtual study group with classmates to prepare for final exams through shared resources.",
    route: "/community"
  }
];

const Dashboard = ({ userName }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleTryFeature = (feature) => {
    navigate(feature.route);
  };

  return (
    <div className="flex h-screen bg-midnight-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-midnight-800 border-r border-midnight-700 p-6 space-y-8 flex flex-col"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-xl">
            �
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            BrainVerse
          </h2>
        </motion.div>

        <div className="flex-1">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                  selectedFeature?.name === feature.name 
                    ? `bg-gradient-to-r ${feature.color} shadow-lg` 
                    : "hover:bg-midnight-700"
                }`}
                onClick={() => setSelectedFeature(feature)}
              >
                <span className="text-xl">{feature.icon}</span>
                <span>{feature.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto p-3 rounded-lg bg-midnight-700 hover:bg-midnight-600 transition-colors duration-300 flex items-center space-x-2"
        >
          <span>👋</span>
          <span>Logout</span>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedFeature ? (
            <motion.div
              key={selectedFeature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 p-8 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-8">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-r ${selectedFeature.color}`}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  >
                    {selectedFeature.icon}
                  </motion.div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">
                    {selectedFeature.name}
                  </h1>
                </div>

                <motion.p 
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedFeature.description}
                </motion.p>

                {/* Try It Section */}
                <motion.div 
                  className="mt-8 bg-gradient-to-r from-midnight-800 to-midnight-900 rounded-xl p-8 border border-midnight-700 relative overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Try {selectedFeature.name}</h3>
                    <div className="flex justify-center space-x-4">
                      <motion.button 
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg font-medium shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleTryFeature(selectedFeature)}
                      >
                        Start Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Key Benefits and Use Case */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <motion.div 
                    className="bg-midnight-800 rounded-xl p-6 border border-midnight-700"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold mb-3">Key Benefits</h3>
                    <ul className="space-y-2 text-gray-300">
                      {selectedFeature.keyBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-400 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-midnight-800 rounded-xl p-6 border border-midnight-700"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-lg font-semibold mb-3">Example Use Case</h3>
                    <p className="text-gray-300">
                      {selectedFeature.exampleUseCase}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Welcome Screen
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 p-8 overflow-y-auto"
            >
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-4">Hello, {userName}!</h1>
                  <p className="text-xl text-gray-300">
                    Welcome to BrainVerse - Your AI-Powered Learning Companion
                  </p>
                </div>
                <motion.div 
                  className="bg-midnight-800 rounded-xl p-8 border border-midnight-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                  <p className="text-gray-300 mb-6">
                    Select a feature from the sidebar to begin transforming your learning experience.
                    Here's what you can do:
                  </p>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      Upload documents for instant analysis
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      Create interactive study materials
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      Collaborate with study groups
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      Track your learning progress
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;