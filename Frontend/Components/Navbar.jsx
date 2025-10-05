import React, { useState } from 'react';
import { MdSettings } from "react-icons/md";
// Mock user data and logout function for demonstration
const mockUser = {
  name: 'Amit Yadav',
  email: 'Yadav@example.com',
  avatarUrl: 'https://media.licdn.com/dms/image/v2/D4E35AQHhzQClomdYng/profile-framedphoto-shrink_400_400/B4EZij_dYVGYAc-/0/1755097978687?e=1760299200&v=beta&t=PwTvjxYO80nyDx4CuYLHYRlkyP8vW-3NNnL9nXU0mnc', // Replace with dynamic URL
};

// Replace with your actual authentication logic
const handleLogout = () => {
  console.log('Logging out...');
  // 1. Clear session/token (e.g., localStorage.removeItem('token'))
  // 2. Redirect to login page (e.g., router.push('/login'))
};

const Navbar = ({ title = 'NoteMe', onMenuToggle }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    // Fixed Header for the main dashboard content
    <header className="sticky top-0 z-40 w-[83%] ml-[256px] bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">

        {/* 1. Mobile Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          {/* Hamburger menu for small screens (if using a sidebar) */}
          <button 
            className="p-2 text-gray-600 rounded-full hover:bg-gray-100 lg:hidden"
            onClick={onMenuToggle}
          >
            {/* Minimal hamburger lines */}
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600"></div>
          </button>
          
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
            {title}
          </h1>
        </div>

        {/* 2. Search Bar */}
        {/* <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search entities, users, or settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-4 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
        </div> */}

        {/* 3. User Profile and Logout Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center p-1 space-x-2 text-sm font-medium text-gray-700 transition duration-150 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* User Avatar */}
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={mockUser.avatarUrl}
              alt={mockUser.name}
            />
            {/* User Name (Desktop Only) */}
            <span className="hidden mr-1 sm:block">{mockUser.name}</span>
            {/* Simple arrow indicator */}
            <span className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : 'rotate-0'}`}>&#9662;</span>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                <p className="text-xs font-normal text-gray-500 truncate">{mockUser.email}</p>
              </div>
              <div className="py-1">
             
                {/* LOGOUT Button */}
                <button
                  className="flex items-center w-full px-4 py-2 text-sm  hover:bg-red-50"
                  role="menuitem"
                ><MdSettings />
                  Setting
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
