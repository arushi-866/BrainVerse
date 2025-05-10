import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BMICalculator = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: ''
  });
  const [bmiResult, setBmiResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch(step) {
      case 1:
        return formData.age !== '' && formData.age > 0;
      case 2:
        return formData.weight !== '' && formData.weight > 0;
      case 3:
        return formData.height !== '' && formData.height > 0;
      default:
        return true;
    }
  };

  const handleClose = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.hasCompletedBmiCalculator) {
      onClose();
    }
  };

  const calculateBMI = async () => {
    try {
      const weightInKg = parseFloat(formData.weight);
      const heightInM = parseFloat(formData.height) / 100;
      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(2);
      
      setBmiResult(bmi);
      setStep(5);

    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  const handleSubmitBMI = async () => {
    try {
      setError(null);
      setIsSubmitting(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Update the endpoint path
      const response = await axios.post(
        'http://localhost:2006/api/users/bmi',  // Changed from user/bmi to users/bmi
        {
          bmi: bmiResult,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          gender: formData.gender
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user') || '{}'),
          ...response.data.user,
          hasCompletedBmiCalculator: true
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Failed to save BMI data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFinalStep = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className="p-6 bg-primary/5 rounded-2xl mb-6">
        <h3 className="text-xl font-semibold mb-4 text-text">Your BMI Result</h3>
        <div className="text-5xl font-bold text-primary mb-4">{bmiResult}</div>
        <p className="text-text-light text-lg mb-2">
          {bmiResult < 18.5 ? 'Underweight' :
           bmiResult < 25 ? 'Normal weight' :
           bmiResult < 30 ? 'Overweight' : 'Obese'}
        </p>
        <p className="text-sm text-text-light">
          Height: {formData.height}cm | Weight: {formData.weight}kg
        </p>
      </div>
      
      <div className="space-y-3">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100"
          >
            {error}
          </motion.div>
        )}
        
        <button
          onClick={handleSubmitBMI}
          disabled={isSubmitting}
          className={`
            w-full py-4 rounded-xl text-white transition-all duration-300 
            font-medium text-lg shadow-lg transform
            ${isSubmitting 
              ? 'bg-primary/50 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark hover:shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Saving...
            </span>
          ) : (
            'Save and Continue'
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text">How old are you?</h3>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-4 text-2xl text-center bg-background border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary"
              placeholder="Age in years"
            />
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text">What's your weight?</h3>
            <div className="relative">
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full p-4 text-2xl text-center bg-background border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary"
                placeholder="Weight"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light">kg</span>
            </div>
            <p className="text-sm text-text-light text-center mt-2">
              Please enter your weight in kilograms
            </p>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text">What's your height?</h3>
            <div className="relative">
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full p-4 text-2xl text-center bg-background border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary"
                placeholder="Height"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light">cm</span>
            </div>
            <p className="text-sm text-text-light text-center mt-2">
              Please enter your height in centimeters
            </p>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text">What's your gender?</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Male', 'Female'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setFormData({ ...formData, gender: gender.toLowerCase() });
                    calculateBMI();
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 group
                    ${formData.gender === gender.toLowerCase()
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : 'border-primary/20 hover:border-primary hover:bg-primary/5'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <i className={`${gender === 'Male' ? 'ri-men-line' : 'ri-women-line'} text-2xl`}></i>
                    <span className="font-medium">{gender}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="p-6 bg-primary/5 rounded-2xl mb-6">
              <h3 className="text-xl font-semibold mb-4 text-text">Your BMI Result</h3>
              <div className="text-5xl font-bold text-primary mb-4">{bmiResult}</div>
              <p className="text-text-light text-lg mb-2">
                {bmiResult < 18.5 ? 'Underweight' :
                 bmiResult < 25 ? 'Normal weight' :
                 bmiResult < 30 ? 'Overweight' : 'Obese'}
              </p>
              <p className="text-sm text-text-light">
                Height: {formData.height}cm | Weight: {formData.weight}kg
              </p>
            </div>
            
            <div className="space-y-3">
              {error && (
                <div className="p-3 mb-4 text-sm bg-red-50 text-red-500 rounded-lg">
                  {error}
                </div>
              )}
              <button
                onClick={handleSubmitBMI}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white transition-all duration-300 
                  ${isSubmitting 
                    ? 'bg-primary/50 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary-dark hover:shadow-xl shadow-primary/20'
                  }`}
              >
                {isSubmitting ? 'Saving...' : 'Save and Continue to Dashboard'}
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={handleClose}
      ></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
        >
          {step < 5 && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-text-light hover:text-accent transition-colors duration-300"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-2">Calculate Your BMI</h2>
            <p className="text-text-light">Let's get started with some basic measurements</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-1/4 h-1 rounded-full transition-all duration-300 ${
                    step >= stepNumber ? 'bg-primary' : 'bg-primary/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-text-light text-center">Step {step} of 4</p>
          </div>

          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 1 && step < 5 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 rounded-xl border-2 border-primary/20 text-primary hover:bg-primary/5"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className={`px-6 py-2 rounded-xl ml-auto ${
                  validateCurrentStep()
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-primary/50 text-white cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BMICalculator;
