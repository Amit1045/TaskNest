import React, { useState, useRef, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const FilterDropDown = ({ filters, setFilters, clearFilters }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const closeOnOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  const handleChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: filters[type].includes(value)
        ? filters[type].filter((v) => v !== value)
        : [...filters[type], value],
    });
  };

  return (
    <div className="relative" ref={ref}>
     

      
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            <h3 className="text-gray-700 font-semibold text-sm">Filters</h3>
            <button onClick={() => setOpen(false)}>
              <FiX className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Status */}
          <div className="mb-3">
            <h4 className="font-medium text-sm text-gray-600 mb-1">Status</h4>
            {["Active", "Pending", "Completed"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <input
                  type="checkbox"
                  checked={filters.includes(status)}
                  onChange={() => handleChange("status", status)}
                  className="accent-blue-600"
                />
                {status}
              </label>
            ))}
          </div>

          {/* Priority */}
          <div className="mb-2">
            <h4 className="font-medium text-sm text-gray-600 mb-1">Priority</h4>
            {["High", "Medium", "Low"].map((priority) => (
              <label
                key={priority}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <input
                  type="checkbox"
                   onChange={() => handleChange("priority", priority)}
                  className="accent-blue-600"
                />
                {priority}
              </label>
            ))}
          </div>

          {/* Clear */}
          <button
            onClick={clearFilters}
            className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1.5 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
    </div>
  );
};

export default FilterDropDown;
