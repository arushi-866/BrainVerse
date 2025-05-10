import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import BMICalculator from './BMICalculator/BMICalculator';
import DashboardHome from './pages/DashboardHome';
import TrendingPage from './pages/TrendingPage';
import IngredientsPage from './pages/IngredientsPage';
import RecipeSuggestionsPage from './pages/RecipeSuggestionsPage';
import FavoritesPage from './pages/FavoritesPage';
import NutrientChartPage from './pages/NutrientChartPage';
import CommunityPage from './pages/CommunityPage';
import StockupPage from './pages/StockupPage';
import CalorieTrackerPage from './pages/CalorieTrackerPage';
import CommunityForum from './pages/CommunityForum';
import axios from 'axios';

// Create a wrapper component to use the context
const DashboardContent = () => {
  const { isOpen } = useSidebar();
  const [showBMICalculator, setShowBMICalculator] = useState(false);
  const navigate = useNavigate();

  // Add check for BMI completion status
  useEffect(() => {
    const checkBMIStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://localhost:2006/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          const user = response.data.user;
          // Update localStorage with fresh user data
          localStorage.setItem('user', JSON.stringify(user));
          // Only show BMI calculator if not completed
          setShowBMICalculator(!user.hasCompletedBmiCalculator);
        }
      } catch (error) {
        console.error('Error checking BMI status:', error);
      }
    };

    checkBMIStatus();
  }, []);

  // Update handleBMIClose to permanently close the calculator
  const handleBMIClose = () => {
    setShowBMICalculator(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${
        isOpen ? 'md:ml-72' : 'md:ml-20'
      }`}>
        <TopNav />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/child/registration" element={<ChildRegistration />} />
            <Route path="/milestones/*" element={<MilestonesRoutes />} />
            <Route path="/health/*" element={<HealthRoutes />} />
            <Route path="/consultations/*" element={<ConsultationsRoutes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/recipes/suggestions" element={<RecipeSuggestionsPage />} />
            <Route path="/recipes/favorites" element={<FavoritesPage />} />
            <Route path="/nutrients" element={<NutrientChartPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/forum" element={<CommunityForum />} />
            <Route path="/leftovers" element={<StockupPage />} />
            <Route path="/nutrition" element={<CalorieTrackerPage />} />
          </Routes>
        </main>
      </div>

      <AnimatePresence>
        {showBMICalculator && (
          <BMICalculator onClose={handleBMIClose} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Main component that provides the context
const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
};

// Placeholder components until they're implemented
const ChildRegistration = () => <div>Child Registration</div>;
const MilestonesRoutes = () => <div>Milestones</div>;
const HealthRoutes = () => <div>Health</div>;
const ConsultationsRoutes = () => <div>Consultations</div>;
const Settings = () => <div>Settings</div>;

export default DashboardLayout;
