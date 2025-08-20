import React, { useState, useEffect } from 'react';
import {
  InstagramIcon,
  SaveIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  LinkIcon,
  ImageIcon,
  UsersIcon,
  HeartIcon,
  MessageCircleIcon
} from 'lucide-react';

const InstagramManager = () => {
  const [settings, setSettings] = useState({
    accessToken: '',
    userId: '',
    username: 'polymet_swiss',
    profileUrl: 'https://instagram.com/polymet_swiss',
    limit: 6,
    isEnabled: true
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [showToken, setShowToken] = useState(false);
  const [previewPosts, setPreviewPosts] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // Mock Instagram posts for preview when no real connection
  const mockPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
      caption: 'New student passed their driving test today! 🎉 Congratulations! #DrivingSuccess #SwissDriving',
      likes: 45,
      comments: 8,
      timestamp: '2024-01-15'
    },
    {
      id: '2', 
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=400&fit=crop',
      caption: 'Beautiful Swiss roads for today\'s driving lesson 🏔️ #SwissAlps #DrivingLessons',
      likes: 32,
      comments: 5,
      timestamp: '2024-01-14'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=400&fit=crop',
      caption: 'Safety first! Our instructors always prioritize safe driving practices 🚗 #SafetyFirst #DrivingTips',
      likes: 28,
      comments: 3,
      timestamp: '2024-01-13'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Another successful driving lesson completed! 📚 #LearningToDrive #StudentSuccess',
      likes: 51,
      comments: 12,
      timestamp: '2024-01-12'
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      caption: 'Modern vehicles with the latest safety features for our students 🚙 #ModernFleet #SafetyTech',
      likes: 39,
      comments: 7,
      timestamp: '2024-01-11'
    },
    {
      id: '6',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      caption: 'Professional driving instructors ready to help you succeed! 👨‍🏫 #ProfessionalInstructors #DrivingSchool',
      likes: 44,
      comments: 9,
      timestamp: '2024-01-10'
    }
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from your backend API
      const savedSettings = localStorage.getItem('instagram_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading Instagram settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // In a real app, this would save to your backend API
      localStorage.setItem('instagram_settings', JSON.stringify(settings));
      
      // Also update the frontend environment (in a real app, this would be handled differently)
      console.log('Instagram settings saved:', settings);
      
      // Show success message
      alert('Instagram settings saved successfully!');
    } catch (error) {
      console.error('Error saving Instagram settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    if (!settings.accessToken || !settings.userId) {
      setConnectionStatus({ success: false, message: 'Please provide both access token and user ID' });
      return;
    }

    setTestingConnection(true);
    try {
      // In a real app, this would test the actual Instagram API connection
      // For demo purposes, we'll simulate a successful connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (settings.accessToken.length > 10 && settings.userId.length > 5) {
        setConnectionStatus({ 
          success: true, 
          message: 'Connection successful! Instagram feed is ready to display.' 
        });
        setPreviewPosts(mockPosts);
      } else {
        setConnectionStatus({ 
          success: false, 
          message: 'Invalid credentials. Please check your access token and user ID.' 
        });
      }
    } catch (error) {
      setConnectionStatus({ 
        success: false, 
        message: 'Connection failed. Please check your credentials and try again.' 
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    // Clear connection status when settings change
    if (field === 'accessToken' || field === 'userId') {
      setConnectionStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCwIcon className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading Instagram settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <InstagramIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Instagram Feed Manager</h1>
              <p className="text-gray-600">Configure Instagram integration for your website</p>
            </div>
          </div>
          <a
            href="https://developers.facebook.com/docs/instagram-basic-display-api/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            API Documentation
          </a>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Setup Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Go to <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Facebook Developers</a></li>
              <li>Create a new app and add "Instagram Basic Display" product</li>
              <li>Generate an access token for your Instagram account</li>
              <li>Get your Instagram User ID from the API response</li>
              <li>Enter the credentials below and test the connection</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Instagram Settings</h2>
          
          <div className="space-y-6">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Enable Instagram Feed</label>
                <p className="text-sm text-gray-500">Show Instagram posts on your website</p>
              </div>
              <button
                onClick={() => handleInputChange('isEnabled', !settings.isEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Access Token */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Access Token *
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={settings.accessToken}
                  onChange={(e) => handleInputChange('accessToken', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Enter your Instagram access token"
                  disabled={!settings.isEnabled}
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showToken ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram User ID *
              </label>
              <input
                type="text"
                value={settings.userId}
                onChange={(e) => handleInputChange('userId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Instagram user ID"
                disabled={!settings.isEnabled}
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Username
              </label>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="polymet_swiss"
                disabled={!settings.isEnabled}
              />
            </div>

            {/* Profile URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.profileUrl}
                onChange={(e) => handleInputChange('profileUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://instagram.com/polymet_swiss"
                disabled={!settings.isEnabled}
              />
            </div>

            {/* Number of Posts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Posts to Display
              </label>
              <select
                value={settings.limit}
                onChange={(e) => handleInputChange('limit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!settings.isEnabled}
              >
                <option value={3}>3 Posts</option>
                <option value={6}>6 Posts</option>
                <option value={9}>9 Posts</option>
                <option value={12}>12 Posts</option>
              </select>
            </div>

            {/* Connection Test */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={testConnection}
                disabled={testingConnection || !settings.isEnabled || !settings.accessToken || !settings.userId}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {testingConnection ? (
                  <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LinkIcon className="h-4 w-4 mr-2" />
                )}
                {testingConnection ? 'Testing Connection...' : 'Test Connection'}
              </button>

              {/* Connection Status */}
              {connectionStatus && (
                <div className={`mt-3 p-3 rounded-md flex items-start space-x-2 ${
                  connectionStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  {connectionStatus.success ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <p className={`text-sm ${
                    connectionStatus.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {connectionStatus.message}
                  </p>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={saveSettings}
                disabled={saving}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {saving ? (
                  <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <SaveIcon className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          </div>

          {showPreview && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <InstagramIcon className="h-6 w-6 text-pink-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Follow Our Journey</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Stay updated with our latest driving tips and student success stories.
                </p>
                <div className="mt-3">
                  <a
                    href={settings.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm"
                  >
                    <InstagramIcon className="w-4 h-4 mr-2" />
                    @{settings.username}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {mockPosts.slice(0, settings.limit).map((post) => (
                  <div key={post.id} className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.caption} 
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <InstagramIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{post.caption}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.timestamp}</span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center">
                            <HeartIcon className="w-3 h-3 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircleIcon className="w-3 h-3 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!settings.isEnabled && (
                <div className="text-center py-8 text-gray-500">
                  <InstagramIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Instagram feed is disabled</p>
                </div>
              )}
            </div>
          )}

          {!showPreview && (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Click "Show Preview" to see how your Instagram feed will look</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-full ${
              settings.isEnabled ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {settings.isEnabled ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Feed Status</p>
              <p className="text-sm text-gray-600">
                {settings.isEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Posts to Show</p>
              <p className="text-sm text-gray-600">{settings.limit} posts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-full">
              <UsersIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Username</p>
              <p className="text-sm text-gray-600">@{settings.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramManager;