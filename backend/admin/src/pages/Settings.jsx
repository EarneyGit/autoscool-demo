import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UserIcon,
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth, api } from '../contexts/AuthContext';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

const siteSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().min(1, 'Site description is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  address: z.string().min(1, 'Address is required'),
  businessHours: z.string().min(1, 'Business hours are required'),
  socialMedia: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal(''))
  }).optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  facebookPixelId: z.string().optional()
});

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: siteSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => api.get('/api/settings').then(res => res.data)
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data) => api.put('/api/auth/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      alert('Profile updated successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data) => api.put('/api/settings', data),
    onSuccess: () => {
      queryClient.invalidateQueries('site-settings');
      alert('Settings updated successfully!');
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to update settings');
    }
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const {
    register: registerSettings,
    handleSubmit: handleSettingsSubmit,
    formState: { errors: settingsErrors, isSubmitting: settingsSubmitting }
  } = useForm({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: siteSettings || {}
  });

  React.useEffect(() => {
    if (siteSettings) {
      registerSettings.reset?.(siteSettings);
    }
  }, [siteSettings]);

  const onProfileSubmit = (data) => {
    const updateData = {
      name: data.name,
      email: data.email
    };

    if (data.newPassword) {
      updateData.currentPassword = data.currentPassword;
      updateData.newPassword = data.newPassword;
    }

    updateProfileMutation.mutate(updateData);
  };

  const onSettingsSubmit = (data) => {
    updateSettingsMutation.mutate(data);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'site', name: 'Site Settings', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'integrations', name: 'Integrations', icon: GlobeAltIcon }
  ];

  if (settingsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow rounded-lg">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  required
                  {...registerProfile('name')}
                  error={profileErrors.name?.message}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  {...registerProfile('email')}
                  error={profileErrors.email?.message}
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    label="Current Password"
                    type="password"
                    {...registerProfile('currentPassword')}
                    error={profileErrors.currentPassword?.message}
                  />
                  <Input
                    label="New Password"
                    type="password"
                    {...registerProfile('newPassword')}
                    error={profileErrors.newPassword?.message}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    {...registerProfile('confirmPassword')}
                    error={profileErrors.confirmPassword?.message}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={profileSubmitting}>
                  Update Profile
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'site' && (
            <form onSubmit={handleSettingsSubmit(onSettingsSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Site Name"
                  required
                  {...registerSettings('siteName')}
                  error={settingsErrors.siteName?.message}
                />
                <Input
                  label="Contact Email"
                  type="email"
                  required
                  {...registerSettings('contactEmail')}
                  error={settingsErrors.contactEmail?.message}
                />
              </div>

              <Textarea
                label="Site Description"
                rows={3}
                required
                {...registerSettings('siteDescription')}
                error={settingsErrors.siteDescription?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Contact Phone"
                  required
                  {...registerSettings('contactPhone')}
                  error={settingsErrors.contactPhone?.message}
                />
                <Input
                  label="Business Hours"
                  required
                  {...registerSettings('businessHours')}
                  error={settingsErrors.businessHours?.message}
                  helperText="e.g., Mon-Fri 9:00-18:00"
                />
              </div>

              <Textarea
                label="Address"
                rows={2}
                required
                {...registerSettings('address')}
                error={settingsErrors.address?.message}
              />

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Facebook URL"
                    type="url"
                    {...registerSettings('socialMedia.facebook')}
                    error={settingsErrors.socialMedia?.facebook?.message}
                  />
                  <Input
                    label="Instagram URL"
                    type="url"
                    {...registerSettings('socialMedia.instagram')}
                    error={settingsErrors.socialMedia?.instagram?.message}
                  />
                  <Input
                    label="Twitter URL"
                    type="url"
                    {...registerSettings('socialMedia.twitter')}
                    error={settingsErrors.socialMedia?.twitter?.message}
                  />
                  <Input
                    label="LinkedIn URL"
                    type="url"
                    {...registerSettings('socialMedia.linkedin')}
                    error={settingsErrors.socialMedia?.linkedin?.message}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={settingsSubmitting}>
                  Update Settings
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'integrations' && (
            <form onSubmit={handleSettingsSubmit(onSettingsSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics & Tracking</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Google Analytics ID"
                      {...registerSettings('googleAnalyticsId')}
                      error={settingsErrors.googleAnalyticsId?.message}
                      helperText="e.g., GA-XXXXXXXXX-X"
                    />
                    <Input
                      label="Google Tag Manager ID"
                      {...registerSettings('googleTagManagerId')}
                      error={settingsErrors.googleTagManagerId?.message}
                      helperText="e.g., GTM-XXXXXXX"
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Facebook Pixel ID"
                      {...registerSettings('facebookPixelId')}
                      error={settingsErrors.facebookPixelId?.message}
                      helperText="For Facebook advertising tracking"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={settingsSubmitting}>
                  Update Integrations
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <ShieldCheckIcon className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Security Settings
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Additional security features will be implemented here.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">API Keys</h4>
                    <p className="text-sm text-gray-500">Manage API access keys</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <KeyIcon className="h-4 w-4 mr-2" />
                    Manage Keys
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <BellIcon className="h-5 w-5 text-blue-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Notification Preferences
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Configure how you want to receive notifications.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'email_new_contact', label: 'New contact form submissions', description: 'Get notified when someone submits the contact form' },
                  { id: 'email_new_booking', label: 'New course bookings', description: 'Get notified when someone books a course' },
                  { id: 'email_system_updates', label: 'System updates', description: 'Get notified about system maintenance and updates' },
                  { id: 'email_weekly_report', label: 'Weekly analytics report', description: 'Receive a weekly summary of website analytics' }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{notification.label}</h4>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;