// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../config/firebase';
import { updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  
  // User profile states
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  // App settings states
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [temperatureUnit, setTemperatureUnit] = useState<string>('celsius');
  
  // UI states
  const [isProfileSaving, setIsProfileSaving] = useState<boolean>(false);
  const [isPasswordSaving, setIsPasswordSaving] = useState<boolean>(false);
  const [isAppSettingsSaving, setIsAppSettingsSaving] = useState<boolean>(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [appSettingsSuccess, setAppSettingsSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [appSettingsError, setAppSettingsError] = useState<string | null>(null);
  
  // Initialize form with current user data
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
    
    // Load app settings from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notifications') !== 'false';
    const savedTemperatureUnit = localStorage.getItem('temperatureUnit') || 'celsius';
    
    setDarkMode(savedDarkMode);
    setNotifications(savedNotifications);
    setTemperatureUnit(savedTemperatureUnit);
  }, [currentUser]);
  
  // Handler for updating profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    
    if (!currentUser || !auth.currentUser) return;
    
    try {
      setIsProfileSaving(true);
      
      // Update display name
      if (displayName !== currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }
      
      // Update email
      if (email !== currentUser.email && currentPassword) {
        const credential = EmailAuthProvider.credential(
          currentUser.email || '', 
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, email);
      }
      
      setProfileSuccess('Profile updated successfully');
      
      // Clear current password field
      setCurrentPassword('');
    } catch (error) {
      setProfileError((error as Error).message || 'Failed to update profile');
    } finally {
      setIsProfileSaving(false);
      // Auto-hide success message after 3 seconds
      if (profileSuccess) {
        setTimeout(() => setProfileSuccess(null), 3000);
      }
    }
  };
  
  // Handler for updating password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    
    if (!currentUser || !auth.currentUser) return;
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsPasswordSaving(true);
      
      // Re-authenticate before changing password
      const credential = EmailAuthProvider.credential(
        currentUser.email || '', 
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, newPassword);
      
      setPasswordSuccess('Password updated successfully');
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setPasswordError((error as Error).message || 'Failed to update password');
    } finally {
      setIsPasswordSaving(false);
      // Auto-hide success message after 3 seconds
      if (passwordSuccess) {
        setTimeout(() => setPasswordSuccess(null), 3000);
      }
    }
  };
  
  // Handler for updating app settings
  const handleUpdateAppSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppSettingsError(null);
    setAppSettingsSuccess(null);
    
    try {
      setIsAppSettingsSaving(true);
      
      // Save settings to localStorage
      localStorage.setItem('darkMode', darkMode.toString());
      localStorage.setItem('notifications', notifications.toString());
      localStorage.setItem('temperatureUnit', temperatureUnit);
      
      setAppSettingsSuccess('Settings saved successfully');
    } catch (error) {
      setAppSettingsError((error as Error).message || 'Failed to save settings');
    } finally {
      setIsAppSettingsSaving(false);
      // Auto-hide success message after 3 seconds
      if (appSettingsSuccess) {
        setTimeout(() => setAppSettingsSuccess(null), 3000);
      }
    }
  };
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          
          {profileError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {profileError}
            </div>
          )}
          
          {profileSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {profileSuccess}
            </div>
          )}
          
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password (required to update email)
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current password"
              />
            </div>
            
            <button
              type="submit"
              disabled={isProfileSaving}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isProfileSaving ? "Saving..." : "Save Profile"}
            </button>
          </form>
          
          <hr className="my-6" />
          
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          
          {passwordError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {passwordError}
            </div>
          )}
          
          {passwordSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {passwordSuccess}
            </div>
          )}
          
          <form onSubmit={handleUpdatePassword}>
            <div className="mb-4">
              <label htmlFor="currentPasswordForChange" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPasswordForChange"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength={6}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isPasswordSaving}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isPasswordSaving ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
        
        {/* App Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
          
          {appSettingsError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {appSettingsError}
            </div>
          )}
          
          {appSettingsSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {appSettingsSuccess}
            </div>
          )}
          
          <form onSubmit={handleUpdateAppSettings}>
            <div className="mb-6">
              <h3 className="font-medium mb-3">Appearance</h3>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="darkMode" className="ml-2 block text-gray-700">
                  Dark Mode
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Notifications</h3>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-gray-700">
                  Enable Notifications
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Receive alerts when devices go offline or voltage is out of range.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Units</h3>
              <div className="mb-2">
                <label htmlFor="temperatureUnit" className="block text-sm text-gray-700 mb-1">
                  Temperature Unit
                </label>
                <select
                  id="temperatureUnit"
                  value={temperatureUnit}
                  onChange={(e) => setTemperatureUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="celsius">Celsius (°C)</option>
                  <option value="fahrenheit">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isAppSettingsSaving}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isAppSettingsSaving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;