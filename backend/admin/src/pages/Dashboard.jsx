import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';

const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {changeType === 'increase' ? '+' : '-'}{change}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ title, description, icon: Icon, to, color }) => {
  return (
    <Link
      to={to}
      className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div>
        <span className={`rounded-lg inline-flex p-3 ${color} ring-4 ring-white`}>
          <Icon className="h-6 w-6 text-white" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">
          <span className="absolute inset-0" />
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </Link>
  );
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities?.length === 0 ? (
          <div className="px-6 py-4 text-center text-gray-500">
            No recent activity
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity.id || activity.description} className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Fetch dashboard stats
  const { data: contentStats, isLoading: contentLoading } = useQuery({
    queryKey: ['content-stats'],
    queryFn: async () => {
      const response = await axios.get('/content/stats/overview');
      return response.data.data;
    }
  });

  const { data: courseStats, isLoading: courseLoading } = useQuery({
    queryKey: ['course-stats'],
    queryFn: async () => {
      const response = await axios.get('/courses/stats/overview');
      return response.data.data;
    }
  });

  const { data: seoStats, isLoading: seoLoading } = useQuery({
    queryKey: ['seo-stats'],
    queryFn: async () => {
      const response = await axios.get('/seo/stats/overview');
      return response.data.data;
    }
  });

  const isLoading = contentLoading || courseLoading || seoLoading;

  // Mock recent activities
  const recentActivities = [
    {
      id: 'activity-1',
      icon: DocumentTextIcon,
      description: 'Updated home page content',
      time: '2 hours ago'
    },
    {
      id: 'activity-2',
      icon: MagnifyingGlassIcon,
      description: 'Modified SEO settings for courses page',
      time: '4 hours ago'
    },
    {
      id: 'activity-3',
      icon: AcademicCapIcon,
      description: 'Added new motorcycle course',
      time: '1 day ago'
    },
    {
      id: 'activity-4',
      icon: ChartBarIcon,
      description: 'Generated sitemap',
      time: '2 days ago'
    }
  ];

  const quickActions = [
    {
      id: 'action-content',
      title: 'Manage Content',
      description: 'Edit website sections and content',
      icon: DocumentTextIcon,
      to: '/content',
      color: 'bg-blue-500'
    },
    {
      id: 'action-seo',
      title: 'SEO Settings',
      description: 'Optimize for search engines',
      icon: MagnifyingGlassIcon,
      to: '/seo',
      color: 'bg-green-500'
    },
    {
      id: 'action-courses',
      title: 'Course Management',
      description: 'Add and edit driving courses',
      icon: AcademicCapIcon,
      to: '/courses',
      color: 'bg-purple-500'
    },
    {
      id: 'action-forms',
      title: 'Forms Manager',
      description: 'Manage contact forms and submissions',
      icon: ClipboardDocumentListIcon,
      to: '/forms',
      color: 'bg-indigo-500'
    },
    {
      id: 'action-analytics',
      title: 'Analytics',
      description: 'View website performance',
      icon: ChartBarIcon,
      to: '/analytics',
      color: 'bg-orange-500'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Swiss Driving School admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Content Sections"
          value={contentStats?.overview?.total || 0}
          icon={DocumentTextIcon}
          color="text-blue-600"
        />
        <StatCard
          title="Active Courses"
          value={courseStats?.overview?.active || 0}
          icon={AcademicCapIcon}
          color="text-green-600"
        />
        <StatCard
          title="SEO Pages Configured"
          value={seoStats?.overview?.total || 0}
          icon={MagnifyingGlassIcon}
          color="text-purple-600"
        />
        <StatCard
          title="Average Course Price"
          value={courseStats?.overview?.averagePrice ? `CHF ${Math.round(courseStats.overview.averagePrice)}` : 'CHF 0'}
          icon={CurrencyDollarIcon}
          color="text-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <QuickAction key={action.id} {...action} />
          ))}
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity activities={recentActivities} />

        {/* Content Status */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Content Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Content</span>
                <span className="text-sm font-medium text-green-600">
                  {contentStats?.overview?.active || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Inactive Content</span>
                <span className="text-sm font-medium text-red-600">
                  {contentStats?.overview?.inactive || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Featured Courses</span>
                <span className="text-sm font-medium text-blue-600">
                  {courseStats?.overview?.featured || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="text-sm font-medium text-gray-900">
                  {courseStats?.overview?.totalReviews || 0}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button
                  as={Link}
                  to="/content"
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View All</span>
                </Button>
                <Button
                  as={Link}
                  to="/content"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit Content</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Overview */}
      {courseStats?.categories && courseStats.categories.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Course Categories</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {courseStats.categories.map((category) => (
                <div key={category._id} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-sm text-gray-600 capitalize">{category._id} Courses</div>
                  <div className="text-xs text-gray-500">
                    {category.active} active
                  </div>
                  {category.averagePrice && (
                    <div className="text-xs text-gray-500">
                      Avg: CHF {Math.round(category.averagePrice)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;