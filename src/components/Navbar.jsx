import React, { useState, useEffect } from 'react';
import { Brain, Menu, X, Bell, User, Search, LogOut, Settings, ChevronDown } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchValue, setSearchValue] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle login state (for demo purposes)
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  
  // Notification handler
  const clearNotifications = () => {
    setNotifications(0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setProfileOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-gray-900 py-4 shadow-md shadow-black/20'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-semibold text-white">
            Br<span className="text-blue-400"></span>ai<span className="text-xl font-semibold text-white"></span>n<span className="text-blue-400">Verse</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
              Dashboard
            </button>
            <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
              Studies
            </button>
            <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
              Analytics
            </button>
            <button className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
              Resources
            </button>
          </div>
          
          {/* Right Menu Items */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-48 bg-gray-800 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-200 text-sm text-gray-200 placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {/* Conditional rendering based on authentication state */}
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button 
                    className="p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                    onClick={clearNotifications}
                  >
                    <Bell className="h-5 w-5 text-gray-300" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 h-5 w-5 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* User Profile Dropdown */}
                <div className="relative z-50" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-blue-400 overflow-hidden">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-200">John Smith</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-200">John Smith</p>
                        <p className="text-xs text-gray-400">john.smith@example.com</p>
                        <p className="text-xs text-gray-400 mt-1">Administrator</p>
                      </div>
                      <div className="py-2">
                        <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                          <User className="h-4 w-4 mr-3 text-gray-400" />
                          Your Profile
                        </a>
                        <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                          <Settings className="h-4 w-4 mr-3 text-gray-400" />
                          Account Settings
                        </a>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button 
                          onClick={toggleLoginState}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <LogOut className="h-4 w-4 mr-3 text-gray-400" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button 
                  onClick={toggleLoginState}
                  className="text-gray-300 hover:text-blue-400 font-medium px-4 py-2 text-sm transition-colors duration-200"
                >
                  Log In
                </button>
                
                {/* Get Started Button */}
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-800 px-4 py-4 space-y-3 bg-gray-900">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 rounded-md py-2 pl-9 pr-4 focus:outline-none text-sm text-gray-200 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200">
            Dashboard
          </button>
          <button className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200">
            Studies
          </button>
          <button className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200">
            Analytics
          </button>
          <button className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200">
            Resources
          </button>
          
          {isLoggedIn ? (
            <>
              <div className="flex items-center py-2">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-blue-400">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-200">John Smith</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
              <div className="border-t border-gray-800 my-2"></div>
              <button className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Account Settings
              </button>
              <button 
                onClick={toggleLoginState}
                className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-gray-800 my-2"></div>
              <button 
                onClick={toggleLoginState}
                className="block w-full text-left py-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Log In
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-200 mt-2">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Demo toggle for login/logout (remove in production) */}
      <div className="fixed bottom-4 right-4 bg-gray-800 shadow-md rounded-md p-2 text-xs font-medium text-gray-300 border border-gray-700">
        <button onClick={toggleLoginState} className="px-2 py-1">
          Demo: Toggle Login State
        </button>
      </div>
    </nav>
  );
}

export default Navbar;