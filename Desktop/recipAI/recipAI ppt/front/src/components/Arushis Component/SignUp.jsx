import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check, UserPlus, ShieldCheck, Mail, Phone } from 'lucide-react';
import countries from './countries'; // You'll need to create this file with country codes

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91', // Default country code
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

    // Check if passwords match and update error
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

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Restrict phone number to only digits and 10 characters
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
      if (value.length > 10) return; // Stop input after 10 digits
    }
  
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  

  // Check if password meets all requirements
  const isPasswordValid = () => {
    return Object.values(passwordValidation).every(Boolean);
  };

  // Send OTP
  const sendOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `${formData.countryCode}${formData.phone}`,
          email: formData.email
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setOtpError('');
      } else {
        setOtpError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `${formData.countryCode}${formData.phone}`,
          otp: formData.otp
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Failed to verify OTP. Please try again.");
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required (10 digits)';
    }

    // Password validation
    if (!isPasswordValid()) {
      newErrors.password = 'Password does not meet all requirements';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // OTP validation
    if (!otpVerified) {
      newErrors.otp = 'Phone number must be verified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF7F5] to-[#7CC5B8]  flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <UserPlus size={48} className="text-primary-600 drop-shadow-md" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure and fast registration process
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Name Input */}
            <div className="relative">
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <UserPlus size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  required
                  className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex space-x-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-28 rounded-lg border border-gray-300 text-gray-900 sm:text-sm focus:ring-2 focus:ring-primary-500"
                >
                 {countries.map((country) => (
                  <option key={`${country.dial_code}-${country.code}`} value={country.dial_code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
                </select>
                <div className="relative flex-grow">
                  <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength="10"
                    className={`pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              
              {/* OTP Section */}
              <div className="mt-2 flex">
                <button
                  type="button"
                  onClick={sendOTP}
                  className="mr-2 bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700"
                >
                  {otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
                {otpSent && (
                  <div className="flex-grow">
                    <input
                      name="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      className={`w-full px-3 py-1 border rounded-md ${
                        errors.otp ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={verifyOTP}
                      className="mt-1 text-xs text-primary-600 hover:text-primary-800"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
              {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}
              {otpVerified && (
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <Check size={16} className="mr-1" /> Phone number verified
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword.password ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10`}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Requirements Checklist */}
              <div className="mt-2">
                <p className="text-xs text-gray-600">Password must contain:</p>
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.length ? '✓' : '✗'} At least 8 characters
                  </li>
                  <li className={`flex items-center ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.uppercase ? '✓' : '✗'} At least one uppercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.lowercase ? '✓' : '✗'} At least one lowercase letter
                  </li>
                  <li className={`flex items-center ${passwordValidation.number ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.number ? '✓' : '✗'} At least one number
                  </li>
                  <li className={`flex items-center ${passwordValidation.specialChar ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.specialChar ? '✓' : '✗'} At least one special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!isPasswordValid() || !otpVerified}
              className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white space-x-2 ${
                isPasswordValid() && otpVerified
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800' 
                  : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300`}
            >
              <ShieldCheck size={20} />
              <span>Create Secure Account</span>
            </motion.button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account? {' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}