import React, { useEffect } from 'react';
import { FiEye, FiMoreVertical, FiFilter, FiPlus } from 'react-icons/fi';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../customHook/useNoteStore.js';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'archived':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-blue-100 text-blue-700';
  }
};

const EntityCard = ({ entity, onView, onMoreOptions }) => {
  const statusClasses = getStatusColor(entity.Status);
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {entity.title || entity.name}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses}`}>
          {entity.Status}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        {entity.noteDescription || 'No description available'}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{new Date(entity.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(entity._id)}
            className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FiEye />
          </button>
          <button
            onClick={() => onMoreOptions(entity._id)}
            className="p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <FiMoreVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { notes, fetchNotes, loading } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // these are the important function i will use them in future
  const handleView = (id) => alert(`Viewing details for Entity ID: ${id}`);
  const handleMoreOptions = (id) => alert(`Options for Entity ID: ${id}`);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="w-64 transition-all duration-300">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none py-2 px-2 text-sm w-48"
              />
              <FiFilter className="text-gray-500" />
            </div>

            <Link to={'/create_note'}>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                <FiPlus className="text-lg" />
                Create
              </button>
            </Link>
          </div>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              {/* Summary Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                  <h4 className="text-gray-500 text-sm">Active Projects</h4>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {notes.filter((item) => item.Status === 'Active').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                  <h4 className="text-gray-500 text-sm">Pending Reviews</h4>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {notes.filter((item) => item.Status === 'Pending').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                  <h4 className="text-gray-500 text-sm">Completed</h4>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {notes.filter((item) => item.Status === 'Completed').length}
                  </p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map((entity) => (
                  <EntityCard
                    key={entity._id}
                    entity={entity}
                    onView={handleView}
                    onMoreOptions={handleMoreOptions}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
