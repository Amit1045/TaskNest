import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const navItems = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/setting" },
    { name: "Help", href: "/help" },
  ];

  return (
    <div
      className={`fixed top-0 w-3xs left-0 h-full bg-gray-800 text-white shadow-lg transition-all duration-300 ease-in-out `}
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <span
          className={`text-2xl font-bold whitespace-nowrap transition-all duration-300 `}
        >NoteMe
        </span>        
      </div>

      {/* ===== Navigation Links ===== */}
      <div className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <span className="text-lg mr-3">•</span>
            <span
              className={`text-sm font-medium transition-all duration-300 `}
            >              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* ===== User Info (Bottom) ===== */}
      <div
        className={`absolute bottom-4 left-0 w-full px-4 text-center text-sm text-gray-400 transition-all duration-300`}
      >
       Amit Yadav (Online)
      </div>
    </div>
  );
}

export default Sidebar;
