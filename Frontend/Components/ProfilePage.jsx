import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiEdit } from 'react-icons/fi'; // Icons for fields and actions

// Mock user data fetch function
const fetchUserData = async () => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    role: 'Project Manager',
    avatarUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=JD', 
  };
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. Fetch Data on Load (Read Operation) ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
        setFormData(data); // Initialize form data with fetched data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  // --- 2. Handle Form Changes ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- 3. Handle Form Submission (Update Operation) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting updated user data:', formData);
    
    // Simulate API call to save data
    // **Client-side validation would occur here before API call**
    
    setIsEditing(false); // Switch back to view mode after submission
    setUser(formData); // Update local user state
    alert("Profile updated successfully!");
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading user profile...</div>;
  }
  
  if (!user) {
      return <div className="p-6 text-center text-red-500">Failed to load user profile.</div>;
  }


  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-xl">
      
      {/* Header and Edit/Save Button */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <FiUser className="w-6 h-6 mr-3 text-blue-600" />
          My Profile
        </h2>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            <FiEdit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <button
            form="profile-form"
            type="submit"
            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150"
          >
            <FiSave className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        )}
      </div>

      <form id="profile-form" onSubmit={handleSubmit}>
        
        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-8">
          <img 
            className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-gray-100" 
            src={user.avatarUrl} 
            alt="User Avatar" 
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Profile Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* First Name */}
          <div className="space-y-1">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center">
                <FiUser className="w-4 h-4 mr-2 text-gray-400" />
                First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className={`w-full px-4 py-2 border rounded-lg transition duration-150 ${isEditing ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center">
                <FiUser className="w-4 h-4 mr-2 text-gray-400" />
                Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className={`w-full px-4 py-2 border rounded-lg transition duration-150 ${isEditing ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
            />
          </div>
          
          {/* Email Address */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                <FiMail className="w-4 h-4 mr-2 text-gray-400" />
                Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className={`w-full px-4 py-2 border rounded-lg transition duration-150 ${isEditing ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
            />
          </div>
          
          {/* Phone Number */}
          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg transition duration-150 ${isEditing ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
            />
          </div>
        </div>

        {/* Password Reset Section (Always active for security) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <FiLock className="w-5 h-5 mr-3 text-red-500" />
                Security
            </h3>
            <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-lg hover:bg-red-100 transition duration-150"
                onClick={() => alert("Redirecting to password change form...")}
            >
                Change Password
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;