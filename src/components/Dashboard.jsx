import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


  const features = [
    {
      name: "AI-Powered Summarization",
      icon: "📝",
      description: "Transform lengthy documents into concise summaries using advanced natural language processing. Our AI identifies key points and maintains context while reducing content by up to 80%.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Interactive Mind Maps",
      icon: "🧠",
      description: "Visualize complex information hierarchies with dynamic, interactive mind maps. Click to expand nodes, drag to reorganize concepts, and see relationships between ideas instantly.",
      color: "from-purple-400 to-indigo-600"
    },
    {
      name: "Quiz Generation",
      icon: "❓",
      description: "Automatically generate quizzes from your content with customizable question types (multiple choice, true/false, short answer). Adjust difficulty levels and question focus areas.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      name: "Topic Clustering",
      icon: "🔍",
      description: "Our algorithm groups related concepts together, revealing hidden patterns in your material. Perfect for identifying core themes in research or organizing lecture notes.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      name: "Customizable Quiz Difficulty",
      icon: "⚙️",
      description: "Tailor quiz questions to match your proficiency level. Our adaptive system learns from your responses to provide the optimal challenge level for effective learning.",
      color: "from-amber-400 to-orange-500"
    },
    {
      name: "Real-Time Processing",
      icon: "⚡",
      description: "Experience near-instantaneous analysis as you type. Watch summaries, mind maps, and quizzes update live with each keystroke for seamless workflow integration.",
      color: "from-pink-400 to-rose-500"
    },
    {
      name: "Interactive Dashboard",
      icon: "📊",
      description: "Your centralized learning hub with progress tracking, knowledge heatmaps, and personalized recommendations based on your learning patterns and quiz performance.",
      color: "from-violet-400 to-purple-500"
    },
    {
      name: "Community Collaborative Study",
      icon: "👥",
      description: "Engage in shared learning with study groups, collaborative note-taking, and real-time discussions. Work together with peers to enhance understanding and retention.",
      color: "from-green-400 to-blue-600"
    }
  ];


const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);
  const [isHovering, setIsHovering] = useState(null);

  // Auto-rotate features for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedFeature(prev => {
        const currentIndex = features.findIndex(f => f.name === prev.name);
        return features[(currentIndex + 1) % features.length];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen py-16 bg-midnight-900 text-gray-100 overflow-hidden">
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
            🧠
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
            BrainVerse
          </h2>
        </motion.div>

        <ul className="space-y-2 flex-1">
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
                selectedFeature.name === feature.name 
                  ? `bg-gradient-to-r ${feature.color} shadow-lg` 
                  : "hover:bg-midnight-700"
              }`}
              onClick={() => setSelectedFeature(feature)}
            >
              <span className="text-xl">{feature.icon}</span>
              <span>{feature.name}</span>
              {isHovering === index && (
                <motion.span 
                  className="absolute right-4 text-xs bg-midnight-900 px-2 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Explore
                </motion.span>
              )}
            </motion.li>
          ))}
        </ul>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-auto bg-midnight-700 rounded-lg p-4 border border-midnight-600"
        >
          <div className="text-sm text-gray-300">New feature coming soon</div>
          <div className="font-medium">Collaborative Learning</div>
          <div className="text-xs text-gray-400 mt-1">Study together in real-time</div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFeature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <motion.div 
                  className="bg-midnight-800 rounded-xl p-6 border border-midnight-700 hover:border-indigo-400 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></span>
                    Key Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Saves time on content review and study preparation
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Improves information retention through active engagement
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 mr-2">✓</span>
                      Adapts to your unique learning style and pace
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="bg-midnight-800 rounded-xl p-6 border border-midnight-700 hover:border-indigo-400 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></span>
                    Example Use Case
                  </h3>
                  <p className="text-gray-300">
                    {selectedFeature.name === "AI-Powered Summarization" 
                      ? "Upload a 50-page research paper and get a 2-page executive summary highlighting key findings, methodology, and conclusions."
                      : selectedFeature.name === "Interactive Mind Maps" 
                      ? "Convert lecture notes into a visual knowledge graph showing relationships between concepts, with color-coding by importance."
                      : "Generate a 10-question quiz from your textbook chapter, with questions weighted toward areas you've struggled with previously."}
                  </p>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12 bg-gradient-to-r from-midnight-800 to-midnight-900 rounded-xl p-8 border border-midnight-700 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-900 opacity-20 blur-xl"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-900 opacity-20 blur-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Ready to experience {selectedFeature.name}?</h3>
                  <p className="text-gray-300 mb-6">Try it now with your own content or explore our demo materials.</p>
                  <div className="flex space-x-4">
                    <motion.button 
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg font-medium shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Upload Content
                    </motion.button>
                    <motion.button 
                      className="px-6 py-3 bg-midnight-700 border border-midnight-600 rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Demo
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;