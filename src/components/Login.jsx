import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle login logic here
    setIsLoading(false);
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-600 opacity-20 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="max-w-md w-full space-y-8 bg-[#0f172a]/80 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-[#334155]/30 relative z-10"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerChildren}
        >
          <motion.div 
            className="flex justify-center"
            variants={itemVariant}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=equalify"
                alt="Equalify Logo"
                className="h-10 w-10 text-white"
              />
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariant}
            className="mt-6 text-center text-3xl font-extrabold text-white"
          >
            Welcome back
          </motion.h2>
          
          <motion.p 
            variants={itemVariant}
            className="mt-2 text-center text-sm text-blue-200"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign up
            </Link>
          </motion.p>
        </motion.div>
        
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          variants={staggerChildren}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="rounded-md space-y-4"
            variants={itemVariant}
          >
            <motion.div
              whileHover={{ y: -2 }}
              className={`relative ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-all duration-300`}
            >
              <label htmlFor="email-address" className="absolute -top-2 left-2 px-1 text-xs font-medium text-blue-300 bg-[#0f172a]">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-[#334155] bg-[#1e293b]/40 placeholder-[#94a3b8] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
                animate={{
                  borderColor: focusedField === 'email' ? "rgba(59, 130, 246, 0.5)" : "rgba(0, 0, 0, 0)",
                  boxShadow: focusedField === 'email' ? "0 0 0 4px rgba(59, 130, 246, 0.1)" : "none"
                }}
              />
            </motion.div>
            
            <motion.div
              whileHover={{ y: -2 }}
              className={`relative ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-all duration-300`}
            >
              <label htmlFor="password" className="absolute -top-2 left-2 px-1 text-xs font-medium text-blue-300 bg-[#0f172a]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-[#334155] bg-[#1e293b]/40 placeholder-[#94a3b8] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
                animate={{
                  borderColor: focusedField === 'password' ? "rgba(59, 130, 246, 0.5)" : "rgba(0, 0, 0, 0)",
                  boxShadow: focusedField === 'password' ? "0 0 0 4px rgba(59, 130, 246, 0.1)" : "none"
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between"
            variants={itemVariant}
          >
            <div className="flex items-center">
              <motion.div 
                className="relative h-4 w-4"
                whileTap={{ scale: 0.9 }}
              >
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 opacity-0 absolute z-10 cursor-pointer"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <div className={`h-4 w-4 rounded border ${formData.rememberMe ? 'bg-blue-500 border-blue-500' : 'border-[#334155]'} transition-colors duration-200`}></div>
                {formData.rememberMe && (
                  <motion.svg 
                    initial={{ opacity: 0, scale: 0.5 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="h-4 w-4 absolute top-0 left-0 text-white"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </motion.div>
              <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
                Remember me
              </label>
            </div>

            <motion.div 
              className="text-sm"
              whileHover={{ scale: 1.03 }}
            >
              <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariant}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/20 disabled:opacity-70"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign in
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 rounded-lg overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-full w-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-50" />
              </motion.div>
            </motion.button>
          </motion.div>
          
          <motion.div 
            variants={itemVariant}
            className="flex justify-center space-x-4 pt-2"
          >
            {['github', 'google', 'twitter'].map((provider) => (
              <motion.button
                key={provider}
                type="button"
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1e293b] border border-[#334155] text-blue-300 hover:text-blue-200 transition-all duration-300"
              >
                <span className="sr-only">Sign in with {provider}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d={
                    provider === 'github' 
                      ? "M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C17.137 18.163 20 14.418 20 10 20 4.477 15.523 0 10 0z"
                      : provider === 'google'
                      ? "M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm-.01 15c-2.487 0-4.5-2.015-4.5-4.5S7.503 6 9.99 6s4.5 2.015 4.5 4.5-2.013 4.5-4.5 4.5zm6.747-8.7c-.325-.196-.546-.612-.546-1.1 0-.825.672-1.5 1.5-1.5.536 0 1.005.284 1.268.709C17.347 3.129 15.21 2 12.695 2c-3.314 0-5.73 2.562-5.73 5.73 0 3.168 3.066 5.77 6.418 5.77 3.314 0 5.73-2.562 5.73-5.73 0-.435-.163-.84-.376-1.17z"
                      : "M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  } clipRule="evenodd" />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        </motion.form>
      </motion.div>
      
      <div className="absolute bottom-4 text-center text-blue-300/50 text-xs">
        © 2025 Equalify. All rights reserved.
      </div>
    </div>
  );
}