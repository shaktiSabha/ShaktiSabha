"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Image, 
  BookOpen, 
  TrendingUp, 
  Eye,
  Plus,
  Mail
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalServices: number;
  totalGalleryItems: number;
  totalContacts: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    action: string;
  }>;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalServices: 0,
    totalGalleryItems: 0,
    totalContacts: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1250,
      totalBlogs: 45,
      totalServices: 12,
      totalGalleryItems: 89,
      totalContacts: 23,
      recentActivity: [
        {
          id: '1',
          type: 'blog',
          title: 'New Blog Post: Women Empowerment',
          timestamp: '2 hours ago',
          action: 'created'
        },
        {
          id: '2',
          type: 'service',
          title: 'Updated: Counseling Service',
          timestamp: '4 hours ago',
          action: 'updated'
        },
        {
          id: '3',
          type: 'gallery',
          title: 'Added new gallery image',
          timestamp: '6 hours ago',
          action: 'added'
        },
        {
          id: '4',
          type: 'user',
          title: 'New user registration',
          timestamp: '1 day ago',
          action: 'registered'
        }
      ]
    });
  }, []);

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-600',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      color: 'bg-green-600',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: BookOpen,
      color: 'bg-purple-600',
      change: '+2%',
      changeType: 'positive'
    },
    {
      title: 'Gallery Items',
      value: stats.totalGalleryItems,
      icon: Image,
      color: 'bg-orange-600',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Contact Messages',
      value: stats.totalContacts,
      icon: Mail,
      color: 'bg-red-600',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    { name: 'Add New Blog', href: '/admin/blogs/new', icon: Plus },
    { name: 'Add New Service', href: '/admin/services/new', icon: Plus },
    { name: 'Upload Gallery Image', href: '/admin/gallery/new', icon: Plus },
    { name: 'Manage Contacts', href: '/admin/contacts', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-300">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-gray-800 overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center justify-center h-8 w-8 rounded-md ${card.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-300 truncate">
                        {card.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-white">
                          {card.value.toLocaleString()}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          card.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {card.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.name}
                    href={action.href}
                    className="relative group bg-gray-700 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    <div>
                      <span className="rounded-lg inline-flex p-3 bg-blue-600 text-white ring-4 ring-gray-800">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-white">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {action.name}
                      </h3>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 shadow-lg rounded-lg border border-gray-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Recent Activity
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {stats.recentActivity.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== stats.recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-gray-800">
                            <Eye className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-300">
                              {activity.title} <span className="font-medium text-white">{activity.action}</span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-400">
                            <time>{activity.timestamp}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 