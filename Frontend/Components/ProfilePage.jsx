import React, { useState, useEffect } from 'react';

// --- INLINE SVG ICON COMPONENTS (Replaced react-icons/fi) ---

// Base props for all icons (w-5 h-5, stroke-2, etc.)
const baseProps = (props) => ({
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
  ...props,
});

const UserIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-4.477a19.42 19.42 0 01-13.81-13.81V5z" />
  </svg>
);

const LockIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V7a3 3 0 016 0v3" />
  </svg>
);

const SaveIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h4l2-4h4l2 4h4a2 2 0 012 2v7a2 2 0 01-2 2h-2m-4-2h4m-4 0v-4" />
  </svg>
);

const EditIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-9l4 4L17 7l-4-4-2.5 2.5zM15 5l2 2" />
  </svg>
);

const CancelIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg {...baseProps(props)}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
// -----------------------------------------------------------

// Mock user data fetch function
const fetchUserData = async () => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    role: 'Senior Developer',
    avatarUrl: 'https://placehold.co/150x150/1d4ed8/ffffff?text=JD',
  };
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(''); // State for custom success/error messages

  // --- 1. Fetch Data on Load (Read Operation) ---
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
        setFormData(data); // Initialize form data with fetched data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setMessage('Error: Failed to load user profile.');
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  // --- 2. Handle Form Changes ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- 3. Handle Form Submission (Update Operation) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting updated user data:', formData);
    
    // Simulate API call to save data
    // In a real app, you'd show a loading state here and await the save response

    // Update local user state and switch back to view mode
    setUser(formData); 
    setIsEditing(false); 
    setMessage("Profile updated successfully!"); // Show custom success message
  };

  // --- 4. Handle Cancel (Revert Operation) ---
  const handleCancel = () => {
    setFormData(user); // Revert form data to the last saved state
    setIsEditing(false); // Exit editing mode
    setMessage('Editing canceled. Changes discarded.');
  };

  const closeMessage = () => setMessage('');

  // --- Loading/Error States ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <div className="ml-3 text-lg text-gray-500">Loading user profile...</div>
      </div>
    );
  }
  
  if (!user) {
      return <div className="p-6 text-center text-red-500">Failed to load user profile.</div>;
  }

  // --- Message Component (Replacing alert()) ---
  const Message = ({ text, type, onClose }) => {
    if (!text) return null;

    const baseClasses = "fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center z-50 transition-transform duration-300 transform";
    let typeClasses = "";

    if (type === 'success') {
        typeClasses = "bg-green-500 text-white";
    } else if (type === 'info') {
        typeClasses = "bg-blue-500 text-white";
    } else {
        // Default or error
        typeClasses = "bg-red-500 text-white";
    }

    return (
        <div className={`${baseClasses} ${typeClasses} translate-y-0`}>
            <CheckCircleIcon className="w-5 h-5 mr-3" /> {/* Using the inline SVG component */}
            <span className="font-medium">{text}</span>
            <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-opacity-80 transition">
                <CancelIcon className="w-4 h-4" /> {/* Using the inline SVG component */}
            </button>
        </div>
    );
  };
  
  const getMessageType = (msg) => {
      if (msg.includes('successfully')) return 'success';
      if (msg.includes('Error') || msg.includes('Failed')) return 'error';
      return 'info';
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-inter">
      <Message 
          text={message} 
          type={getMessageType(message)} 
          onClose={closeMessage} 
      />
      
      <div className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
        
        {/* Header and Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center mb-4 sm:mb-0">
            <UserIcon className="w-7 h-7 mr-3 text-blue-600" />
            My Profile
          </h2>
          
          <div className="flex space-x-3">
            {!isEditing ? (
              // Edit Button (Only visible in view mode)
              <button
                type="button" // CRITICAL: Prevents accidental form submission
                onClick={() => {
                  setFormData(user); // Re-initialize form data to current user
                  setIsEditing(true); 
                  closeMessage(); // Clear any previous messages
                }}
                className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 transform hover:scale-[1.02]"
              >
                <EditIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            ) : (
              <>
                {/* Cancel Button (Visible in edit mode) */}
                <button
                  type="button" // CRITICAL: Prevents accidental form submission
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-150 transform hover:scale-[1.02]"
                >
                  <CancelIcon className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                {/* Save Button (Visible in edit mode, submits the form) */}
                <button
                  form="profile-form"
                  type="submit"
                  className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition duration-150 transform hover:scale-[1.02]"
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form Container */}
        <form id="profile-form" onSubmit={handleSubmit}>
          
          {/* Avatar Section */}
          <div className="flex items-center space-x-6 mb-8 p-4 bg-blue-50/50 rounded-lg">
            <img 
              className="w-24 h-24 object-cover rounded-full shadow-lg border-4 border-white ring-2 ring-blue-400" 
              src={user.avatarUrl} 
              alt="User Avatar" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/60a5fa/ffffff?text=U'; }}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-blue-600 font-medium">{user.role}</p>
            </div>
          </div>

          {/* Profile Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Field Helper Component for clean repetition */}
            {['firstName', 'lastName', 'email', 'phone'].map((key) => {
                let InputIcon = UserIcon;
                let label = '';
                let type = 'text';

                switch (key) {
                    case 'firstName':
                        label = 'First Name';
                        InputIcon = UserIcon;
                        type = 'text';
                        break;
                    case 'lastName':
                        label = 'Last Name';
                        InputIcon = UserIcon;
                        type = 'text';
                        break;
                    case 'email':
                        label = 'Email Address';
                        InputIcon = MailIcon;
                        type = 'email';
                        break;
                    case 'phone':
                        label = 'Phone Number';
                        InputIcon = PhoneIcon;
                        type = 'tel';
                        break;
                    default:
                        // Fallback
                }

                return (
                    <div className="space-y-1" key={key}>
                        <label htmlFor={key} className="text-sm font-medium text-gray-700 flex items-center">
                            <InputIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {label}
                        </label>
                        <input
                            type={type}
                            id={key}
                            name={key}
                            value={formData[key] || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required={key !== 'phone'} // Phone can be optional
                            className={`w-full px-4 py-2 border rounded-lg transition duration-200 shadow-sm
                                ${isEditing 
                                  ? 'border-blue-400 focus:ring-blue-500 focus:border-blue-500 bg-white' 
                                  : 'bg-gray-50 border-gray-200 text-gray-700 cursor-not-allowed'
                                }`}
                        />
                    </div>
                );
            })}
          </div>

          {/* Security Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <LockIcon className="w-5 h-5 mr-3 text-red-500" />
              Security Settings
            </h3>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm hover:bg-red-200 transition duration-150"
              onClick={() => setMessage("Action: Redirecting to password change form...")}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
