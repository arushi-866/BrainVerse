import React, { useState, useEffect } from "react";
import { Mail, Twitter, Linkedin, ChevronRight, Send } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(false);
  
  useEffect(() => {
    // Start animations after component mounts
    setAnimatedItems(true);
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.scroll-animate').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-blue-950 to-slate-900 text-white py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-400/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                filter: 'blur(8px)',
                opacity: Math.random() * 0.5,
                transform: 'translate(-50%, -50%)',
                animation: `pulse ${Math.random() * 8 + 4}s infinite alternate ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-900/20 to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & About - spans 4 columns on md+ */}
          <div className={`md:col-span-4 transform transition duration-1000 ${animatedItems ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="group perspective relative">
              <div className="transition duration-700 transform group-hover:scale-105">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">BrainVerse</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 mb-4 transform transition-all duration-500 group-hover:w-32 group-hover:scale-105 origin-left" />
              </div>
              <p className="mt-2 text-blue-200 leading-relaxed max-w-md">
                AI-powered study assistant that revolutionizes learning through neural mapping and personalized study paths.
              </p>
              
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30 backdrop-blur-sm transform transition duration-500 hover:translate-x-1 hover:translate-y-1">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Mail size={16} className="text-navy-900" />
                  </div>
                  <div className="ml-3">
                    <p className="text-blue-100 text-sm">Need assistance?</p>
                    <a href="mailto:support@BrainVerse.ai" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                      support@BrainVerse.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links - spans 3 columns on md+ */}
          <div className={`md:col-span-3 transform transition duration-1000 delay-200 ${animatedItems ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-xl font-semibold text-white relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </h3>
            <ul className="mt-6 space-y-3">
              <li className="group">
                <Link 
                  to="/" 
                  className="flex items-center text-blue-200 hover:text-cyan-300 transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-cyan-400">
                    <ChevronRight size={14} />
                  </span>
                  Home
                </Link>
              </li>
              <li className="group">
                <Link 
                  to="/about" 
                  className="flex items-center text-blue-200 hover:text-cyan-300 transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-cyan-400">
                    <ChevronRight size={14} />
                  </span>
                  About
                </Link>
              </li>
              <li className="group">
                <Link 
                  to="/contactpage" 
                  className="flex items-center text-blue-200 hover:text-cyan-300 transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-cyan-400">
                    <ChevronRight size={14} />
                  </span>
                  Contact
                </Link>
              </li>
              <li className="group">
                <Link 
                  to="/PrivacyPolicy" 
                  className="flex items-center text-blue-200 hover:text-cyan-300 transition-all duration-300 transform hover:translate-x-1"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-1 text-cyan-400">
                    <ChevronRight size={14} />
                  </span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media & Newsletter - spans 5 columns on md+ */}
          <div className={`md:col-span-5 transform transition duration-1000 delay-400 ${animatedItems ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-xl font-semibold text-white relative mb-4">
              Connect with Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              {[
                { icon: <Twitter size={20} />, name: "Twitter", color: "bg-gradient-to-br from-blue-400 to-blue-600" },
                { icon: <Linkedin size={20} />, name: "LinkedIn", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
                {icon: <FaGithub size={20}  />, name: "GitHub", color: "bg-gradient-to-br from-gray-700 to-gray-900" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="group flex items-center"
                  aria-label={social.name}
                >
                  <div className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center shadow-lg transition duration-300 transform group-hover:scale-110`}>
                    <div className="text-white">
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white relative">
                Subscribe for Updates
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
              </h3>
              
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30 backdrop-blur-sm">
                <p className="text-blue-200 text-sm mb-3">
                  Stay informed about the latest AI learning innovations
                </p>
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 pr-12 rounded-lg bg-blue-950/80 border border-blue-700/50 text-white placeholder-blue-400/70 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-300 hover:text-cyan-200 p-1"
                  >
                    <Send size={20} className="transform transition-transform hover:translate-x-1" />
                  </button>
                </form>
                
                {/* Success message */}
                <div 
                  className={`mt-2 text-sm text-cyan-300 transition-all duration-300 ${isSubscribed ? 'opacity-100' : 'opacity-0'}`}
                >
                  Thanks for subscribing! Check your inbox soon.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"></div>
          </div>
        </div>
        
        {/* Bottom bar with copyright and additional links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-blue-300/70 text-sm">
          <div className="scroll-animate opacity-0 transform translate-y-4 transition duration-700 delay-100">
            © {new Date().getFullYear()} BrainVerse. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 scroll-animate opacity-0 transform translate-y-4 transition duration-700 delay-300">
            <Link to="/terms" className="hover:text-cyan-300 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-cyan-300 transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-cyan-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
      
      {/* Add custom keyframes for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1) translate(-50%, -50%); }
          50% { opacity: 0.5; transform: scale(1.2) translate(-50%, -50%); }
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;