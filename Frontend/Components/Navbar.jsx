import React, { useState, useEffect, useRef } from 'react';
import { MdSettings } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { BsMoonStars, BsSun } from "react-icons/bs"; // Theme toggle icons




const Navbar = ({ title = 'NoteMe', onMenuToggle }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));

const mockUser = {
  name:user.firstname,
  email: user.email,
  avatarUrl:
    'https://media.licdn.com/dms/image/v2/D4E35AQHhzQClomdYng/profile-framedphoto-shrink_400_400/B4EZij_dYVGYAc-/0/1755097978687?e=1767848400&v=beta&t=HM_WIUBT0NYuXAW6o9fuG6Fv59OoO1rbO1BXGSNDpj0',
};

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/signup')
   };

  // ✅ Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Load theme from localStorage (on mount)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkTheme(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // ✅ Apply theme change
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">

        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle (Mobile) */}
          <button
            className="p-2 text-gray-600 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            onClick={onMenuToggle}
          >
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-200 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-200 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-200"></div>
          </button>

          <Link to="/">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden sm:block">
              {title}
            </h1>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">

          {/* 🌙 Theme Toggle */}
          <div
            onClick={toggleTheme}
            className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300"
            title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div
              className={`absolute flex items-center justify-center w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300 ${
                isDarkTheme ? 'translate-x-7' : 'translate-x-0'
              }`}
            >
              {isDarkTheme ? (
                <BsMoonStars className="text-yellow-400" size={14} />
              ) : (
                <BsSun className="text-orange-400" size={14} />
              )}
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={navRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center p-1 space-x-2 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-8 h-8 rounded-full"
                src={mockUser.avatarUrl}
                alt={mockUser.name}
              />
              <span className="hidden mr-1 sm:block">{mockUser.name}</span>
              <span
                className={`transition-transform duration-200 ${
                  isProfileMenuOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                ▼
              </span>
            </button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow-xl transition-all duration-200"
                role="menu"
              >
                <div className="px-4 py-3">
                  <Link to="/profile">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{mockUser.name}</p>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{mockUser.email}</p>
                </div>

                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <MdSettings className="mr-2" /> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
