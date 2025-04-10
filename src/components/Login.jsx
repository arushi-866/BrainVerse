import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showFloatingElements, setShowFloatingElements] = useState(false);

  // Show floating elements after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingElements(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulated loading for better UI feedback (reduced to 500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Store user data and token first before any UI updates
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        if (response.data.user) {
          const userData = {
            ...response.data.user,
            loginTimestamp: new Date().toISOString(),
            hasCompletedRegistration: Boolean(response.data.user.hasCompletedRegistration)
          };
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        // Show brief success message
        setSuccess('Login successful!');
        
        // Navigate directly to dashboard
        // Important: We're not waiting for any animations or timeouts
        navigate('/dashboard');
      } else {
        // Handle case where response doesn't contain expected data
        throw new Error('Invalid server response');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  const floatingElementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.2, 
      scale: 1,
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      }
    },
    float: {
      y: [0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        y: {
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        },
        rotate: {
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] to-[#112240] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {showFloatingElements && (
          <>
            {/* Animated floating elements */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#64FFDA]"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 8 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                initial="hidden"
                animate={["visible", "float"]}
                variants={floatingElementVariants}
                custom={i * 0.1}
              />
            ))}
            
            {/* Larger decorative elements */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-[#1E4D8C] blur-3xl"
              style={{ top: '10%', left: '5%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1.5 }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-[#64FFDA] blur-3xl"
              style={{ bottom: '5%', right: '10%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </>
        )}
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(to right, #64FFDA 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container mx-auto min-h-screen flex flex-col px-4 relative z-10">
        {/* Back button with enhanced animation */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.98 }}
          className="absolute top-8 left-8 group inline-flex items-center px-5 py-2.5 bg-[#112240]/80 text-[#64FFDA] rounded-full border border-[#64FFDA]/20 backdrop-blur-sm hover:bg-[#64FFDA]/10 transition-all duration-300 shadow-lg shadow-[#64FFDA]/5"
        >
          <motion.i 
            className="ri-arrow-left-s-line mr-2"
            animate={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left content */}
            <motion.div 
              className="max-w-xl space-y-8 px-4 lg:px-8 text-center lg:text-left"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <motion.span 
                  className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-[#64FFDA] uppercase bg-[#64FFDA]/10 rounded-full border border-[#64FFDA]/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Welcome Back
                </motion.span>
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight"
                  variants={itemVariants}
                >
                  Sign In to Your{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#64FFDA]">Portal</span>
                    <motion.svg 
                      className="absolute -bottom-1 left-0 w-full h-3 text-[#64FFDA]/20 z-0" 
                      viewBox="0 0 172 16" 
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <path d="M1 15.5C1 15.5 64 1 86 1C108 1 171.5 15.5 171.5 15.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                    </motion.svg>
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-lg text-[#8892B0] mt-6 leading-relaxed"
                  variants={itemVariants}
                >
                  Access your personalized dashboard and unlock advanced features tailored to your needs
                </motion.p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#64FFDA]/5 rounded-lg blur-xl"></div>
                  <div className="relative bg-[#112240]/40 backdrop-blur-sm p-6 rounded-xl border border-[#64FFDA]/10">
                    <div className="flex items-center space-x-4 mb-4">
                      {["#64FFDA", "#FC6399", "#4D76FF"].map((color, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 + i * 0.1 }}
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <div className="h-1 w-16 bg-[#64FFDA]/20 rounded-full mb-3"></div>
                      <div className="h-1 w-32 bg-[#64FFDA]/15 rounded-full mb-3"></div>
                      <div className="h-1 w-24 bg-[#64FFDA]/10 rounded-full"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Login Form */}
            <motion.div
              className="relative w-full max-w-md mx-auto lg:mx-0"
              variants={itemVariants}
            >
              <AnimatePresence>
                {loading && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm z-20 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div className="inline-block">
                        <svg className="animate-spin h-10 w-10 text-[#64FFDA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <p className="text-[#64FFDA] mt-3 font-medium">Authenticating...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA]/30 via-[#4D76FF]/20 to-[#FC6399]/30 rounded-xl opacity-70 blur-lg"
                animate={{
                  background: [
                    'linear-gradient(90deg, rgba(100,255,218,0.3) 0%, rgba(77,118,255,0.2) 50%, rgba(252,99,153,0.3) 100%)',
                    'linear-gradient(90deg, rgba(252,99,153,0.3) 0%, rgba(100,255,218,0.2) 50%, rgba(77,118,255,0.3) 100%)',
                    'linear-gradient(90deg, rgba(77,118,255,0.3) 0%, rgba(252,99,153,0.2) 50%, rgba(100,255,218,0.3) 100%)',
                    'linear-gradient(90deg, rgba(100,255,218,0.3) 0%, rgba(77,118,255,0.2) 50%, rgba(252,99,153,0.3) 100%)'
                  ]
                }}
                transition={{ duration: 15, repeat: Infinity }}
              />
              
              <motion.div 
                className="relative bg-[#112240]/90 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-[#64FFDA]/10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
              >
                <motion.div 
                  className="mb-7"
                  variants={itemVariants}
                >
                  <h3 className="font-semibold text-2xl text-white">Sign In</h3>
                  <p className="text-[#8892B0]">
                    Don't have an account? 
                    <Link to="/signup" className="text-sm text-[#64FFDA] hover:text-white ml-1 transition-colors duration-300">
                      Sign Up
                    </Link>
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div variants={itemVariants}>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA]/50 to-[#4D76FF]/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full text-sm px-4 py-3.5 bg-[#0A192F] border border-[#64FFDA]/20 text-white rounded-lg focus:outline-none focus:border-[#64FFDA] focus:ring-1 focus:ring-[#64FFDA] transition duration-300 placeholder-[#8892B0]"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4D76FF]/50 to-[#64FFDA]/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full text-sm px-4 py-3.5 bg-[#0A192F] border border-[#64FFDA]/20 text-white rounded-lg focus:outline-none focus:border-[#64FFDA] focus:ring-1 focus:ring-[#64FFDA] transition duration-300 placeholder-[#8892B0]"
                          placeholder="Password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                        >
                          {showPassword ? (
                            <i className="ri-eye-off-line"></i>
                          ) : (
                            <i className="ri-eye-line"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center justify-end"
                    variants={itemVariants}
                  >
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                    >
                      Forgot your password?
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className="w-full py-3.5 bg-[#64FFDA]/10 hover:bg-[#64FFDA]/20 text-[#64FFDA] border border-[#64FFDA]/30 rounded-lg font-medium
                               shadow-lg shadow-[#64FFDA]/10 transition duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      <span className="relative z-10">Sign in</span>
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/40 to-[#4D76FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </motion.button>
                  </motion.div>

                  <motion.div 
                    className="relative my-8"
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#64FFDA]/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#112240] text-[#8892B0]">or continue with</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    variants={itemVariants}
                  >
                    <motion.button
                      type="button"
                      className="flex items-center justify-center gap-2 p-3 border border-[#64FFDA]/10 rounded-lg hover:bg-[#64FFDA]/5 transition duration-300 group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <img className="w-5 h-5 opacity-80 group-hover:opacity-100 transition duration-300" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />
                      <span className="text-sm text-[#8892B0] group-hover:text-white transition duration-300">Google</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex items-center justify-center gap-2 p-3 border border-[#64FFDA]/10 rounded-lg hover:bg-[#64FFDA]/5 transition duration-300 group"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <i className="ri-apple-fill text-xl text-[#8892B0] group-hover:text-white transition duration-300"></i>
                      <span className="text-sm text-[#8892B0] group-hover:text-white transition duration-300">Apple</span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  background: "linear-gradient(45deg, rgba(100,255,218,0.3), rgba(77,118,255,0.1))"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;