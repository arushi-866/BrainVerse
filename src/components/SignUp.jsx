import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check, UserPlus, ShieldCheck, Mail, Phone, Loader2, ArrowRight } from 'lucide-react';
import countries from './countries';

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const pulseVariants = {
  initial: { scale: 1 },
  pulse: { 
    scale: [1, 1.02, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate password in real-time
  useEffect(() => {
    const password = formData.password;
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });

    if (formData.password !== formData.confirmPassword && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
    } else {
      setErrors(prev => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
  
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(Boolean);
  };

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setOtpError('');
    } catch (error) {
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpVerified(true);
      setOtpError('');
    } catch (error) {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required (10 digits)';
    }

    if (!isPasswordValid()) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!otpVerified) {
      newErrors.otp = 'Phone number must be verified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        // Redirect to dashboard after success animation
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2030] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence>
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="max-w-md w-full space-y-8 bg-[#1e293b]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-[#334155]/50 text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="flex justify-center mb-6"
            >
              <ShieldCheck size={72} className="text-emerald-400 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Account Created!</h2>
            <p className="text-[#94a3b8] mb-6">Your secure account is ready to use</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
            <p className="text-sm text-[#94a3b8] mt-6">Redirecting to dashboard...</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full space-y-8 bg-[#1e293b]/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-[#334155]/50"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <motion.div
                  variants={pulseVariants}
                  initial="initial"
                  animate="pulse"
                >
                  <UserPlus size={48} className="text-cyan-400 drop-shadow-md" />
                </motion.div>
              </motion.div>
              <motion.h2 
                className="text-3xl font-extrabold text-white tracking-tight"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Create Your Account
              </motion.h2>
              <motion.p 
                className="mt-2 text-sm text-[#94a3b8]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Secure and fast registration process
              </motion.p>
            </div>
            
            <motion.form 
              className="mt-8 space-y-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div className="rounded-md space-y-5" variants={containerVariants}>
                {/* Name Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label htmlFor="full-name" className="block text-sm font-medium text-[#e2e8f0] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserPlus size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      required
                      className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                        errors.name ? 'border-rose-500' : 'border-[#334155]'
                      } placeholder-[#64748b] bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all duration-200`}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      className="text-rose-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label htmlFor="email-address" className="block text-sm font-medium text-[#e2e8f0] mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                        errors.email ? 'border-rose-500' : 'border-[#334155]'
                      } placeholder-[#64748b] bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all duration-200`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      className="text-rose-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#e2e8f0] mb-1">
                    Phone Number
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-28 rounded-lg border border-[#334155] bg-[#1e293b] text-white sm:text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {countries.map((country) => (
                        <option key={`${country.dial_code}-${country.code}`} value={country.dial_code}>
                          {country.name} ({country.dial_code})
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-grow">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b]" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength="10"
                        className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                          errors.phone ? 'border-rose-500' : 'border-[#334155]'
                        } placeholder-[#64748b] bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all duration-200`}
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <motion.p 
                      className="text-rose-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                  
                  {/* OTP Section */}
                  <div className="mt-2 flex space-x-2">
                    <motion.button
                      type="button"
                      onClick={sendOTP}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                        otpSent 
                          ? 'bg-[#334155] text-[#94a3b8]' 
                          : 'bg-cyan-600 text-white hover:bg-cyan-700'
                      } transition-all duration-200`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin mr-1" />
                      ) : (
                        otpSent ? 'Resend OTP' : 'Send OTP'
                      )}
                    </motion.button>
                    {otpSent && (
                      <motion.div 
                        className="flex-grow flex space-x-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <input
                          name="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={formData.otp}
                          onChange={handleChange}
                          className={`flex-grow px-3 py-2 border rounded-md bg-[#1e293b] text-white ${
                            errors.otp ? 'border-rose-500' : 'border-[#334155]'
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        />
                        <motion.button
                          type="button"
                          onClick={verifyOTP}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition-all duration-200 flex items-center"
                          disabled={isLoading || otpVerified}
                        >
                          {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Check size={16} />
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                  {otpError && (
                    <motion.p 
                      className="text-rose-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {otpError}
                    </motion.p>
                  )}
                  {otpVerified && (
                    <motion.p 
                      className="text-emerald-400 text-xs mt-1 flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Check size={16} className="mr-1" /> Phone number verified
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-[#e2e8f0] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword.password ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                        errors.password ? 'border-rose-500' : 'border-[#334155]'
                      } placeholder-[#64748b] bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm pr-10 transition-all duration-200`}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <motion.button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94a3b8] hover:text-white"
                    >
                      {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                  
                  {/* Password Requirements Checklist */}
                  <div className="mt-2">
                    <p className="text-xs text-[#94a3b8] mb-1">Password must contain:</p>
                    <ul className="text-xs space-y-1">
                      <li className={`flex items-center ${passwordValidation.length ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <motion.span
                          animate={{ 
                            scale: passwordValidation.length ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-1"
                        >
                          {passwordValidation.length ? '✓' : '✗'}
                        </motion.span>
                        At least 8 characters
                      </li>
                      <li className={`flex items-center ${passwordValidation.uppercase ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <motion.span
                          animate={{ 
                            scale: passwordValidation.uppercase ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-1"
                        >
                          {passwordValidation.uppercase ? '✓' : '✗'}
                        </motion.span>
                        At least one uppercase letter
                      </li>
                      <li className={`flex items-center ${passwordValidation.lowercase ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <motion.span
                          animate={{ 
                            scale: passwordValidation.lowercase ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-1"
                        >
                          {passwordValidation.lowercase ? '✓' : '✗'}
                        </motion.span>
                        At least one lowercase letter
                      </li>
                      <li className={`flex items-center ${passwordValidation.number ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <motion.span
                          animate={{ 
                            scale: passwordValidation.number ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-1"
                        >
                          {passwordValidation.number ? '✓' : '✗'}
                        </motion.span>
                        At least one number
                      </li>
                      <li className={`flex items-center ${passwordValidation.specialChar ? 'text-emerald-400' : 'text-rose-400'}`}>
                        <motion.span
                          animate={{ 
                            scale: passwordValidation.specialChar ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-1"
                        >
                          {passwordValidation.specialChar ? '✓' : '✗'}
                        </motion.span>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-[#e2e8f0] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                        errors.confirmPassword ? 'border-rose-500' : 'border-[#334155]'
                      } placeholder-[#64748b] bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm pr-10 transition-all duration-200`}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <motion.button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94a3b8] hover:text-white"
                    >
                      {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p 
                      className="text-rose-500 text-xs mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!isPasswordValid() || !otpVerified || isLoading}
                  className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-medium rounded-xl text-white space-x-3 ${
                    isPasswordValid() && otpVerified && !isLoading
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/20' 
                      : 'bg-[#334155] cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300`}
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck size={20} className="group-hover:animate-pulse" />
                      <span>Create Secure Account</span>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center text-sm text-[#94a3b8]"
                variants={itemVariants}
              >
                Already have an account? {' '}
                <Link 
                  to="/login" 
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  Sign in
                </Link>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}