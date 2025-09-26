import React, { useState, useRef } from 'react';
import { User, Camera, Upload, X, Check, AlertCircle, Mail, MapPin, Briefcase, Building, Edit3 } from 'lucide-react';

interface ProfileSettingsProps {
  user: any;
  onClose: () => void;
  onUpdateUser: (updatedUser: any) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onClose, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    email: user.email || '',
    job_title: user.job_title || '',
    company: user.company || '',
    location: user.location || '',
    bio: user.bio || '',
    skills: user.skills || []
  });
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [newSkill, setNewSkill] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        ...formData,
        profile_picture: profilePicture,
        updated_at: new Date().toISOString()
      };
      
      onUpdateUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
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
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <h2 className="text-xl font-bold">Edit Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={saving}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
                {success && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={triggerFileInput}
                  disabled={uploading || saving}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Change Photo'}</span>
                </button>
                
                <button
                  onClick={handleRemoveImage}
                  disabled={uploading || saving}
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
          </div>

          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => handleInputChange('job_title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Software Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tech Corp"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Edit3 className="w-4 h-4 inline mr-1" />
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add a skill (e.g., React, Python, AWS)"
                />
                <button
                  onClick={handleAddSkill}
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm">Profile updated successfully!</p>
              </div>
            </div>
          )}

          {/* Guidelines */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Profile Tips:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use a professional headshot for your profile picture</li>
              <li>• Write a compelling bio that highlights your expertise</li>
              <li>• Add relevant skills to help others find you</li>
              <li>• Keep your information up-to-date</li>
              <li>• Use your real name for better networking</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};