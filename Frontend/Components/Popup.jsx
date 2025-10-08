import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiCheck, FiX, FiRefreshCcw } from 'react-icons/fi';

// Define the filter options
const filterOptions = {
  status: ['Active', 'Pending', 'Completed'],
  priority: ['Low', 'Medium', 'High', 'Very High'],
};

/**
 * Reusable component for a dropdown filter popover.
 * @param {function} onApply - Function to call when filters are applied (receives filter object).
 * @param {function} onClear - Function to call when filters are cleared.
 */
const Popup = ({ onApply, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const popoverRef = useRef(null);

  // --- Effect to close the popover when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // --- Toggle Filter Selection ---
  const toggleFilter = (group, value) => {
    setSelectedFilters(prevFilters => {
      const currentValues = prevFilters[group] || [];
      
      // If value is already selected, remove it
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value);
        if (newValues.length === 0) {
          // If the group is empty, remove the group key
          const { [group]: _, ...rest } = prevFilters;
          return rest;
        }
        return { ...prevFilters, [group]: newValues };
      } 
      // Otherwise, add it
      else {
        return { ...prevFilters, [group]: [...currentValues, value] };
      }
    });
  };

  // --- Action Handlers ---
  const handleApply = () => {
    onApply(selectedFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedFilters({});
    onClear();
    setIsOpen(false);
  };

  const isFilterSelected = (group, value) => 
    selectedFilters[group] && selectedFilters[group].includes(value);


  return (
    <div className="relative" ref={popoverRef}>
      
      {/* 1. Filter Button */}
      <button 
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <FiFilter className="w-4 h-4 mr-2" />
        Filter
        {/* Visual indicator when filters are active */}
        {Object.keys(selectedFilters).length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-blue-500 rounded-full">
                {Object.keys(selectedFilters).length}
            </span>
        )}
      </button>

      {/* 2. Filter Popover Content */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 origin-top-left bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-20 p-4 space-y-4">
          
          {/* Map over filter groups (Status, Priority) */}
          {Object.entries(filterOptions).map(([group, options]) => (
            <div key={group} className="border-b border-gray-100 pb-3 last:border-b-0">
              <h4 className="text-sm font-semibold text-gray-800 mb-2 capitalize">{group}</h4>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleFilter(group, option)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition duration-150 flex items-center 
                      ${isFilterSelected(group, option) 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {isFilterSelected(group, option) && <FiCheck className="w-4 h-4 mr-1" />}
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Action Buttons: Apply and Clear */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition duration-150"
            >
              <FiRefreshCcw className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={Object.keys(selectedFilters).length === 0}
              className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FiCheck className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Popup;