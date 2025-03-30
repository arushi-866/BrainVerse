import { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, Settings, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; // Ensure correct path to your logo image

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState(3); // Example notifications count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

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
          <img src={logo} alt="BrainVerse Logo" width="80" height="80" className='rounded-full'/>
          <span className="text-xl font-semibold text-white">
            Br<span className="text-blue-400">ai</span>n<span className="text-blue-400">Verse</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="text-gray-300 hover:text-blue-400 font-medium">Dashboard</button>
          <button className="text-gray-300 hover:text-blue-400 font-medium">Studies</button>
          <button className="text-gray-300 hover:text-blue-400 font-medium">Analytics</button>
          <button className="text-gray-300 hover:text-blue-400 font-medium">Resources</button>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-48 bg-gray-800 rounded-md py-2 pl-9 pr-4 focus:ring-1 focus:ring-blue-500 text-sm text-gray-200 placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 rounded-md hover:bg-gray-800" onClick={clearNotifications}>
                  <Bell className="h-5 w-5 text-gray-300" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {/* User Profile Dropdown */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-800" onClick={() => setProfileOpen(!profileOpen)}>
                    <User className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium text-gray-200">John Smith</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <p className="text-sm font-medium text-gray-200">John Smith</p>
                        <p className="text-xs text-gray-400">john.smith@example.com</p>
                      </div>
                      <button onClick={toggleLoginState} className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        <LogOut className="h-4 w-4 mr-3" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleLoginState} className="text-gray-300 hover:text-blue-400 font-medium px-4 py-2">Log In</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">Get Started</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
