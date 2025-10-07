import React, { useState } from 'react';
import { FiSave, FiX, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../customHook/useNoteStore.js';

const initialFormState = {
    title: '',
    description: '',
    status: 'Active',
    priority: 'medium',
};


const CreateNote = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
    const navigate=useNavigate()
  const { createEntity } = useNoteStore();


    // --- Client-Side Validation ---
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required.';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters.';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for the field being edited
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null);

        // 1. Run Client-Side Validation
        if (!validateForm()) {
            setSubmissionStatus('error');
            return;
        }
        setIsSubmitting(true);

        // 2. Submit to (Simulated) Backend
           const response = await createEntity(formData);
         
        // 3. Handle Server Response
        if (response.success) {
            setSubmissionStatus('success');
            setFormData(initialFormState); // Reset form after success
            setErrors({});
            
        } else {
            setSubmissionStatus('error');
            // Set error returned from server (for server-side validation)
            if (response.field) {
                setErrors(prev => ({ ...prev, [response.field]: response.message }));
            } else {
                setErrors({ general: response.message });
            }
        }

        setIsSubmitting(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-xl">

            {/* Page Header */}
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
                Create New Entity
            </h1>

            {/* Status Messages */}
            {submissionStatus === 'success' && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex items-center">
                    <FiCheckCircle className="w-5 h-5 mr-3" />
                    New Note created successfully! Redirecting to dashboard...
                </div>
            )}
            {submissionStatus === 'error' && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex items-center">
                    <FiX className="w-5 h-5 mr-3" />
                    Please correct the errors below and try again.
                    {errors.general && <span className='ml-2 font-medium'>{errors.general}</span>}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 required-label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {/* Validation Message */}
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Description Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 required-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {/* Validation Message */}
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Status and priority Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Initial Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* priority */}
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">

                    <Link
                        to="/dashboard/entities"
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150"
                    >
                        <FiX className="w-4 h-4 mr-2" />
                        Cancel
                    </Link>


                    <button
                        type="button"
                        onClick={() => setFormData(initialFormState)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-lg shadow-sm hover:bg-red-100 transition duration-150"
                        disabled={isSubmitting}
                    >
                        <FiTrash2 className="w-4 h-4 mr-2" />
                        Clear Form
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center px-6 py-2 text-sm font-semibold text-white rounded-lg shadow-md transition duration-150 
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
                    >
                        <FiSave className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Creating...' : 'Create Note'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;