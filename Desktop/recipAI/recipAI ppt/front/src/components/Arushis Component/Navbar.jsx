import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Menu, X, ChefHat } from "lucide-react";
import logo from '../assets/logo.png'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-black/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center h-24">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            // className="bg-gradient-to-br from-orange-600 to-yellow-500 p-3 rounded-full shadow-lg"
          >
            <img src={logo} alt="" width={80} height={80} className="rounded-full"/>
          </motion.div>
          <span className="text-3xl font-extrabold bg-clip-text text-transparent  bg-gradient-to-r from-indigo-400 to-teal-400 tracking-tight">
            RecipAI
          </span>
        </div>

        {/* Navigation Links */}
        <div className={`hidden md:flex space-x-8 text-lg font-semibold`}>
          {["Home", "Recipes", "Calorie Tracker", "Community"].map(
            (item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="relative text-gray-300 hover:text-indigo-400 transition duration-300
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-teal-500 
                after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </motion.a>
            )
          )}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          {!isLoggedIn ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-indigo-500 text-black font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-teal-500 text-black font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
              >
                Signup
              </motion.button>
            </>
          ) : (
            <User
              className="text-gray-300 hover:text-orange-400 transition duration-300"
              size={28}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-orange-400 transition duration-300"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 shadow-lg p-5 flex flex-col space-y-4"
        >
          {["Home", "Recipes", "Calorie Tracker", "Community"].map(
            (item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-orange-400 transition duration-300 text-lg
                relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </motion.a>
            )
          )}
          {!isLoggedIn && (
            <div className="flex flex-col space-y-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-orange-500 text-black font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
              >
                Signup
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
