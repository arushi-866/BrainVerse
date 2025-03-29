import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  UserGroupIcon, 
  UserPlusIcon, 
  BellIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import CreateGroupModal from './modals/CreateGroupModal';
import AddExpenseModal from './modals/AddExpenseModal';
import AddFriendModal from './modals/AddFriendModal';
import GroupDetailsModal from './modals/GroupDetailsModal';

export default function Dashboard() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Sample data
  const groups = [
    { id: 1, name: 'Roommates', members: 4, totalExpenses: 1200, lastActivity: new Date(2025, 2, 10) },
    { id: 2, name: 'Trip to Goa', members: 6, totalExpenses: 3500, lastActivity: new Date(2025, 2, 8) },
    { id: 3, name: 'Office Team', members: 8, totalExpenses: 2450, lastActivity: new Date(2025, 2, 5) },
  ];

  const friends = [
    { id: 1, name: 'John Doe', email: 'john@example.com', owes: 350, isOwed: 120 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', owes: 0, isOwed: 580 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', owes: 420, isOwed: 0 },
  ];

  const recentActivities = [
    { id: 1, title: 'Dinner at Olive Garden', group: 'Roommates', amount: 640, date: new Date(2025, 2, 10) },
    { id: 2, title: 'Cab fare', group: 'Trip to Goa', amount: 350, date: new Date(2025, 2, 9) },
    { id: 3, title: 'Movie tickets', group: 'Office Team', amount: 800, date: new Date(2025, 2, 7) },
  ];

  // Filter groups based on search query
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter friends based on search query
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load sample notifications
  useEffect(() => {
    setNotifications([
      { id: 1, text: 'Jane added a new expense of ₹350 in Trip to Goa', time: '10 min ago' },
      { id: 2, text: 'Mike joined the Office Team group', time: '1 hour ago' },
      { id: 3, text: 'You have an outstanding payment to John', time: '2 hours ago' },
    ]);
  }, []);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowGroupDetails(true);
  };

  // Filter for owing/owed tab
  const getFilteredFriends = () => {
    if (activeTab === 'owes') {
      return filteredFriends.filter(friend => friend.owes > 0);
    } else if (activeTab === 'owed') {
      return filteredFriends.filter(friend => friend.isOwed > 0);
    }
    return filteredFriends;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search groups or friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
            />
          </div>
          
          {/* Add Expense Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExpenseModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Expense</span>
          </motion.button>
          
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="bg-white text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center relative"
            >
              <BellIcon className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <p className="text-sm text-gray-800">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-gray-50 text-center">
                    <button className="text-sm text-primary-600 hover:text-primary-800">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">You are owed</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">₹700</p>
          <p className="text-sm text-gray-600 mt-1">From 2 people</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <CurrencyRupeeIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">You owe</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">₹770</p>
          <p className="text-sm text-gray-600 mt-1">To 1 person</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total expenses</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">₹7,150</p>
          <p className="text-sm text-gray-600 mt-1">Across {groups.length} groups</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Groups</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGroupModal(true)}
              className="bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-3 rounded-lg border border-gray-300 shadow-sm flex items-center space-x-2 text-sm transition-colors"
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Create Group</span>
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <motion.div
                  key={group.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleGroupClick(group)}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-600">
                        {group.members} members · ₹{group.totalExpenses.toLocaleString()} total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last activity</p>
                      <p className="text-sm font-medium text-gray-700">
                        {format(group.lastActivity, 'dd MMM')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No groups matching your search</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Friends Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Friends</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFriendModal(true)}
              className="bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-3 rounded-lg border border-gray-300 shadow-sm flex items-center space-x-2 text-sm transition-colors"
            >
              <UserPlusIcon className="h-5 w-5" />
              <span>Add Friend</span>
            </motion.button>
          </div>

          {/* Tabs for filtering friends */}
          <div className="flex space-x-2 mb-4 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('owes')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'owes' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Owes you
            </button>
            <button 
              onClick={() => setActiveTab('owed')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'owed' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              You owe
            </button>
          </div>

          <div className="space-y-4">
            {getFilteredFriends().length > 0 ? (
              getFilteredFriends().map(friend => (
                <motion.div
                  key={friend.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-600">{friend.email}</p>
                    </div>
                    <div className="text-right">
                      {friend.owes > 0 && (
                        <p className="text-sm font-medium text-green-600">
                          Owes you ₹{friend.owes}
                        </p>
                      )}
                      {friend.isOwed > 0 && (
                        <p className="text-sm font-medium text-red-600">
                          You owe ₹{friend.isOwed}
                        </p>
                      )}
                      {friend.owes === 0 && friend.isOwed === 0 && (
                        <p className="text-sm font-medium text-gray-600">
                          All settled up
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No friends matching your criteria</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {recentActivities.map(activity => (
            <motion.div
              key={activity.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600">
                  {activity.group} · {format(activity.date, 'dd MMM yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{activity.amount}</p>
                <button className="text-xs text-primary-600 hover:text-primary-800 mt-1">
                  View details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <CreateGroupModal isOpen={showGroupModal} onClose={() => setShowGroupModal(false)} />
      <AddExpenseModal isOpen={showExpenseModal} onClose={() => setShowExpenseModal(false)} />
      <AddFriendModal isOpen={showFriendModal} onClose={() => setShowFriendModal(false)} />
      <GroupDetailsModal
        isOpen={showGroupDetails}
        onClose={() => setShowGroupDetails(false)}
        group={selectedGroup}
      />
    </div>
  );
}