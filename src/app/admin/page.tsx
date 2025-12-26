"use client";
import React, { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  Image,
  BookOpen,
  TrendingUp,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Clock,
  MessageSquare,
  Star,
  BarChart3,
  Sparkles
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalServices: number;
  totalGalleryItems: number;
  totalContacts: number;
  totalTestimonials: number;
  pendingContacts: number;
  publishedBlogs: number;
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    action: string;
    user?: string;
  }>;
  weeklyStats: {
    blogs: number;
    contacts: number;
    gallery: number;
    users: number;
  };
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBlogs: 0,
    totalServices: 0,
    totalGalleryItems: 0,
    totalContacts: 0,
    totalTestimonials: 0,
    pendingContacts: 0,
    publishedBlogs: 0,
    recentActivity: [],
    weeklyStats: {
      blogs: 0,
      contacts: 0,
      gallery: 0,
      users: 0
    }
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalUsers: 1250,
      totalBlogs: 45,
      totalServices: 12,
      totalGalleryItems: 89,
      totalContacts: 23,
      totalTestimonials: 34,
      pendingContacts: 8,
      publishedBlogs: 42,
      weeklyStats: {
        blogs: 5,
        contacts: 12,
        gallery: 8,
        users: 45
      },
      recentActivity: [
        {
          id: '1',
          type: 'blog',
          title: 'Women Empowerment in Tech',
          timestamp: '2 hours ago',
          action: 'created',
          user: 'Admin'
        },
        {
          id: '2',
          type: 'service',
          title: 'Counseling Service',
          timestamp: '4 hours ago',
          action: 'updated',
          user: 'Admin'
        },
        {
          id: '3',
          type: 'gallery',
          title: 'Workshop Event Photo',
          timestamp: '6 hours ago',
          action: 'added',
          user: 'Admin'
        },
        {
          id: '4',
          type: 'contact',
          title: 'New contact inquiry',
          timestamp: '8 hours ago',
          action: 'received',
          user: 'Sarah Johnson'
        },
        {
          id: '5',
          type: 'testimonial',
          title: 'New testimonial submitted',
          timestamp: '1 day ago',
          action: 'submitted',
          user: 'Emily Davis'
        }
      ]
    });
  }, []);

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      gradient: 'from-blue-500 to-blue-700',
      change: '+12%',
      changeType: 'positive',
      subtitle: 'Active members'
    },
    {
      title: 'Published Blogs',
      value: stats.publishedBlogs,
      icon: FileText,
      gradient: 'from-emerald-500 to-emerald-700',
      change: '+5%',
      changeType: 'positive',
      subtitle: `${stats.totalBlogs - stats.publishedBlogs} drafts`
    },
    {
      title: 'Services',
      value: stats.totalServices,
      icon: BookOpen,
      gradient: 'from-purple-500 to-purple-700',
      change: '+2%',
      changeType: 'positive',
      subtitle: 'Active services'
    },
    {
      title: 'Gallery Items',
      value: stats.totalGalleryItems,
      icon: Image,
      gradient: 'from-orange-500 to-orange-700',
      change: '+8%',
      changeType: 'positive',
      subtitle: 'Total media'
    },
    {
      title: 'Pending Contacts',
      value: stats.pendingContacts,
      icon: Mail,
      gradient: 'from-red-500 to-red-700',
      change: '+15%',
      changeType: 'positive',
      subtitle: `${stats.totalContacts} total`
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: Star,
      gradient: 'from-yellow-500 to-yellow-700',
      change: '+3%',
      changeType: 'positive',
      subtitle: 'Customer reviews'
    }
  ];

  const quickActions = [
    {
      name: 'Create Blog Post',
      href: '/admin/blogs/new',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      description: 'Write a new article'
    },
    {
      name: 'Add Service',
      href: '/admin/services/new',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      description: 'Create new service'
    },
    {
      name: 'Upload Media',
      href: '/admin/gallery/new',
      icon: Image,
      color: 'from-orange-500 to-orange-600',
      description: 'Add to gallery'
    },
    {
      name: 'View Contacts',
      href: '/admin/contacts',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      description: 'Manage inquiries'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog': return FileText;
      case 'service': return BookOpen;
      case 'gallery': return Image;
      case 'contact': return Mail;
      case 'testimonial': return Star;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-500';
      case 'service': return 'bg-purple-500';
      case 'gallery': return 'bg-orange-500';
      case 'contact': return 'bg-green-500';
      case 'testimonial': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8" />
              Welcome Back, Admin!
            </h1>
            <p className="text-blue-100 text-lg">Here&apos;s what&apos;s happening with your platform today</p>
          </div>
          <div className="mt-4 md:mt-0 text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Calendar className="h-4 w-4" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold mt-1">
              <Clock className="h-5 w-5" />
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="relative bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="p-6 relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-white mb-1">
                      {card.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {card.subtitle}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`inline-flex items-center text-sm font-semibold ${card.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {card.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {card.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 shadow-xl rounded-2xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            Quick Actions
          </h3>
          <p className="text-gray-400 text-sm mt-1">Frequently used actions for faster workflow</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.name}
                  href={action.href}
                  className="relative group bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500 hover:shadow-lg hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} shadow-lg mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {action.description}
                  </p>
                  <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-gray-800 shadow-xl rounded-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="h-6 w-6 text-purple-400" />
              Recent Activity
            </h3>
            <p className="text-gray-400 text-sm mt-1">Latest updates and changes</p>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="space-y-4">
                {stats.recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  return (
                    <li key={activity.id} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors border border-gray-600">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.action} by {activity.user || 'System'}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-xs text-gray-500">
                          {activity.timestamp}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="bg-gray-800 shadow-xl rounded-2xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-400" />
              This Week
            </h3>
            <p className="text-gray-400 text-sm mt-1">Weekly statistics</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">New Blogs</span>
                <span className="text-lg font-bold text-white">{stats.weeklyStats.blogs}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">New Contacts</span>
                <span className="text-lg font-bold text-white">{stats.weeklyStats.contacts}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Gallery Uploads</span>
                <span className="text-lg font-bold text-white">{stats.weeklyStats.gallery}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">New Users</span>
                <span className="text-lg font-bold text-white">{stats.weeklyStats.users}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 