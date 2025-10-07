import React, { useState } from 'react';
import { FiUser, FiLock, FiBell, FiChevronRight, FiSave } from 'react-icons/fi';

// Define the settings sections
const SETTINGS_SECTIONS = {
  ACCOUNT: 'Account',
  SECURITY: 'Security',
  NOTIFICATIONS: 'Notifications',
};

// Mock user data and update function
const mockUser = {
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  emailNotifications: true,
  smsNotifications: false,
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState(SETTINGS_SECTIONS.ACCOUNT);
  const [settings, setSettings] = useState(mockUser);
  const [isSaving, setIsSaving] = useState(false);

  // --- 1. Handle Form Changes ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- 2. Handle Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log('Saving settings:', settings);
    
    // Simulate an API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  // --- Section Content Components ---
  
  // Renders the Account Settings Content
  const AccountSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">General Preferences</h3>
      
      {/* Timezone Setting */}
      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
        <select
          id="timezone"
          name="timezone"
          value={settings.timezone}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="Europe/London">London (GMT)</option>
          <option value="Asia/Kolkata">Kolkata (IST)</option>
        </select>
      </div>

      {/* Date Format Setting */}
      <div>
        <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">Date Format</label>
        <select
          id="dateFormat"
          name="dateFormat"
          value={settings.dateFormat}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  );

  // Renders the Security Settings Content
  const SecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Security Actions</h3>
      
      {/* Password Change Button */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">Password</p>
          <p className="text-sm text-gray-500">Change your password every few months to keep your account secure.</p>
        </div>
        <button
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150"
          onClick={() => alert("Redirecting to password change...")}
        >
          Update Password
          <FiChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
      
      {/* Two-Factor Authentication Toggle (Placeholder) */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">Two-Factor Authentication (2FA)</p>
          <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
        </div>
        <span className="text-sm font-semibold text-red-500">DISABLED</span>
      </div>
    </div>
  );

  // Renders the Notifications Settings Content
  const NotificationsSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Email & SMS Alerts</h3>

      {/* Email Notifications Toggle */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">Email Notifications</p>
          <p className="text-sm text-gray-500">Receive updates and alerts about CRUD operations and status changes.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* SMS Notifications Toggle */}
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <p className="font-medium text-gray-700">SMS Notifications</p>
          <p className="text-sm text-gray-500">Send critical alerts to your mobile phone.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={settings.smsNotifications}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  // --- Function to Render Active Content ---
  const renderContent = () => {
    switch (activeSection) {
      case SETTINGS_SECTIONS.ACCOUNT:
        return <AccountSettings />;
      case SETTINGS_SECTIONS.SECURITY:
        return <SecuritySettings />;
      case SETTINGS_SECTIONS.NOTIFICATIONS:
        return <NotificationsSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl overflow-hidden">
        
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Sidebar for Navigation Tabs */}
          <div className="lg:w-1/4 p-6 bg-gray-50 border-r border-gray-200">
            <nav className="space-y-1">
              {Object.values(SETTINGS_SECTIONS).map(section => {
                const isActive = activeSection === section;
                const Icon = 
                  section === SETTINGS_SECTIONS.ACCOUNT ? FiUser : 
                  section === SETTINGS_SECTIONS.SECURITY ? FiLock : FiBell;

                return (
                  <button
                    key={section}
                    type="button"
                    onClick={() => setActiveSection(section)}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition duration-150 
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="lg:w-3/4 p-8">
            <div className="min-h-[400px]">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Floating Save Button Bar */}
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <button
            type="submit"
            disabled={isSaving}
            className={`flex items-center px-6 py-3 text-base font-semibold text-white rounded-lg shadow-lg transition duration-150 
              ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
            `}
          >
            <FiSave className="w-5 h-5 mr-2" />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;