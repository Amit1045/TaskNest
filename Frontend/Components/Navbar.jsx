import React, { useState } from 'react';
import { MdSettings } from "react-icons/md";
import { Link } from 'react-router-dom';

const mockUser = {
  name: 'Amit Yadav',
  email: 'Yadav@example.com',
  avatarUrl:
    'https://media.licdn.com/dms/image/v2/D4E35AQHhzQClomdYng/profile-framedphoto-shrink_400_400/B4EZij_dYVGYAc-/0/1755097978687?e=1760299200&v=beta&t=PwTvjxYO80nyDx4CuYLHYRlkyP8vW-3NNnL9nXU0mnc',
};

const handleLogout = () => {
  console.log('Logging out...');
  // Example: localStorage.removeItem('token');
  // navigate('/login');
};

const Navbar = ({ title = 'NoteMe', onMenuToggle}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header
      className={`static top-0 z-40 bg-white shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">

        {/* 1. Mobile Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          {/* Hamburger for mobile */}
          <button
            className="p-2 text-gray-600 rounded-full hover:bg-gray-100 lg:hidden"
            onClick={onMenuToggle}
          >
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600"></div>
          </button>

          <Link to={'/'}>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {title}
            </h1>
          </Link>
        </div>

        {/* 2. Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center p-1 space-x-2 text-sm font-medium text-gray-700 transition duration-150 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={mockUser.avatarUrl}
              alt={mockUser.name}
            />
            <span className="hidden mr-1 sm:block">{mockUser.name}</span>
            <span
              className={`transition-transform ${isProfileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              &#9662;
            </span>
          </button>

          {isProfileMenuOpen && (
            <div
              className="absolute z-50 right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-xl"
              role="menu"
            >
              <div className="px-4 py-3">
                <Link to={'/profile'}>
                  <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                </Link>
                <p className="text-xs font-normal text-gray-500 truncate">
                  {mockUser.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                  role="menuitem"
                >
                  <MdSettings className="mr-2" />
                  Settings
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
