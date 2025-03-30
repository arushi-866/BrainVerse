import React, { useState, useEffect } from "react";
import { ChevronDown, Brain, BookOpen, PenTool, Calendar, BarChart, Clock, Award } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCount, setAnimateCount] = useState(0)
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setAnimateCount(prev => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setAnimateCount(prev => (prev + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate('/signup');
  };


  return (
    <div className="bg-gray-100 min-h-screen">


      {/* Hero Section with animation */}
      <section className="relative py-20 md:py-32 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-full h-full grid grid-cols-12 grid-rows-6 gap-px">
          {[...Array(12 * 6)].map((_, i) => (
            <div 
              key={`grid-${i}`} 
              className="border border-blue-500 bg-transparent"
              style={{
                opacity: Math.random() * 0.5 + 0.1,
                animation: `pulse ${Math.random() * 5 + 2}s infinite alternate ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center relative z-10">
          {/* Left-aligned content */}
          <div className={`lg:w-5/12 text-left transition-all duration-1000 pl-10 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative z-20">
              <div className="inline-block px-3 py-1 mb-4 bg-blue-800 bg-opacity-50 rounded-full border border-blue-500 text-blue-300 text-sm font-medium">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></span>
                AI-Powered Learning
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                BrainVerse
              </h1>
              
              <p className="mt-6 text-xl md:text-2xl max-w-xl text-gray-300 relative z-20">
                Your AI-powered study assistant for smarter learning, better retention, and academic success.
              </p>
              
              {/* Feature badges */}
              <div className="mt-6 flex flex-wrap gap-3 relative z-20">
                {['Smart Notes', 'Memory Retention', 'Quiz Generator', 'Study Analytics'].map((feature, i) => (
                  <span 
                    key={feature} 
                    className="px-3 py-1 bg-gray-800 bg-opacity-70 rounded-full text-sm text-gray-300 border border-gray-700"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animation: 'fadeIn 0.5s ease-in-out'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 relative z-20">
                <button onClick={handleClick} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600  hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                     Get Started
                  </span>
                </button>
                {/* <button className="bg-transparent border-2 border-blue-400 text-blue-400 font-semibold py-3 px-8 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Watch Demo
                  </span>
                </button> */}
              </div>
              
              {/* Social proof */}
              <div className="mt-12 bg-gray-800 bg-opacity-30 p-4 rounded-lg border border-gray-700 border-opacity-50 relative z-20">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={`avatar-${i}`} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-gray-800"></div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300">Trusted by <span className="font-bold text-blue-400">10,000+</span> students</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="text-xs ml-1 text-gray-400">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right-side visualization */}
          <div className="lg:w-7/12 h-96 md:h-128 relative mt-12 lg:mt-0 flex justify-center">
            <div className={`w-full h-full relative transition-all duration-1500 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              {/* 3D Brain visualization */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80">
                {/* Brain core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20">
                  <div className="w-full h-full rounded-full animate-pulse"></div>
                </div>
                
                {/* Brain hemispheres */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-4 border-blue-500 border-opacity-20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-64 h-40 border-4 border-purple-500 border-opacity-20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-64 h-40 border-4 border-blue-400 border-opacity-20 rounded-full"></div>

                {/* Neural pathways */}
                <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {[...Array(20)].map((_, i) => {
                    const startAngle = Math.random() * Math.PI * 2;
                    const endAngle = Math.random() * Math.PI * 2;
                    const startRadius = 60 + Math.random() * 60;
                    const endRadius = 60 + Math.random() * 60;
                    
                    const x1 = Math.cos(startAngle) * startRadius + 50;
                    const y1 = Math.sin(startAngle) * startRadius + 50;
                    const x2 = Math.cos(endAngle) * endRadius + 50;
                    const y2 = Math.sin(endAngle) * endRadius + 50;
                    
                    return (
                      <line
                        key={i}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="url(#neuronGradient)"
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.1;0.6;0.1"
                          dur={`${Math.random() * 4 + 2}s`}
                          repeatCount="indefinite"
                        />
                      </line>
                    );
                  })}
                </svg>
                
                {/* Neuron nodes */}
                {[...Array(15)].map((_, i) => {
                  const angle = (i / 15) * Math.PI * 2;
                  const radius = 100 + (i % 4) * 20;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const size = Math.random() * 8 + 4;
                  const delay = i * 0.3;
                  const active = (i + animateCount) % 5 === 0;
                  
                  return (
                    <div
                      key={i}
                      className={`absolute rounded-full ${active ? 'bg-blue-300' : 'bg-blue-600'}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: active ? '0 0 15px 5px rgba(59, 130, 246, 0.5)' : 'none',
                        transition: 'all 0.3s ease',
                        animation: `pulse 2s infinite alternate ${delay}s, orbit 20s infinite linear ${delay}s`
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Floating metrics and data - ONLY ON RIGHT SIDE */}
              <div className="absolute top-10 right-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm p-3 rounded-lg border border-blue-500 border-opacity-30 shadow-lg transform rotate-2 z-30">
                <div className="text-sm text-blue-300 font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span>Memory Efficiency</span>
                    <span className="text-green-400">94%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-10 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm p-3 rounded-lg border border-purple-500 border-opacity-30 shadow-lg transform -rotate-1 z-30">
                <div className="text-sm text-purple-300 font-mono">
                  <div className="flex justify-between items-center mb-1">
                    <span>Learning Rate</span>
                    <span className="text-purple-400">2.5x</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={`rate-${i}`}
                        className={`w-2 h-6 rounded-sm ${i < 3 ? 'bg-purple-400' : 'bg-gray-700'}`}
                        style={{ 
                          height: `${(i+1) * 4 + 6}px`,
                          animation: i < 3 ? `pulse 1.5s infinite alternate ${i * 0.2}s` : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Data points/particles - ONLY ON RIGHT SIDE */}
              {[...Array(4)].map((_, i) => {
                const delay = i * 0.5;
                return (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full z-30"
                    style={{
                      top: `${20 + i * 10}%`,
                      right: '30%',
                      boxShadow: '0 0 8px 2px rgba(59, 130, 246, 0.3)',
                      animation: `dataFlow 4s infinite ${delay}s`
                    }}
                  />
                );
              })}
              
              {/* REMOVED: Connecting lines between metrics and brain */}
              
              {/* Floating code snippets - ONLY ON RIGHT SIDE and REDUCED NUMBER */}
              {[...Array(2)].map((_, i) => {
                const size = Math.random() * 100 + 100;
                const x = 60 + Math.random() * 30; // Only on right side (60-90% of screen width)
                const y = Math.random() * 100;
                const speed = Math.random() * 40 + 20;
                return (
                  <div
                    key={`code-${i}`}
                    className="absolute bg-blue-900 bg-opacity-30 rounded p-2 text-blue-300 text-xs transform rotate-3 border border-blue-500 border-opacity-30 z-30"
                    style={{
                      width: `${size}px`,
                      left: `${x}%`,
                      top: `${y}%`,
                      animation: `float ${speed}s infinite linear`
                    }}
                  >
                    <pre>
                      {`function analyze() {
  return data.map(x => 
    x.process());
}`}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Bottom stats bar */}
        <div className={`mt-12 p-4 bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-xl border border-gray-700 border-opacity-50 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-20`}>
          <div className="flex flex-wrap justify-around">
            {[
              { label: 'Active Users', value: '50K+', icon: '👥' },
              { label: 'Study Hours Saved', value: '1.2M', icon: '⏱️' },
              { label: 'Retention Rate', value: '89%', icon: '📈' },
              { label: 'Universities', value: '120+', icon: '🏛️' }
            ].map((stat, i) => (
              <div key={`stat-${i}`} className="flex items-center px-4 py-2">
                <div className="text-2xl mr-3">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes dataFlow {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          50% { transform: translate(-100px, -50px) scale(1.2); opacity: 0.8; }
          100% { transform: translate(-200px, -100px) scale(0.8); opacity: 0; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(3deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>

      {/* Stats Counter Section
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h3 className="text-4xl font-bold text-blue-600">50K+</h3>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div className="p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h3 className="text-4xl font-bold text-blue-600">10M+</h3>
              <p className="mt-2 text-gray-600">Notes Summarized</p>
            </div>
            <div className="p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h3 className="text-4xl font-bold text-blue-600">95%</h3>
              <p className="mt-2 text-gray-600">Satisfaction Rate</p>
            </div>
            <div className="p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <h3 className="text-4xl font-bold text-blue-600">200+</h3>
              <p className="mt-2 text-gray-600">Universities</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section with hover effects */}
      <section id="features" className="py-24 px-6 bg-gray-950 relative overflow-hidden">
  {/* Animated particle background */}
  <div className="absolute inset-0 opacity-30" id="particles-js"></div>
  
  {/* Dynamic radial gradients */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e3a8a_0%,transparent_50%)] opacity-40 animate-pulse"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb_0%,transparent_35%)] opacity-20"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6366f1_0%,transparent_35%)] opacity-15"></div>
  
  {/* Animated gradient line */}
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-gradient-x"></div>
  
  {/* Neural network grid effect */}
  <div className="absolute inset-0 bg-[url('/neuralpattern.svg')] bg-repeat opacity-5"></div>
  
  <div className="max-w-6xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold  text-center bg-clip-text text-white bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 pb-2">
        <span className="inline-block transform hover:scale-105 transition-transform duration-300">Powerful Features</span>
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4 rounded-full"></div>
      <p className="mt-6 text-xl text-center text-blue-200 max-w-3xl mx-auto opacity-85">
        Elevate your learning experience with our cutting-edge AI tools designed for maximum retention and comprehension.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {/* Smart Summarization */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        {/* Animated icon container */}
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <BookOpen className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Smart Summarization</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          AI extracts key points from your notes, textbooks, and lecture recordings instantly.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <BookOpen className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
      
      {/* Interactive Mind Maps */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <PenTool className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Interactive Mind Maps</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          Visualize complex concepts with AI-generated mind maps that connect the dots.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <PenTool className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
      
      {/* Adaptive Quizzes */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <Brain className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Adaptive Quizzes</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          Generate personalized quizzes that adapt to your learning pace and reinforce knowledge.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <Brain className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
      
      {/* Study Planner */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <Calendar className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Study Planner</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          AI creates optimal study schedules based on your goals, deadlines, and learning patterns.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <Calendar className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
      
      {/* Progress Analytics */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <BarChart className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Progress Analytics</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          Track your learning journey with detailed analytics and personalized insights.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <BarChart className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
      
      {/* Spaced Repetition */}
      <div className="feature-card relative bg-gradient-to-br from-gray-900/80 to-blue-950/50 backdrop-blur-lg p-8 rounded-xl border border-blue-500/20 shadow-lg transition-all duration-500 group hover:shadow-blue-500/30 hover:shadow-xl hover:border-blue-400/50">
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        
        <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 text-blue-300 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner shadow-blue-500/20 group-hover:shadow-blue-400/40 group-hover:text-blue-200 transition-all duration-500 transform group-hover:rotate-3">
          <Clock className="h-7 w-7 group-hover:scale-110 transition-all duration-500" />
        </div>
        
        <h3 className="text-2xl font-semibold text-blue-200 group-hover:text-blue-100 transition-colors duration-300">Spaced Repetition</h3>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        <p className="mt-3 text-blue-300/80 group-hover:text-blue-200/90 transition-colors duration-300">
          Optimize memory retention with scientifically-proven spaced repetition algorithms.
        </p>
        
        <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <Clock className="h-24 w-24 text-blue-500" style={{ transform: 'rotate(15deg)' }} />
        </div>
        
        {/* <button className="mt-6 px-4 py-2 rounded-lg bg-blue-800/30 text-blue-300 font-medium flex items-center hover:bg-blue-700/40 transition-all duration-300 group-hover:translate-x-2">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
        </button> */}
      </div>
    </div>
  </div>
  
  {/* JavaScript for particle animation */}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
  <script dangerouslySetInnerHTML={{ 
    __html: `
      document.addEventListener('DOMContentLoaded', function() {
        if (typeof particlesJS !== 'undefined') {
          particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: '#3b82f6' },
              shape: { type: 'circle' },
              opacity: { value: 0.1, random: true },
              size: { value: 3, random: true },
              line_linked: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.1,
                width: 1
              },
              move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
              }
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
              }
            }
          });
        }
        
        // Add mouse tracking glow effect
        const featuresSection = document.getElementById('features');
        const cards = document.querySelectorAll('.feature-card');
        
        featuresSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
              card.style.background = \`radial-gradient(circle at \${x}px \${y}px, rgba(59, 130, 246, 0.1), transparent 40%), var(--original-bg)\`;
            } else {
              card.style.background = 'var(--original-bg)';
            }
          });
        });
        
        // Store original backgrounds
        cards.forEach(card => {
          card.style.setProperty('--original-bg', 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(30, 58, 138, 0.5))');
        });
        
        // Add animations to the heading
        const heading = document.querySelector('h2 span');
        heading.addEventListener('mouseover', () => {
          heading.style.textShadow = '0 0 15px rgba(59, 130, 246, 0.5)';
        });
        
        heading.addEventListener('mouseout', () => {
          heading.style.textShadow = 'none';
        });
      });
    `
  }}></script>
  
  {/* Custom animations */}
  <style dangerouslySetInnerHTML={{ 
    __html: `
      @keyframes gradient-x {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-gradient-x {
        background-size: 200% 100%;
        animation: gradient-x 15s ease infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.2; }
      }
      
      .animate-pulse {
        animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      .feature-card {
        transform-style: preserve-3d;
        transition: all 0.5s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-10px) scale(1.02);
      }
    `
  }}></style>
</section>

      {/* How It Works Section with tabs */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-900 to-blue-950 px-6 overflow-hidden relative">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="stars-container">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="absolute rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/50 to-transparent" />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="transform hover:scale-105 transition-transform duration-700">
      <h2 className="text-5xl font-bold text-center text-white bg-clip-text">
        <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>How </span>
        <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>It </span>
        <span className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>Works</span>
      </h2>
    </div>
    <p className="mt-4 text-xl text-center text-blue-200 max-w-3xl mx-auto opacity-0 animate-slideUp" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
      BrainVerse adapts to your unique learning style and academic needs.
    </p>
    
    {/* Tabs */}
    <div className="mt-16 opacity-0 animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
      <div className="flex flex-wrap justify-center mb-8 border-b border-blue-700/30 relative">
        {/* Animated highlight for active tab */}
        <div 
          className="absolute bottom-0 h-1  bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-in-out rounded-t"
          style={{ 
            left: activeTab === "students" ? "5%" : activeTab === "teachers" ? "38%" : "72%",
            // width: "50%",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.6)"
          }}
        />
        
        <button 
          className={`px-8 py-4 font-medium transition-all duration-300 relative ${
            activeTab === "students" 
              ? "text-cyan-300" 
              : "text-blue-300/70 hover:text-blue-200"
          }`}
          onClick={() => setActiveTab("students")}
        >
          <span className="relative z-10">For Students</span>
          {activeTab === "students" && (
            <span className="absolute bottom-0 left-0 w-full h-full bg-blue-800/20 rounded-t-lg" />
          )}
        </button>
        
        {/* <button 
          className={`px-8 py-4 font-medium transition-all duration-300 relative ${
            activeTab === "teachers" 
              ? "text-cyan-300" 
              : "text-blue-300/70 hover:text-blue-200"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          <span className="relative z-10">For Teachers</span>
          {activeTab === "teachers" && (
            <span className="absolute bottom-0 left-0 w-full h-full bg-blue-800/20 rounded-t-lg" />
          )}
        </button>
        
        <button 
          className={`px-8 py-4 font-medium transition-all duration-300 relative ${
            activeTab === "institutions" 
              ? "text-cyan-300" 
              : "text-blue-300/70 hover:text-blue-200"
          }`}
          onClick={() => setActiveTab("institutions")}
        >
          <span className="relative z-10">For Institutions</span>
          {activeTab === "institutions" && (
            <span className="absolute bottom-0 left-0 w-full h-full bg-blue-800/20 rounded-t-lg" />
          )}
        </button> */}
      </div>
      
      {/* Tab content with animation */}
      <div className="bg-gradient-to-br from-slate-800 to-blue-900 p-8 rounded-xl shadow-2xl transition-all duration-700 border border-blue-700/30 backdrop-blur">
        {activeTab === "students" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="transform transition-all duration-700 hover:translate-y-1">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Boost Your Academic Performance</span>
              </h3>
              <ul className="space-y-5">
                {[
                  "Upload your notes or connect to your course management system",
                  "Let our AI analyze and organize your learning materials",
                  "Study with AI-enhanced tools that adapt to your learning style",
                  "Track your progress and receive personalized recommendations"
                ].map((item, index) => (
                  <li key={index} className="flex items-start transform transition-all hover:translate-x-1 duration-300" style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                    <div className="rounded-full p-1 mr-3 mt-1 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                      <svg className="h-4 w-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-blue-100">{item}</p>
                  </li>
                ))}
              </ul>
              <button  onClick={handleClick} className="mt-8 relative overflow-hidden group">
                <span className="relative z-10 block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-out shadow-lg">
                  Get Started as a Student
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg -z-0 group-hover:opacity-0 transition-opacity duration-500"/>
                <span className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg animate-pulse"></span>
                </span>
              </button>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 flex items-center justify-center transform transition-all duration-700 hover:scale-105 border border-blue-700/30">
              <div className="text-center w-full">
                <p className="text-cyan-300 font-medium mb-6">Student Dashboard Preview</p>
                <div className="bg-gradient-to-tr from-slate-900 to-blue-900 rounded-lg shadow-xl p-4 w-full h-64 relative overflow-hidden border border-blue-600/20 group perspective">
                  {/* Dashboard visualization elements */}
                  <div className="absolute top-4 left-4 w-3/4 h-8 bg-blue-800/40 rounded animate-pulse"></div>
                  <div className="absolute top-16 left-4 w-1/2 h-6 bg-blue-800/30 rounded"></div>
                  <div className="absolute top-28 left-4 grid grid-cols-3 gap-2 w-11/12">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-20 bg-blue-700/20 rounded transition-all duration-300 hover:bg-blue-700/40"></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
                  
                  {/* Glowing dots */}
                  <div className="absolute h-2 w-2 rounded-full bg-cyan-400 top-1/4 right-1/4 animate-ping" style={{animationDuration: "3s"}}></div>
                  <div className="absolute h-2 w-2 rounded-full bg-blue-400 bottom-1/3 left-1/3 animate-ping" style={{animationDuration: "4s"}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "teachers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="transform transition-all duration-700 hover:translate-y-1">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Enhance Teaching Effectiveness</span>
              </h3>
              <ul className="space-y-5">
                {[
                  "Create AI-powered interactive lesson plans in minutes",
                  "Monitor student progress with detailed analytics",
                  "Automatically generate assessments and homework",
                  "Identify learning gaps and provide targeted interventions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start transform transition-all hover:translate-x-1 duration-300" style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                    <div className="rounded-full p-1 mr-3 mt-1 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                      <svg className="h-4 w-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-blue-100">{item}</p>
                  </li>
                ))}
              </ul>
              <button className="mt-8 relative overflow-hidden group">
                <span className="relative z-10 block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-out shadow-lg">
                  Get Started as a Teacher
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg -z-0 group-hover:opacity-0 transition-opacity duration-500"/>
                <span className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg animate-pulse"></span>
                </span>
              </button>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 flex items-center justify-center transform transition-all duration-700 hover:scale-105 border border-blue-700/30">
              <div className="text-center w-full">
                <p className="text-cyan-300 font-medium mb-6">Teacher Dashboard Preview</p>
                <div className="bg-gradient-to-tr from-slate-900 to-blue-900 rounded-lg shadow-xl p-4 w-full h-64 relative overflow-hidden border border-blue-600/20 group perspective">
                  {/* Dashboard visualization elements */}
                  <div className="absolute top-4 left-4 right-4 h-8 bg-blue-800/40 rounded-lg flex items-center">
                    <div className="ml-4 h-3 w-20 bg-blue-400/40 rounded-sm"></div>
                    <div className="ml-4 h-3 w-16 bg-blue-400/30 rounded-sm"></div>
                    <div className="ml-4 h-3 w-24 bg-blue-400/30 rounded-sm"></div>
                  </div>
                  <div className="absolute top-16 left-4 w-3/5 h-32 bg-blue-800/20 rounded-lg"></div>
                  <div className="absolute top-16 right-4 w-1/3 h-32 bg-blue-800/20 rounded-lg grid grid-rows-2 gap-2 p-2">
                    <div className="bg-blue-700/30 rounded"></div>
                    <div className="bg-blue-700/30 rounded"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-8 bg-blue-800/30 rounded"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
                  
                  {/* Glowing dots */}
                  <div className="absolute h-2 w-2 rounded-full bg-cyan-400 top-1/3 right-1/3 animate-ping" style={{animationDuration: "3.5s"}}></div>
                  <div className="absolute h-2 w-2 rounded-full bg-blue-400 bottom-1/4 left-1/4 animate-ping" style={{animationDuration: "4.5s"}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "institutions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="transform transition-all duration-700 hover:translate-y-1">
              <h3 className="text-2xl font-semibold mb-6 text-white">
                <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Transform Educational Outcomes</span>
              </h3>
              <ul className="space-y-5">
                {[
                  "Integrate with existing LMS and educational infrastructure",
                  "Access institution-wide analytics and performance metrics",
                  "Deploy customized learning paths across departments",
                  "Priority support and customized implementation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start transform transition-all hover:translate-x-1 duration-300" style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                    <div className="rounded-full p-1 mr-3 mt-1 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                      <svg className="h-4 w-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="text-blue-100">{item}</p>
                  </li>
                ))}
              </ul>
              <button className="mt-8 relative overflow-hidden group">
                <span className="relative z-10 block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-out shadow-lg">
                  Contact for Enterprise
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg -z-0 group-hover:opacity-0 transition-opacity duration-500"/>
                <span className="absolute inset-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg animate-pulse"></span>
                </span>
              </button>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 flex items-center justify-center transform transition-all duration-700 hover:scale-105 border border-blue-700/30">
              <div className="text-center w-full">
                <p className="text-cyan-300 font-medium mb-6">Institution Dashboard Preview</p>
                <div className="bg-gradient-to-tr from-slate-900 to-blue-900 rounded-lg shadow-xl p-4 w-full h-64 relative overflow-hidden border border-blue-600/20 group perspective">
                  {/* Complex dashboard visualization */}
                  <div className="absolute top-3 left-3 right-3 h-10 bg-blue-800/40 rounded flex">
                    <div className="h-full w-1/4 bg-blue-700/30 rounded-l flex items-center justify-center">
                      <div className="h-3 w-16 bg-cyan-400/40 rounded-sm"></div>
                    </div>
                    <div className="h-full flex-1 flex items-center justify-between px-4">
                      <div className="h-3 w-16 bg-blue-400/30 rounded-sm"></div>
                      <div className="h-3 w-16 bg-blue-400/30 rounded-sm"></div>
                      <div className="h-3 w-16 bg-blue-400/30 rounded-sm"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-16 left-3 w-1/2 h-36 bg-blue-800/20 rounded grid grid-cols-2 grid-rows-2 gap-2 p-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-blue-700/30 rounded-sm flex items-center justify-center">
                        <div className="h-2 w-2/3 bg-cyan-400/20 rounded-sm"></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute top-16 right-3 w-5/12 h-36 bg-blue-800/20 rounded p-2">
                    <div className="h-4 w-2/3 bg-blue-700/30 rounded-sm mb-2"></div>
                    <div className="h-24 bg-blue-700/20 rounded-sm grid grid-rows-4 gap-1 p-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-blue-700/30 rounded-sm flex">
                          <div className="h-full w-1/5 bg-cyan-400/20 rounded-sm"></div>
                          <div className="h-full w-3/5 ml-1 bg-cyan-400/10 rounded-sm"></div>
                          <div className="h-full w-1/5 ml-1 bg-cyan-400/30 rounded-sm"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3 h-6 bg-blue-800/30 rounded"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
                  
                  {/* Glowing elements */}
                  <div className="absolute h-2 w-2 rounded-full bg-cyan-400 top-1/4 right-1/4 animate-ping" style={{animationDuration: "4s"}}></div>
                  <div className="absolute h-2 w-2 rounded-full bg-blue-400 bottom-1/3 left-1/3 animate-ping" style={{animationDuration: "5s"}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
  {/* CSS for custom animations */}
  <style jsx>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-slideUp {
      animation: slideUp 0.8s ease-out forwards;
    }
    
    .perspective {
      transform-style: preserve-3d;
      transition: transform 0.5s ease-out;
    }
    
    .perspective:hover {
      transform: rotateX(5deg) rotateY(5deg);
    }
  `}</style>
</section>

      {/* Testimonials Section with card hover effects */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-blue-950 text-white overflow-hidden relative">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="stars-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white" 
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="text-center mb-16 transform transition-all duration-700 hover:scale-105">
      <h2 className="text-5xl font-bold text-blue-300 mb-6 tracking-tight">
        <span className="relative inline-block">
         Student Testimonials
          <span className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100"></span>
        </span>
      </h2>
      <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
        Hear from our students about their learning experiences and how our courses have helped them achieve their academic goals.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Testimonial Card 1 */}
      <div className="testimonial-card bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 p-8 transition-all duration-500 hover:shadow-blue-400/20 hover:-translate-y-2 border border-blue-900/50 hover:border-blue-400/30 group">
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
            {/* Base64 encoded student image - Arjun */}
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48ZGVmcz48c3R5bGU+LmNscC0xe2NsaXAtcGF0aDp1cmwoI2NsaXAtcGF0aCk7fS5jbHMtMXtmaWxsOiNmNGFlNzM7fS5jbHMtMntmaWxsOiMzYTMzMzM7fS5jbHMtM3tmaWxsOiM1MDQ2NDY7fS5jbHMtNHtmaWxsOiM2ZDRjNDE7fS5jbHMtNXtmaWxsOiNmZmY7fS5jbHMtNntmaWxsOiMzNjM2MzY7fS5jbHMtN3tmaWxsOiM0MjhiY2E7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIi8+PC9jbGlwUGF0aD48L2RlZnM+PHRpdGxlPnN0dWRlbnQtYXJqdW48L3RpdGxlPjxnIGNsYXNzPSJjbHAtMSI+PHJlY3QgY2xhc3M9ImNscy03IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjAiIGN5PSI1MCIgcj0iMzAiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik05MCw1MEE0MCw0MCwwLDAsMSw1MCw5MEgzMEE2MCw2MCwwLDAsMCw5MCw1MFoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0zMCw5MEg5MHYyMEgzMFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zMCwyMEg5MFY1MEgzMFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9IjQ1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9Ijc1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNiIgY3g9IjQ1IiBjeT0iNDAiIHI9IjIiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNiIgY3g9Ijc1IiBjeT0iNDAiIHI9IjIiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik02MCw1MGMtNSwwLTEwLDQtMTAsNHM1LDQsMTAsNHMxMC00LDEwLTRTNjUsNTAsNjAsNTBaIi8+PHBhdGggY2xhc3M9ImNscy02IiBkPSJNMzUsNzBINTBjMCwwLDUtMTAsMTAtMTBzMTAsMTAsMTAsMTBoMTVjMCwwLTUtMTUtMTUtMjBINTBDNDAsNTUsMzUsNzAsMzUsNzBaIi8+PC9nPjwvc3ZnPg=="
              alt="Arjun Sharma" 
              className="w-16 h-16 rounded-full object-cover relative z-10 p-1"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Arjun Sharma</h3>
            <p className="text-blue-400">B.Tech Computer Science</p>
          </div>
        </div>
        <p className="text-gray-300 italic mb-6 leading-relaxed">
          "The online learning platform has been incredibly helpful for my studies. The instructors are knowledgeable and the course material is comprehensive. I've improved my programming skills significantly."
        </p>
        <div className="flex text-yellow-300 transform transition-all duration-300 group-hover:scale-110 origin-left">
          {[...Array(4)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>
      
      {/* Testimonial Card 2 */}
      <div className="testimonial-card bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 p-8 transition-all duration-500 hover:shadow-blue-400/20 hover:-translate-y-2 border border-blue-900/50 hover:border-blue-400/30 group">
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
            {/* Base64 encoded student image - Priya */}
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48ZGVmcz48c3R5bGU+LmNscC0xe2NsaXAtcGF0aDp1cmwoI2NsaXAtcGF0aCk7fS5jbHMtMXtmaWxsOiNmNWJlODM7fS5jbHMtMntmaWxsOiMzYTMzMzM7fS5jbHMtM3tmaWxsOiNlZDU0OWQ7fS5jbHMtNHtmaWxsOiM2ZDRjNDE7fS5jbHMtNXtmaWxsOiNmZmY7fS5jbHMtNntmaWxsOiMzNjM2MzY7fS5jbHMtN3tmaWxsOiNmZjc4YmE7fS5jbHMtOHtmaWxsOiM5YzZkM2Q7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIi8+PC9jbGlwUGF0aD48L2RlZnM+PHRpdGxlPnN0dWRlbnQtcHJpeWE8L3RpdGxlPjxnIGNsYXNzPSJjbHAtMSI+PHJlY3QgY2xhc3M9ImNscy03IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjAiIGN5PSI1MCIgcj0iMzAiLz48cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik0zMCwyMEg5MFY1MEgzMFoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0zMCw5MEg5MHYyMEgzMFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9IjQ1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9Ijc1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNiIgY3g9IjQ1IiBjeT0iNDAiIHI9IjIiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNiIgY3g9Ijc1IiBjeT0iNDAiIHI9IjIiLz48cGF0aCBkPSJNNzUsNjBjMCw1LTUsOS0xNSw5UzQ1LDY1LDQ1LDYwczUtNSwxNS01Uzc1LDU1LDc1LDYwWiIvPjxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTQ4LDU5YzAsMS4xLDUuNCwyLDEyLDJzMTItLjksMTItMi01LjQtMi0xMi0yUzQ4LDU3LjksNDgsNTlaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNDAsNzBjMCwwLDEwLDEwLDIwLDEwczIwLTEwLDIwLTEwSDQwWiIvPjwvZz48L3N2Zz4="
              alt="Priya Patel" 
              className="w-16 h-16 rounded-full object-cover relative z-10 p-1"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Priya Patel</h3>
            <p className="text-blue-400">MSc Data Science</p>
          </div>
        </div>
        <p className="text-gray-300 italic mb-6 leading-relaxed">
          "I've completed three courses on this platform and each one has been exceptional. The hands-on projects helped me apply what I learned and build a strong portfolio. I recently secured an internship thanks to these skills!"
        </p>
        <div className="flex text-yellow-300 transform transition-all duration-300 group-hover:scale-110 origin-left">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
      
      {/* Testimonial Card 3 */}
      <div className="testimonial-card bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-900/30 p-8 transition-all duration-500 hover:shadow-blue-400/20 hover:-translate-y-2 border border-blue-900/50 hover:border-blue-400/30 group">
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
            {/* Base64 encoded student image - Rohit */}
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48ZGVmcz48c3R5bGU+LmNscC0xe2NsaXAtcGF0aDp1cmwoI2NsaXAtcGF0aCk7fS5jbHMtMXtmaWxsOiNlOGE5NzE7fS5jbHMtMntmaWxsOiMzYTMzMzM7fS5jbHMtM3tmaWxsOiM1MzdhYTI7fS5jbHMtNHtmaWxsOiNmZmY7fS5jbHMtNXtmaWxsOiMzNjM2MzY7fS5jbHMtNntmaWxsOiM1YzRkNDQ7fS5jbHMtN3tmaWxsOiM3MDU0M2U7fS5jbHMtOHtmaWxsOiM1NjlkZDc7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIi8+PC9jbGlwUGF0aD48L2RlZnM+PHRpdGxlPnN0dWRlbnQtcm9oaXQ8L3RpdGxlPjxnIGNsYXNzPSJjbHAtMSI+PHJlY3QgY2xhc3M9ImNscy04IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIvPjxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iNjAiIGN5PSI1MCIgcj0iMzAiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0zMCwyMEg5MFY1MEgzMFoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0zMCw3MEg5MFY0NUgzMFoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0zMCw5MEg5MHYyMEgzMFoiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNCIgY3g9IjQ1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNCIgY3g9Ijc1IiBjeT0iNDAiIHI9IjUiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9IjQ1IiBjeT0iNDAiIHI9IjIiLz48Y2lyY2xlIGNsYXNzPSJjbHMtNSIgY3g9Ijc1IiBjeT0iNDAiIHI9IjIiLz48cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik03MCw1NWMwLDUtNSw5LTEwLDlzLTEwLTQtMTAtOXM1LTMsMTAtM1M3MCw1MCw3MCw1NVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik02MCw1NWMwLDUsMCwxNSwwLDE1aDEwYzAsMCwwLTEwLDAtMTVINjBaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTAsNTVjMCw1LDAsMTUsMCwxNUg0MGMwLDAsMC0xMCwwLTE1SDUwWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTUzLDU0YzAsMS4xLDMuMSwyLDcsMnM3LS45LDctMi0zLjEtMi03LTJTNTMsNTIuOSw1Myw1NFoiLz48L2c+PC9zdmc+"
              alt="Rohit Verma" 
              className="w-16 h-16 rounded-full object-cover relative z-10 p-1"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Rohit Verma</h3>
            <p className="text-blue-400">BBA Finance</p>
          </div>
        </div>
        <p className="text-gray-300 italic mb-6 leading-relaxed">
          "The learning interface is user-friendly and the support from teaching assistants is prompt. I particularly enjoyed the interactive quizzes and discussion forums that enhanced my understanding of complex financial concepts."
        </p>
        <div className="flex text-yellow-300 transform transition-all duration-300 group-hover:scale-110 origin-left">
          {[...Array(4)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <svg className="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>
      </div>
    </div>
    
    <div className="text-center mt-12">
      {/* <button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg group">
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">View More Testimonials</span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
      </button> */}
    </div>
  </div>

  {/* CSS Animation for stars */}
  <style jsx>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }
    
    .testimonial-card {
      animation: fadeInUp 0.8s ease-out backwards;
    }
    
    .testimonial-card:nth-child(1) {
      animation-delay: 0.1s;
    }
    
    .testimonial-card:nth-child(2) {
      animation-delay: 0.3s;
    }
    
    .testimonial-card:nth-child(3) {
      animation-delay: 0.5s;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
</section>
      </div>
  );
};

export default HomePage;