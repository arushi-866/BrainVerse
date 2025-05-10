import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import api from '../../services/axiosConfig';

const AuthProtectedRoute = ({ requiresAuth = true, allowedRoles = [], redirectPath = '/login' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationCompleted, setRegistrationCompleted] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found');
        setIsAuthenticated(false);
        setRegistrationCompleted(false);
        setLoading(false);
        return;
      }
      
      try {
        // First check localStorage for cached data
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const registrationStatus = userData.hasCompletedRegistration === true;
        
        // Then verify token with the server
        const response = await api.get('/auth/verify');
        
        if (response.data.success) {
          setUserRole(userData.role);
          setIsAuthenticated(true);
          
          // If we're on the registration form path, double-check with server
          if (location.pathname === '/dashboard/child/registration') {
            try {
              const registrationResponse = await api.get('/users/registration-status');
              
              // Use strict comparison to ensure boolean value
              const serverStatus = registrationResponse.data.hasCompletedRegistration === true;
              
              // If server and localStorage disagree, trust the server
              if (serverStatus !== registrationStatus) {
                console.log('Registration status mismatch. Server:', serverStatus, 'Local:', registrationStatus);
                
                // Update localStorage to match server
                localStorage.setItem('user', JSON.stringify({
                  ...userData,
                  hasCompletedRegistration: serverStatus
                }));
                
                setRegistrationCompleted(serverStatus);
              } else {
                setRegistrationCompleted(registrationStatus);
              }
            } catch (registrationError) {
              console.error('Failed to check registration status with server:', registrationError);
              // Fall back to localStorage value if server check fails
              setRegistrationCompleted(registrationStatus);
            }
          } else {
            // For other paths, use the localStorage value
            setRegistrationCompleted(registrationStatus);
          }
        } else {
          console.log('Token verification failed');
          // Clear invalid auth data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setRegistrationCompleted(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        // Only clear token if it's an authentication error (401)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        setIsAuthenticated(false);
        setRegistrationCompleted(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);
  
  // Add a debug log to see component state
  useEffect(() => {
    if (!loading) {
      console.log('AuthProtectedRoute state:', { 
        path: location.pathname,
        isAuthenticated, 
        userRole, 
        registrationCompleted 
      });
    }
  }, [loading, isAuthenticated, userRole, registrationCompleted, location.pathname]);

  if (loading) {
    // Show loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#4CAF50] border-r-2"></div>
      </div>
    );
  }

  // For non-auth required routes (like login page)
  if (!requiresAuth) {
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Handle registration form special case
  if (location.pathname === '/dashboard/child/registration') {
    // Skip the redirect if we're explicitly on the registration page
    // Only redirect away if registration is completed with strict boolean check
    if (registrationCompleted === true) {
      console.log('Registration already completed - redirecting to dashboard');
      return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
  }

  // Check if user role is allowed for this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const roleRedirectMap = {
      'user': '/dashboard',
      'doctor': '/doctor/dashboard',
      'admin': '/admin'
    };
    const redirectTo = roleRedirectMap[userRole] || '/login';
    return <Navigate to={redirectTo} replace />;
  }

  // For regular users trying to access dashboard, check registration status
  if (userRole === 'user' && 
      location.pathname.startsWith('/dashboard') && 
      location.pathname !== '/dashboard/child/registration') {
    
    // Only redirect if we explicitly know registration is not completed
    // Use strict boolean comparison to avoid issues with falsy values
    if (registrationCompleted === false) {
      console.log('Redirecting to registration form - incomplete registration detected');
      return <Navigate to="/dashboard/child/registration" replace />;
    }
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
