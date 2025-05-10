import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:2006/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        dob: formData.dob
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirect directly to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
    w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg
    focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20
    text-[#333333] placeholder-[#6C757D]
    transition-all duration-300
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[#f0f7f0] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4CAF50]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5C9DFF]/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto min-h-screen flex flex-col px-4 relative">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 group inline-flex items-center px-5 py-2.5 bg-white text-[#4CAF50] rounded-full hover:bg-[#4CAF50] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <i className="ri-arrow-left-s-line mr-2"></i>
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl w-full">
            {/* Left content */}
            <div className="max-w-xl space-y-6 px-4 lg:px-8">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#4CAF50] uppercase bg-[#4CAF50]/10 rounded-full">
                  Get Started
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                  Create Your <span className="text-[#4CAF50] relative">Account
                    <svg className="absolute bottom-1 left-0 w-full h-3 -z-10 text-[#4CAF50]/10" viewBox="0 0 172 16" fill="none">
                      <path d="M1 15.5C1 15.5 64 1 86 1C108 1 171.5 15.5 171.5 15.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {/* Join us to access personalized support and track your child's developmental journey */}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#4CAF50]/20 to-[#5C9DFF]/20 rounded-xl transform rotate-2"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-xl p-8 border border-white/20">
                <div className="mb-7">
                  <h3 className="font-semibold text-2xl text-[#333333]">Sign Up</h3>
                  <p className="text-[#6C757D]">
                    Already have an account?
                    <Link to="/login" className="text-sm text-[#4CAF50] hover:text-[#45a049] ml-1">
                      Sign In
                    </Link>
                  </p>
                </div>

                {/* Keep your existing form but wrap it in the new styling */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-50 text-red-500 text-sm border border-red-100"
                    >
                      {error}
                    </motion.div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Email"
                    required
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#6C757D] ml-1">
                      {/* Date of Birth */}
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`${inputClasses} cursor-pointer`}
                      required
                      max={new Date().toISOString().split('T')[0]} // Prevents future dates
                    />
                  </div>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Password"
                    required
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Confirm Password"
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full py-2.5 rounded-lg font-semibold transition duration-300
                      ${loading 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-md shadow-[#4CAF50]/20'
                      }
                    `}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                {/* Keep the exact same social login section */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-[#6C757D]">or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-[#4CAF50]/20 hover:bg-[#4CAF50]/5 transition duration-300">
                    <img className="w-5 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" />
                    <span className="text-sm">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-[#4CAF50]/20 hover:bg-[#4CAF50]/5 transition duration-300">
                    <i className="ri-apple-fill text-xl"></i>
                    <span className="text-sm">Apple</span>
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#4CAF50]/20 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
