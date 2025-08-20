import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ChartBarIcon,
  EyeIcon,
  UserGroupIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import Select from '../components/Select';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../contexts/AuthContext';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('pageviews');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: () => api.get(`/api/analytics?range=${timeRange}`).then(res => res.data),
    refetchInterval: 300000 // Refetch every 5 minutes
  });

  const { data: topPages } = useQuery({
    queryKey: ['analytics-pages', timeRange],
    queryFn: () => api.get(`/api/analytics/pages?range=${timeRange}`).then(res => res.data)
  });

  const { data: deviceStats } = useQuery({
    queryKey: ['analytics-devices', timeRange],
    queryFn: () => api.get(`/api/analytics/devices?range=${timeRange}`).then(res => res.data)
  });

  const { data: trafficSources } = useQuery({
    queryKey: ['analytics-sources', timeRange],
    queryFn: () => api.get(`/api/analytics/sources?range=${timeRange}`).then(res => res.data)
  });

  const timeRangeOptions = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'pageviews', label: 'Page Views' },
    { value: 'sessions', label: 'Sessions' },
    { value: 'users', label: 'Users' },
    { value: 'bounceRate', label: 'Bounce Rate' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      red: 'bg-red-50 text-red-600'
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <p className={`text-sm ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change >= 0 ? '+' : ''}{change}% from last period
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  };

  const ChartPlaceholder = ({ title, data }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Chart visualization would go here</p>
          <p className="text-sm text-gray-400 mt-1">
            Integration with charting library needed
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-4">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={timeRangeOptions}
            className="w-40"
          />
          <Select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            options={metricOptions}
            className="w-40"
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Page Views"
          value={analytics?.pageviews?.toLocaleString() || '0'}
          change={analytics?.pageviewsChange}
          icon={EyeIcon}
          color="blue"
        />
        <StatCard
          title="Unique Visitors"
          value={analytics?.users?.toLocaleString() || '0'}
          change={analytics?.usersChange}
          icon={UserGroupIcon}
          color="green"
        />
        <StatCard
          title="Sessions"
          value={analytics?.sessions?.toLocaleString() || '0'}
          change={analytics?.sessionsChange}
          icon={CursorArrowRaysIcon}
          color="yellow"
        />
        <StatCard
          title="Bounce Rate"
          value={`${analytics?.bounceRate || 0}%`}
          change={analytics?.bounceRateChange}
          icon={ChartBarIcon}
          color={analytics?.bounceRate > 70 ? 'red' : 'green'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title={`${metricOptions.find(m => m.value === selectedMetric)?.label} Over Time`}
          data={analytics?.chartData}
        />
        <ChartPlaceholder
          title="Traffic Sources"
          data={trafficSources}
        />
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Pages</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {topPages?.map((page, index) => (
              <div key={page.path} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{page.title || page.path}</p>
                  <p className="text-sm text-gray-500">{page.path}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {page.pageviews?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">views</p>
                </div>
              </div>
            )) || (
              <div className="px-6 py-8 text-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Device Types</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deviceStats?.map((device) => {
              const Icon = device.type === 'mobile' ? DevicePhoneMobileIcon : 
                          device.type === 'desktop' ? ComputerDesktopIcon : GlobeAltIcon;
              return (
                <div key={device.type} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {device.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {device.percentage}%
                    </p>
                    <p className="text-sm text-gray-500">
                      {device.sessions?.toLocaleString()} sessions
                    </p>
                  </div>
                </div>
              );
            }) || (
              <div className="px-6 py-8 text-center text-gray-500">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Traffic Sources</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bounce Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Session Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trafficSources?.map((source) => (
                <tr key={source.source}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {source.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.sessions?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.users?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.bounceRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {source.avgSessionDuration}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Performance */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">SEO Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.seo?.organicSessions || 0}
              </p>
              <p className="text-sm text-gray-500">Organic Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.seo?.avgPosition || 'N/A'}
              </p>
              <p className="text-sm text-gray-500">Avg. Search Position</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {analytics?.seo?.impressions || 0}
              </p>
              <p className="text-sm text-gray-500">Search Impressions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;