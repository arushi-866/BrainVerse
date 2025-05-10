import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:2006/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Add timestamp to track login time
        const userData = {
          ...response.data.user,
          loginTimestamp: new Date().toISOString(),
          // Make sure hasCompletedRegistration is explicitly boolean
          hasCompletedRegistration: response.data.user.hasCompletedRegistration === true
        };
        
        // Store full user data and token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Debug logging for registration status
        console.log('User data stored:', userData); 
        console.log('User role:', userData.role);
        console.log('Has completed registration:', userData.hasCompletedRegistration);
        
        // Redirect based on user role and registration status
        switch(response.data.user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          default:
            // For regular users, check registration completion status - use strict comparison
            if (userData.hasCompletedRegistration !== true) {
              console.log('Redirecting to child registration form - first login flow');
              navigate('/dashboard');
            } else {
              console.log('Redirecting to main dashboard - registration already completed');
              navigate('/dashboard');
            }
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#f0f7f0] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4CAF50] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5C9DFF] opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5"
           style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
                   backgroundSize: '20px 20px'}}></div>

      <div className="container mx-auto min-h-screen flex flex-col px-4 relative">
        {/* Back button - Repositioned */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 group inline-flex items-center px-5 py-2.5 bg-white text-[#4CAF50] rounded-full hover:bg-[#4CAF50] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <i className="ri-arrow-left-s-line mr-2"></i>
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Main content - Centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl w-full">
            {/* Left content - Adjusted spacing */}
            <div className="max-w-xl space-y-6 px-4 lg:px-8">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#4CAF50] uppercase bg-[#4CAF50]/10 rounded-full">
                  Welcome Back
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                  Sign In to Your <span className="text-[#4CAF50] relative">Account
                    <svg className="absolute bottom-1 left-0 w-full h-3 -z-10 text-[#4CAF50]/10" viewBox="0 0 172 16" fill="none">
                      <path d="M1 15.5C1 15.5 64 1 86 1C108 1 171.5 15.5 171.5 15.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {/* Track your child's developmental milestones and get personalized guidance for their growth journey */}
                </p>
              </div>
            </div>

            {/* Login Form - Enhanced layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#4CAF50]/20 to-[#5C9DFF]/20 rounded-xl transform rotate-2"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-xl p-8 border border-white/20">
                <div className="mb-7">
                  <h3 className="font-semibold text-2xl text-[#333333]">Sign In</h3>
                  <p className="text-[#6C757D]">
                    Don't have an account? 
                    <Link to="/signup" className="text-sm text-[#4CAF50] hover:text-[#45a049] ml-1">
                      Sign Up
                    </Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50]"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4CAF50]"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4CAF50]"
                    >
                      {showPassword ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link to="/forgot-password" className="text-sm text-[#4CAF50] hover:text-[#45a049]">
                      Forgot your password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl font-semibold
                             shadow-lg shadow-[#4CAF50]/20 transition duration-300"
                  >
                    Sign in
                  </button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#6C757D]">or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-[#4CAF50]/20 hover:bg-[#4CAF50]/5 transition duration-300"
                    >
                      <img className="w-5 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />
                      <span className="text-sm text-[#333333]">Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-[#4CAF50]/20 hover:bg-[#4CAF50]/5 transition duration-300"
                    >
                      <i className="ri-apple-fill text-xl text-[#333333]"></i>
                      <span className="text-sm text-[#333333]">Apple</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#4CAF50]/20 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;