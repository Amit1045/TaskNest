import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Sidebar navigation items
  const navItems = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
    { name: "Help", href: "/help" },
  ];

  return (
    <div className="flex mt-10">
      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-2xl font-bold">MyApp</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Optional: User info at bottom */}
        <div className="absolute bottom-4 left-0 w-full px-4 text-center text-sm text-gray-400">
          Jane Doe (Online)
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger lines */}
        <div className="w-5 h-0.5 bg-white mb-1"></div>
        <div className="w-5 h-0.5 bg-white mb-1"></div>
        <div className="w-5 h-0.5 bg-white"></div>
      </button>
    </div>
  );
}

export default Sidebar;
