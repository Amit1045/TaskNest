import React, { useEffect, useState, useRef } from "react";
import { FiEye, FiMoreVertical, FiFilter, FiPlus } from "react-icons/fi";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { useNoteStore } from "../customHook/useNoteStore.js";
import FilterDropDown from "./FilterDropDown.jsx";

/* ---------------------- Utility: Status Badge Color ---------------------- */
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "completed":
      return "bg-blue-100 text-blue-700";
    case "archived":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

/* ---------------------------- Dropdown Menu ----------------------------- */
const CardMenu = ({ onEdit, onDuplicate, onDelete }) => (
  <div
    className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 divide-y divide-gray-100 z-50"
    role="menu"
  >
    <div className="py-1">
      <button
        onClick={onEdit}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left"
      >
        Edit
      </button>
      <button
        onClick={onDuplicate}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left"
      >
        Duplicate
      </button>
    </div>
    <div className="py-1">
      <button
        onClick={onDelete}
        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 text-left"
      >
        Delete
      </button>
    </div>
  </div>
);

/* ---------------------------- Entity Card ------------------------------- */
const EntityCard = ({ entity, onView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusClasses = getStatusColor(entity.Status);

  return (
    <div className="relative bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {entity.title || entity.name}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses}`}>
          {entity.Status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-4 line-clamp-3">
        {entity.noteDescription || "No description available"}
      </p>

      {/* Footer (Date + Actions) */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{new Date(entity.createdAt).toLocaleDateString()}</span>
        <div className="relative flex items-center space-x-2" ref={menuRef}>
          <button
            onClick={() => onView(entity._id)}
            className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FiEye />
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <FiMoreVertical />
          </button>

          {isMenuOpen && (
            <CardMenu
              onEdit={() => alert("Edit clicked")}
              onDuplicate={() => alert("Duplicate clicked")}
              onDelete={() => alert("Delete clicked")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- Dashboard ------------------------------- */
const Dashboard = () => {
  const { notes, fetchNotes, loading } = useNoteStore();
  const [showFilter,setshowFilter]=useState(false)
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleView = (id) => alert(`Viewing details for Entity ID: ${id}`);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Section */}
      <section className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none py-2 px-2 text-sm w-48"
              />
              <FiFilter className="text-gray-500" onClick={()=>setshowFilter(!showFilter)}/>
            </div>
            <div>
              {showFilter ? <FilterDropDown/>:""}
            </div>
            <Link to="/create_note">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                <FiPlus className="text-lg" />
                Create
              </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {["Active", "Pending", "Completed"].map((status) => (
                  <div
                    key={status}
                    className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition"
                  >
                    <h4 className="text-gray-500 text-sm">{status} Projects</h4>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {notes.filter((n) => n.Status === status).length}
                    </p>
                  </div>
                ))}
              </div>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-center col-span-full">
                    No notes available.
                  </p>
                ) : (
                  notes.map((entity) => (
                    <EntityCard key={entity._id} entity={entity} onView={handleView} />
                  ))
                )}
              </div>
            </>
          )}
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
