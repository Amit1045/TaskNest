import React, { useState } from 'react';
import { FiEye, FiMoreVertical, FiSearch, FiFilter } from 'react-icons/fi'; // Using Lucide/Feather icons for a clean look
import Sidebar from './SideBar';

// Mock Data Structure (This would be fetched from your backend)
const mockEntities = [
    {
        id: 1,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Renteu/taitete',
        date: 'Dec 14, 2023',
    },
    {
        id: 2,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Review client delibrables',
        date: 'Dec 14, 2023',
    },
    {
        id: 3,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Review client delabrables',
        date: 'Dec 14, 2023',
    },
    {
        id: 4,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Reviev client delisbnbles',
        date: 'Dec 14, 2023',
    },
    {
        id: 5,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Pendre',
        date: 'Dec 14, 2023',
    },
    {
        id: 6,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Pendre',
        date: 'Dec 14, 2023',
    },
    {
        id: 7,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Pendre',
        date: 'Dec 14, 2023',
    },
    {
        id: 8,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Pendre',
        date: 'Dec 14, 2023',
    },
    {
        id: 9,
        title: 'Project Omega',
        status: 'Active',
        subtext: 'Pendre',
        date: 'Dec 14, 2023',
    },
    // ... more entities
];

// Helper function to get status colors
const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'bg-green-100 text-green-700';
        case 'pending':
        case 'pendre': // Based on the image
            return 'bg-yellow-100 text-yellow-700';
        case 'archived':
            return 'bg-gray-100 text-gray-500';
        default:
            return 'bg-blue-100 text-blue-700';
    }
};

// --- Individual Card Component ---
const EntityCard = ({ entity, onView, onMoreOptions }) => {
    const statusClasses = getStatusColor(entity.status);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{entity.title}</h3>

            {/* Status and Subtext */}
            <div className="flex flex-col text-sm mb-3">
                <span className={`inline-flex items-center text-xs font-medium text-green-700 mb-1`}>
                    <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                    {entity.status}
                </span>
                {/* The "Renteu/taitete" or description snippet */}
                <p className="text-gray-600 truncate">{entity.subtext}</p>
            </div>

            {/* Footer: Date and Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <span className="text-sm text-gray-500">{entity.date}</span>
                <div className="flex space-x-2">
                    {/* Eye Button (View Details) - R operation */}
                    <button
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition duration-150 rounded-full hover:bg-gray-100"
                        onClick={() => onView(entity.id)}
                        title="View Details"
                    >
                        <FiEye className="w-5 h-5" />
                    </button>
                    {/* More Options Button (Edit/Delete dropdown) - U/D operations */}
                    <button
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition duration-150 rounded-full hover:bg-gray-100"
                        onClick={() => onMoreOptions(entity.id)}
                        title="More Options"
                    >
                        <FiMoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Grid Component ---
const Dashboard = () => {
    // In a real app, you would use state/context to manage search/filter application
    const [data, setData] = useState(mockEntities);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleView = (id) => {
        alert(`Viewing details for Entity ID: ${id}`);
        // In a real app: router.push('/dashboard/entities/${id}') or open a modal
    };

    const handleMoreOptions = (id) => {
        alert(`Opening options dropdown for Entity ID: ${id}`);
        // In a real app: Show a dropdown menu with Edit/Delete options
    };

    const handleCreateNew = () => {
        alert("Opening Create New Entity Form");
        // In a real app: router.push('/dashboard/entities/new') or open a modal
    }

    return (

        <div className="flex h-screen bg-gray-100 ">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
                <Sidebar isOpen={isSidebarOpen} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200 ">
                    <button
                        className="lg:hidden px-3 py-2 bg-gray-800 text-white rounded-md"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    <div className="flex space-x-3">
                        <input
                            type="text"
                            placeholder="Search entities, users, or settings..."
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 pl-4 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150">
                            <FiFilter className="w-4 h-4 mr-2" /> Filter
                        </button>
                    </div>

                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                    >
                        Create New
                    </button>
                </header>

                {/* Cards Grid */}
                <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((entity) => (
                        <EntityCard
                            key={entity.id}
                            entity={entity}
                            onView={handleView}
                            onMoreOptions={handleMoreOptions}
                        />
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Dashboard;