import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import arushi from '../assets/arushi.png'; 
import soumil from '../assets/soumil.png'; 
import sanyam from '../assets/sanyam.png';
import aditya from '../assets/aditya.png' 

const developers = [
  {
    name: "Arushi",
    role: "Team Leader and Frontend Developer",
    bio: "[Short bio about the developer's experience and contributions]",
    image: arushi, // Placeholder image
    skills: ["React", "Express.Js", "Tailwind CSS"]
  },
  {
    name: "Soumil",
    role: "Frontend Developer",
    bio: "[Short bio about the developer's experience and contributions]",
    image:soumil, // Placeholder image
    skills: ["React", "Tailwind CSS"]
  },

  {
    name: "Sanyam",
    role: "Backend Engineer",
    bio: "[Short bio about the developer's experience and contributions]",
    image: sanyam, // Placeholder image
    skills: ["Node.js", "FastAPI", "MongoDB"]
  },
  {
    name: "Aditya",
    role: "AI Specialist",
    bio: "[Short bio about the developer's experience and contributions]",
    image: aditya, // Placeholder image
    skills: ["TensorFlow", "PyTorch", "NLP"]
  },
];

const features = [
  {
    title: "AI-Powered Summarization",
    description: "Extract key points from your notes using advanced NLP models",
    icon: "📝"
  },
  {
    title: "Interactive Mind Maps",
    description: "Visualize connections between concepts with dynamic graph rendering",
    icon: "🧠"
  },
  {
    title: "Quiz Generation",
    description: "Create customized quizzes to test your knowledge and improve retention",
    icon: "❓"
  },
  {
    title: "Topic Clustering",
    description: "Automatically group related concepts for better organization",
    icon: "🔄"
  },
  {
    title: "Customizable Quiz Difficulty",
    description: "Adjust question complexity based on your comfort level",
    icon: "🎚️"
  },
  {
    title: "Real-Time Processing",
    description: "Get instant results with our optimized AI pipeline",
    icon: "⚡"
  },
  {
    title: "Interactive Dashboard",
    description: "Track your progress and learning metrics over time",
    icon: "📊"
  }
];

const technologies = [
  { name: "React.js", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "FastAPI", icon: "🚀" },
  { name: "TensorFlow", icon: "📊" },
  { name: "PyTorch", icon: "🔥" },
  { name: "Spheron", icon: "🌐" }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const About = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            BrainVerse
          </h1>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
          />
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            An AI-powered study assistant designed to revolutionize how you learn, 
            organize knowledge, and retain information through interactive visualizations 
            and personalized quizzes.
          </p>
        </motion.div>

        <motion.div 
          className="bg-blue-950/50 backdrop-blur-md rounded-xl shadow-2xl p-6 mb-12 border border-blue-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex justify-center mb-6 bg-blue-900/30 rounded-lg p-1 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("features")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "features" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-blue-300 hover:bg-blue-800/50"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "tech" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-blue-300 hover:bg-blue-800/50"
              }`}
            >
              Tech Stack
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "team" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-blue-300 hover:bg-blue-800/50"
              }`}
            >
              Team
            </button>
          </div>

          {activeTab === "features" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-blue-700/30 shadow-lg hover:shadow-blue-600/10 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">{feature.title}</h3>
                  <p className="text-blue-100/80">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-300">
                  Our Technology Stack
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-blue-800/30 px-4 py-3 rounded-lg backdrop-blur-sm border border-blue-700/30 flex items-center gap-2"
                    >
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-950/80 rounded-lg p-6 border border-blue-800/50"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-300">Deployment Architecture</h3>
                <p className="mb-4 text-blue-100/80">
                  BrainVerse leverages Spheron's decentralized GPU network for high-performance 
                  AI processing, ensuring low-latency responses and scalability during peak usage.
                </p>
                <div className="bg-blue-900/50 p-4 rounded-lg">
                  <pre className="text-sm text-blue-200 overflow-x-auto">
                    {`Client → CDN → React Frontend → API Gateway → Microservices → GPU Processing Nodes`}
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid md:grid-cols-3 gap-8"
            >
              {developers.map((dev, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-b from-blue-800/40 to-blue-900/40 rounded-xl overflow-hidden shadow-xl border border-blue-700/30 flex flex-col"
                >
                  <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="absolute -bottom-10 left-0 w-full flex justify-center">
                      <img 
                        src={dev.image} 
                        alt={dev.name} 
                        className="w-24 h-24 rounded-full border-4 border-blue-950"
                      />
                    </div>
                  </div>
                  <div className="pt-12 p-4 text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1">{dev.name}</h3>
                    <p className="text-blue-300 mb-3">{dev.role}</p>
                    <p className="text-blue-100/80 text-sm mb-4 flex-1">{dev.bio}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-auto">
                      {dev.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-blue-700/30 px-2 py-1 rounded text-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center text-blue-400/80 text-sm mt-12"
        >
          <p>© {new Date().getFullYear()} BrainVerse  • Revolutionizing Study Methods with AI</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
