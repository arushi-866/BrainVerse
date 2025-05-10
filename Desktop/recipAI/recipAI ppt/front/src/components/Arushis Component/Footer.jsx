import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className=" bg-gradient-to-r from-indigo-400 to-teal-400 p-2 rounded-full shadow-lg">
              <span className="text-white text-xl font-bold">RecipAI</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-400 max-w-xs">
            Your AI-powered companion for discovering, organizing, and enjoying recipes effortlessly.
          </p>
        </div>

        {/* Legal & Info */}
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
          <Link to="/about" className="hover:text-orange-500 transition">About Us</Link>
          <Link to="/faqs" className="hover:text-orange-500 transition">FAQs</Link>
          <Link to="/terms" className="hover:text-orange-500 transition">Terms & Conditions</Link>
          {/* <Link to="/privacy" className="hover:text-orange-500 transition">Privacy Policy</Link> */}
        </nav>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-orange-500 transition"><Facebook size={20} /></a>
          <a href="#" className="hover:text-orange-500 transition"><Twitter size={20} /></a>
          <a href="#" className="hover:text-orange-500 transition"><Instagram size={20} /></a>
          <a href="mailto:support@recipai.com" className="hover:text-orange-500 transition"><Mail size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-sm border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} RecipAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
