import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Assess password strength
  // useEffect(() => {
  //   if (!formData.password) {
  //     setPasswordStrength(0);
  //     return;
  //   }

  //   const registerUser = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:5000/api/signup", {
  //         username: "testuser",
  //         email: "test@example.com",
  //         password: "password123",
  //       });

  //       if (response?.data?.user) {
  //         localStorage.setItem("user", JSON.stringify(response.data.user));
  //         navigate("/dashboard");
  //       } else {
  //         console.error("Unexpected response format:", response);
  //       }
  //     } catch (error) {
  //       console.error("Signup failed:", error.response ? error.response.data : error.message);
  //     }
  //   };

  //   registerUser();
  // }, [formData.password, navigate]);
    
  //   let strength = 0;
  //   if (formData.password.length >= 8) strength += 1;
  //   if (/[A-Z]/.test(formData.password)) strength += 1;
  //   if (/[0-9]/.test(formData.password)) strength += 1;
  //   if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    
  // Remove the entire registerUser function from the useEffect
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:2006/api/auth/register', {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        dob: formData.dob
      });
  
      if (response.data.success) {
        setShowSuccessAnimation(true);
        
        // Store authentication data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = `
    w-full text-sm px-4 py-3 bg-[#1a2133] border border-[#2a3654] rounded-lg
    focus:outline-none focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/30
    text-slate-200 placeholder-slate-400
    transition-all duration-300
  `;

  // Animated backgrounds
  const floatingOrbs = Array(5).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#162040] relative overflow-hidden">
      {/* Animated floating orbs */}
      {floatingOrbs.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-600/5 blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["5%", "-5%", "5%"],
          }}
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: orb.delay
          }}
        />
      ))}

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {Array(100).fill(0).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto min-h-screen flex flex-col px-4 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 group inline-flex items-center px-5 py-2.5 bg-[#1a2133]/80 text-[#4f7cff] rounded-full hover:bg-[#4f7cff] hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg shadow-blue-900/20 border border-[#2a3654]/50"
        >
          <motion.i 
            className="ri-arrow-left-s-line mr-2"
            animate={{ x: [0, -4, 0] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl w-full">
            {/* Left content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl space-y-8 px-4 lg:px-8"
            >
              <div>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#4f7cff] uppercase bg-[#4f7cff]/10 rounded-full border border-[#4f7cff]/20"
                >
                  Begin Your Journey
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight"
                >
                  Create Your <span className="text-[#4f7cff] relative">Account
                    <svg className="absolute bottom-1 left-0 w-full h-3 -z-10 text-[#4f7cff]/20" viewBox="0 0 172 16" fill="none">
                      <path d="M1 15.5C1 15.5 64 1 86 1C108 1 171.5 15.5 171.5 15.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-lg text-slate-300 mt-6 leading-relaxed"
                >
                  Join our cutting-edge platform designed to transform your experience. Unlock exclusive features and begin your journey today.
                </motion.p>
                
                {/* Feature points */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 space-y-4"
                >
                  {[
                    { icon: "ri-shield-check-line", text: "Advanced security protection" },
                    { icon: "ri-dashboard-3-line", text: "Personalized dashboard experience" },
                    { icon: "ri-group-line", text: "Connect with a global community" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + (index * 0.2) }}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4f7cff]/10 flex items-center justify-center text-[#4f7cff]">
                        <i className={item.icon}></i>
                      </div>
                      <span className="text-slate-300">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              {/* Success animation */}
              <AnimatePresence>
                {showSuccessAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#121927]/95 backdrop-blur-md rounded-xl z-20 flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <motion.i 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="ri-check-line text-green-500 text-4xl"
                      />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xl font-medium text-white"
                    >
                      Account Created!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-slate-300 mt-2"
                    >
                      Redirecting to dashboard...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glow effects */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f7cff]/30 to-[#6e4ff7]/30 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition duration-1000"></div>
              <motion.div 
                animate={{ 
                  boxShadow: [
                    "0 0 20px 5px rgba(79, 124, 255, 0.1)", 
                    "0 0 30px 5px rgba(79, 124, 255, 0.2)", 
                    "0 0 20px 5px rgba(79, 124, 255, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
                className="relative bg-[#121927]/95 backdrop-blur-lg rounded-xl p-8 border border-[#2a3654]"
              >
                <div className="mb-7">
                  <h3 className="font-semibold text-2xl text-white">Sign Up</h3>
                  <p className="text-slate-400">
                    Already have an account?
                    <Link to="/login" className="text-[#4f7cff] hover:text-[#7899ff] ml-1 transition-colors">
                      Sign In
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="p-3 rounded-lg bg-red-900/30 text-red-200 text-sm border border-red-800/50"
                      >
                        <div className="flex items-start space-x-2">
                          <i className="ri-error-warning-line text-red-400 mt-0.5"></i>
                          <span>{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="First Name"
                        />
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Last Name"
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <i className="ri-mail-line"></i>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Email"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <i className="ri-calendar-line"></i>
                    </div>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10 cursor-pointer`}
                      required
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-2"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                        <i className="ri-lock-line"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${inputClasses} pl-10`}
                        placeholder="Password"
                        required
                      />
                    </div>
                    
                    {formData.password && (
                      <div className="w-full h-1.5 bg-[#1a2133] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${passwordStrength * 25}%`,
                            backgroundColor: passwordStrength <= 1 ? "#ef4444" : 
                                          passwordStrength === 2 ? "#eab308" : 
                                          passwordStrength === 3 ? "#3b82f6" : "#10b981"
                          }}
                          className="h-full"
                        />
                      </div>
                    )}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <i className="ri-lock-password-line"></i>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Confirm Password"
                      required
                    />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full py-3 rounded-lg font-semibold transition duration-300 relative overflow-hidden group
                      ${loading 
                        ? 'bg-slate-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#4f7cff] to-[#6e4ff7] text-white shadow-lg shadow-blue-900/30'
                      }
                    `}
                  >
                    <span className="relative z-10">
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#6e4ff7] to-[#4f7cff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                  </motion.button>
                </form>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="relative my-8"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a3654]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#121927] text-slate-400">or sign up with</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 p-3 border border-[#2a3654] rounded-xl hover:border-[#4f7cff]/30 hover:bg-[#4f7cff]/10 transition duration-300"
                  >
                    <img className="w-5 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />
                    <span className="text-sm text-slate-300">Google</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 p-3 border border-[#2a3654] rounded-xl hover:border-[#4f7cff]/30 hover:bg-[#4f7cff]/10 transition duration-300"
                  >
                    <i className="ri-apple-fill text-xl text-slate-300"></i>
                    <span className="text-sm text-slate-300">Apple</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add CSS animation for stars */}
      <style jsx="true">{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SignUp;