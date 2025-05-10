import React, { useState, useEffect } from 'react';
import { 
  User, Lock, Bell, Edit2, Trash2, LogOut, 
  Heart, Award, Settings, Shield, Activity 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const avatarSet = 'https://api.dicebear.com/7.x/adventurer/svg?seed=';
const generateAvatars = () => Array.from({ length: 10 }, (_, i) => `${avatarSet}avatar${i}`);

const HealthInsights = ({ bmi, weight, height }) => {
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-yellow-500' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = getBMICategory(parseFloat(bmi));

  return (
    <div className="bg-gray-700 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-400" />
          <span className="font-semibold">Health Insights</span>
        </div>
        <span className={`font-bold ${bmiInfo.color}`}>{bmiInfo.category}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center">
          <p className="text-sm text-gray-400">BMI</p>
          <p className="font-bold">{bmi}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Weight</p>
          <p className="font-bold">{weight} kg</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Height</p>
          <p className="font-bold">{height} cm</p>
        </div>
      </div>
    </div>
  );
};

const API_URL = 'http://localhost:2006/api';

const Profile = () => {
  const [avatars] = useState(generateAvatars());
  const [showAvatars, setShowAvatars] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 25,
    height: 175,
    weight: 70,
    avatar: avatars[0],
    notifications: true,
    achievements: [
      { title: 'Profile Completed', icon: Award },
      { title: 'First Avatar Change', icon: Heart },
    ]
  });

  const calculateBMI = (weight, height) => (weight / ((height / 100) ** 2)).toFixed(2);
  const [bmi, setBmi] = useState(calculateBMI(user.weight, user.height));
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No auth token found');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      console.log('Making request to:', `${API_URL}/users/profile`);
      const response = await axios.get(`${API_URL}/users/profile`, config);
      
      if (!response.data.success) {
        throw new Error('Failed to load profile data');
      }

      const userData = response.data.user;
      
      setUser({
        name: userData.firstName || 'User',
        email: userData.email || '',
        age: userData.bmiData?.age || 25,
        height: userData.bmiData?.height || 170,
        weight: userData.bmiData?.weight || 70,
        avatar: userData.avatar || avatars[0],
        notifications: true,
        achievements: [
          { title: 'Profile Completed', icon: Award },
          { title: 'First Avatar Change', icon: Heart },
        ]
      });

      if (userData.bmiData?.height && userData.bmiData?.weight) {
        setBmi(calculateBMI(userData.bmiData.weight, userData.bmiData.height));
      }
    } catch (error) {
      console.error('Profile load error:', error.response || error);
      toast.error(error.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);

    if (name === 'height' || name === 'weight') {
      setBmi(calculateBMI(updatedUser.weight, updatedUser.height));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      
      const updateData = {
        firstName: user.name,
        bmiData: {
          height: parseFloat(user.height),
          weight: parseFloat(user.weight),
          age: parseInt(user.age),
          bmi: parseFloat(bmi)
        }
      };

      const response = await axios.put(`${API_URL}/users/profile`, updateData, config);
      
      if (response.data.success) {
        setIsEditing(false);
        toast.success('Profile updated successfully');
        await loadUserProfile(); // Reload profile to ensure data consistency
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      await axios.put(`${API_URL}/users/password`, {
        currentPassword,
        newPassword
      }, config);
      setShowPasswordModal(false);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleAvatarChange = async (avatarUrl) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      await axios.put(`${API_URL}/users/avatar`, { avatar: avatarUrl }, config);
      setUser({ ...user, avatar: avatarUrl });
      setShowAvatars(false);
      toast.success('Avatar updated successfully');
    } catch (error) {
      toast.error('Failed to update avatar');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-10 px-4">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-gradient"></div>
      
      <div className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden transition-all duration-300 hover:shadow-blue-500/20">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"></div>
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="relative w-32 h-32 rounded-full border-4 border-blue-500/50 shadow-lg transform hover:scale-105 transition-all duration-300"
            />
            <button 
              onClick={() => setShowAvatars(!showAvatars)}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2.5 hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-3xl font-bold mt-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {user.name}
          </h2>
        </div>

        {showAvatars && (
          <div className="mb-8 bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="grid grid-cols-5 gap-4">
              {avatars.map((avt, index) => (
                <img
                  key={index}
                  src={avt}
                  alt={`Avatar ${index + 1}`}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-all duration-300 hover:scale-110 ${
                    user.avatar === avt ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-500 hover:border-blue-400'
                  }`}
                  onClick={() => handleAvatarChange(avt)}
                />
              ))}
            </div>
            <button
              onClick={() => setShowAvatars(false)}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30"
            >
              <Shield className="inline-block mr-2 w-5 h-5" /> Save Avatar
            </button>
          </div>
        )}

        <div className="space-y-4">
          {['name', 'email', 'age', 'height', 'weight'].map((field) => (
            <div key={field} 
              className="flex justify-between items-center bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg hover:bg-gray-700/70 transition-all duration-300"
            >
              <label className="capitalize flex items-center text-gray-300">
                <User className="mr-3 w-5 h-5 text-blue-400" />
                {field}:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                  className="bg-gray-600/80 p-2 rounded text-white w-48 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              ) : (
                <span className="font-medium text-white">{user[field]}</span>
              )}
            </div>
          ))}
        </div>

        <HealthInsights bmi={bmi} weight={user.weight} height={user.height} />

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            <Edit2 className="mr-2 w-5 h-5" /> {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
          >
            <Lock className="mr-2 w-5 h-5" /> Change Password
          </button>
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-blue-400" />
              <span>Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={user.notifications}
                onChange={() => setUser({ ...user, notifications: !user.notifications })}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
            </label>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-red-500/30">
            <Trash2 className="mr-2 w-5 h-5" /> Delete Account
          </button>
          <button className="w-full bg-gray-700 hover:bg-gray-800 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gray-500/30">
            <LogOut className="mr-2 w-5 h-5" /> Logout
          </button>
        </div>

        {user.achievements.length > 0 && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">Achievements</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {user.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-600 p-2 rounded space-x-2"
                >
                  <achievement.icon className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">{achievement.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <input 
                type="password" 
                name="currentPassword"
                placeholder="Current Password" 
                className="w-full p-3 bg-gray-700 rounded mb-3" 
              />
              <input 
                type="password" 
                name="newPassword"
                placeholder="New Password" 
                className="w-full p-3 bg-gray-700 rounded mb-3" 
              />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm New Password" 
                className="w-full p-3 bg-gray-700 rounded mb-4" 
              />
              <div className="flex justify-between">
                <button 
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;