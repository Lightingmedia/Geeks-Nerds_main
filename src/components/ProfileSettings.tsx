import React, { useState, useRef } from 'react';
import { User, Camera, Upload, X, Check, AlertCircle } from 'lucide-react';

interface ProfileSettingsProps {
  user: any;
  onClose: () => void;
  onUpdateUser: (updatedUser: any) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onClose, onUpdateUser }) => {
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate upload delay
    setTimeout(() => {
      setProfilePicture(imageUrl);
      setUploading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      profile_picture: profilePicture
    };
    
    onUpdateUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    onClose();
  };

  const handleRemoveImage = () => {
    // Set to default avatar
    const defaultAvatar = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';
    setProfilePicture(defaultAvatar);
    setError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <h2 className="text-xl font-bold">Profile Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Change Profile Picture</h3>
            <p className="text-gray-600 text-sm">Upload a new profile picture to personalize your account</p>
          </div>

          {/* Profile Picture Preview */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="relative">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              {success && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Upload Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={triggerFileInput}
                disabled={uploading}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Change Photo'}</span>
              </button>
              
              <button
                onClick={handleRemoveImage}
                disabled={uploading}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Photo Guidelines:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use a clear, professional headshot</li>
              <li>• Supported formats: JPG, PNG, GIF</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Square images work best (1:1 ratio)</li>
              <li>• Avoid group photos or logos</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};