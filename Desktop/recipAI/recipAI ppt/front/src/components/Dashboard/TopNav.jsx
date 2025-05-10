import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { LogOut, ChevronDown, User } from 'lucide-react';

const TopNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen, toggleSidebar } = useSidebar();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    // Get current page title based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    };

    // Fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // In a real app, this would fetch from an API endpoint
                // For now, we'll use mock notifications
                const mockNotifications = [
                    {
                        id: '1',
                        type: 'appointment',
                        title: 'Upcoming Appointment',
                        message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM',
                        time: new Date(Date.now() - 30 * 60000), // 30 minutes ago
                        read: false,
                        path: '/dashboard/consultations/history'
                    },
                    {
                        id: '2',
                        type: 'milestone',
                        title: 'Milestone Completed',
                        message: 'Your child has reached a new development milestone!',
                        time: new Date(Date.now() - 2 * 3600000), // 2 hours ago
                        read: false,
                        path: '/dashboard/milestones/timeline'
                    },
                    {
                        id: '3',
                        type: 'reminder',
                        title: 'Vaccination Reminder',
                        message: 'Your child is due for vaccination next week',
                        time: new Date(Date.now() - 24 * 3600000), // 1 day ago
                        read: true,
                        path: '/dashboard/health/vaccinations'
                    }
                ];
                
                setNotifications(mockNotifications);
                setUnreadNotifications(mockNotifications.filter(n => !n.read).length);
                
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        
        fetchNotifications();
        
        // Refresh notifications every 5 minutes in a real app
        // const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
        // return () => clearInterval(interval);
    }, []);

    // Format relative time for notifications
    const getRelativeTime = (date) => {
        const now = new Date();
        const diffMs = now - new Date(date);
        const diffMins = Math.round(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        
        const diffHours = Math.round(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hr ago`;
        
        const diffDays = Math.round(diffHours / 24);
        if (diffDays < 7) return `${diffDays} day ago`;
        
        return new Date(date).toLocaleDateString();
    };

    const handleProfileClick = () => {
        setShowProfileMenu(false);
        navigate('/dashboard/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleNotificationClick = (notification) => {
        // Mark notification as read (in a real app, would send API request)
        setNotifications(prev => prev.map(n => 
            n.id === notification.id ? {...n, read: true} : n
        ));
        
        // Update unread count
        setUnreadNotifications(prev => Math.max(0, prev - 1));
        
        setShowNotifications(false);
        navigate(notification.path);
    };

    // Get icon for notification type
    const getNotificationIcon = (type) => {
        switch(type) {
            case 'appointment': return 'ri-calendar-check-line';
            case 'milestone': return 'ri-flag-line';
            case 'reminder': return 'ri-notification-3-line';
            case 'message': return 'ri-message-2-line';
            default: return 'ri-notification-line';
        }
    };

    return (
        <div className="sticky top-0 left-0 z-30">
            <div className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-3 border-b border-gray-200/20">
                <div className="flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 rounded-xl hover:bg-green-50 text-green-700 transition-all duration-300"
                        >
                            <motion.i 
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                className={`${isOpen ? 'ri-menu-fold-line' : 'ri-menu-unfold-line'} text-xl`}
                            />
                        </button>
                        
                        <div>
                            <motion.h1 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-xl font-bold text-green-700"
                            >
                                {getPageTitle()}
                            </motion.h1>
                            <p className="text-sm text-green-600 hidden md:block">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-green-50 transition-all duration-300"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <img
                                    src={userData?.avatar || 'https://ui-avatars.com/api/?name=' + userData?.firstName}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-green-200"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-green-700">
                                        {userData?.firstName || 'User'} {userData?.lastName || ''}
                                    </p>
                                    <p className="text-xs text-green-600">
                                        {userData?.email || ''}
                                    </p>
                                </div>
                                <ChevronDown 
                                    className={`w-4 h-4 text-green-600 transition-transform duration-300 ${
                                        showProfileMenu ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                                    >
                                        <button 
                                            onClick={() => {
                                                setShowProfileMenu(false);
                                                navigate('/dashboard/profile');
                                            }}
                                            className="w-full flex items-center px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            View Profile
                                        </button>
                                        <div className="h-px bg-gray-200 my-2" />
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
