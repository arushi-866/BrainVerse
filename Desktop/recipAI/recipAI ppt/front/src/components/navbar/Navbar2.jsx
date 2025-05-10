import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from "/src/assets/logo.png";

const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-black/80 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center h-24">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
            <img src={logo} alt="RecipAI Logo" width={80} height={80} className="rounded-full" />
          </motion.div>
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400 tracking-tight">
            RecipAI
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          {['Home', 'Recipes', 'Calorie Tracker', 'Community'].map((item, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.1 }}
              className="relative text-gray-300 hover:text-indigo-400 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Login & Signup Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-indigo-500 text-black font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
            >
              Login
            </motion.button>
          </Link>

          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-teal-500 text-black font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Signup
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar2;
