import React, { useEffect } from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    // Add page entry animation
    document.body.classList.add('loaded');
    
    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const hoverEffect = {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 40, 0.3)",
    transition: { duration: 0.3 }
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100">
      <motion.div 
        className="max-w-4xl mx-auto bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-blue-700/30"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute top-0 left-0 w-full h-48 bg-blue-500/10 blur-3xl rounded-full -z-10"></div>
        
        <motion.div 
          className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-600/40"
          variants={itemVariants}
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
            Privacy Policy
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-sm text-blue-300 mb-8 italic"
          variants={itemVariants}
        >
          Effective Date: March 30, 2025
        </motion.p>
        
        <div className="space-y-8">
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to BrainVerse, an AI-powered study assistant designed to help users
                summarize notes, generate interactive mind maps, and create quizzes for
                efficient learning. We value your privacy and are committed to protecting your
                personal information.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                2. Information We Collect
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-300 text-xs">01</span>
                  </span>
                  <span><strong className="text-blue-200">Personal Information:</strong> Name, email address, and profile preferences.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-300 text-xs">02</span>
                  </span>
                  <span><strong className="text-blue-200">User-Generated Content:</strong> Text, notes, or documents you input.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-300 text-xs">03</span>
                  </span>
                  <span><strong className="text-blue-200">Usage Data:</strong> Interactions, feature usage, and quiz performance.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-300 text-xs">04</span>
                  </span>
                  <span><strong className="text-blue-200">Device Information:</strong> IP address, browser type, and operating system.</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                3. How We Use Your Information
              </h2>
              <ul className="space-y-2 text-gray-300">
                {[
                  "Provide and improve BrainVerse's features.",
                  "Generate summaries, mind maps, and quizzes.",
                  "Personalize the user experience.",
                  "Analyze usage and optimize learning recommendations.",
                  "Ensure compliance with legal obligations."
                ].map((item, index) => (
                  <li key={index} className="flex items-center group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                4. Data Sharing and Storage
              </h2>
              <p className="text-gray-300 leading-relaxed">
                BrainVerse does not sell or rent your personal data. Your input data is processed
                securely and stored on Spheron's decentralized GPU network with end-to-end encryption.
              </p>
              <div className="mt-4 bg-blue-900/30 p-3 rounded-lg border border-blue-800/50">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-blue-200">Your data is never sold to third parties.</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                5. Security Measures
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We implement encryption, access controls, and authentication mechanisms to
                protect your data. Our security team regularly audits our systems to ensure
                compliance with best practices in data protection.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: "🔒", text: "256-bit Encryption" },
                  { icon: "🛡️", text: "Regular Security Audits" },
                  { icon: "🔐", text: "Secure Authentication" }
                ].map((item, index) => (
                  <div key={index} className="bg-blue-900/20 p-2 rounded-lg text-center border border-blue-800/30 hover:bg-blue-800/30 transition-colors duration-300">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-xs text-blue-200">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to access, update, delete, or opt out of data collection. To
                exercise these rights, contact us at <a href="mailto:privacy@brainverse.io" className="text-blue-300 underline hover:text-blue-200 transition-colors duration-300">privacy@brainverse.io</a>.
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {["Access", "Update", "Delete", "Opt-Out"].map((right, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-full aspect-square rounded-lg bg-blue-900/30 flex items-center justify-center mb-2 border border-blue-700/30 group-hover:bg-blue-800/40 group-hover:border-blue-600/40 transition-all duration-300">
                      <span className="text-lg font-semibold text-blue-300 group-hover:scale-110 transition-transform duration-300">{right}</span>
                    </div>
                    <span className="text-xs text-gray-400">Your Right</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                7. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this policy periodically. Continued use of BrainVerse after changes
                constitutes acceptance. Users will be notified of significant changes via email
                or through an in-app notification.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="group"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <div className="bg-gray-800/70 p-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                8. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For any privacy-related inquiries, please reach out to us at:
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex items-center justify-between">
                <div>
                  <div className="text-blue-200 font-medium">Email:</div>
                  <a href="mailto:privacy@brainverse.io" className="text-blue-300 hover:text-blue-100 transition-colors duration-300">privacy@brainverse.io</a>
                </div>
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-6 border-t border-blue-800/30 text-center text-sm text-blue-300/60"
          variants={itemVariants}
        >
          <p>© 2025 BrainVerse. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Terms of Service</a>
            <span className="text-blue-700">•</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Privacy Policy</a>
            <span className="text-blue-700">•</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Contact</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;