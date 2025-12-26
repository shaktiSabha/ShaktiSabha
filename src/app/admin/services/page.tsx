"use client";
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  BookOpen,
  Users,
  Calendar,
  Filter,
  MoreVertical,
  TrendingUp,
  X,
  Grid3x3,
  List,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Target,
  Award,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  participants: number;
  imageUrl?: string;
  duration?: string;
  price?: string;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'participants' | 'title'>('newest');
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const mockServices: Service[] = [
        {
          id: '1',
          title: 'Counseling Services',
          description: 'Professional counseling and therapy sessions for women dealing with various life challenges. Our experienced counselors provide a safe space for healing and growth.',
          category: 'Mental Health',
          status: 'active',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          participants: 45,
          imageUrl: '/placeholder-blog.svg',
          duration: '8 weeks',
          price: 'Free'
        },
        {
          id: '2',
          title: 'Self-Defense Training',
          description: 'Comprehensive self-defense classes designed specifically for women. Learn practical techniques to protect yourself and build confidence.',
          category: 'Physical Training',
          status: 'active',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-12',
          participants: 78,
          imageUrl: '/Courses/selfdefence.jpeg',
          duration: '12 weeks',
          price: '$50'
        },
        {
          id: '3',
          title: 'Career Development Workshop',
          description: 'Workshops focused on career advancement and professional development for women. Build skills, network, and advance your career.',
          category: 'Professional Development',
          status: 'active',
          createdAt: '2024-01-08',
          updatedAt: '2024-01-08',
          participants: 32,
          imageUrl: '/placeholder-blog.svg',
          duration: '6 weeks',
          price: '$75'
        },
        {
          id: '4',
          title: 'Online Courses Platform',
          description: 'Digital learning platform with courses on various empowerment topics. Learn at your own pace from anywhere.',
          category: 'Education',
          status: 'inactive',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-05',
          participants: 0,
          imageUrl: '/placeholder-blog.svg',
          duration: 'Self-paced',
          price: '$30/month'
        },
        {
          id: '5',
          title: 'Leadership Training',
          description: 'Develop leadership skills and confidence to take on leadership roles in your community and workplace.',
          category: 'Professional Development',
          status: 'active',
          createdAt: '2024-01-20',
          updatedAt: '2024-01-20',
          participants: 56,
          imageUrl: '/placeholder-blog.svg',
          duration: '10 weeks',
          price: '$100'
        },
        {
          id: '6',
          title: 'Financial Literacy Workshop',
          description: 'Learn essential financial management skills including budgeting, saving, investing, and building wealth.',
          category: 'Education',
          status: 'active',
          createdAt: '2024-01-18',
          updatedAt: '2024-01-18',
          participants: 41,
          imageUrl: '/placeholder-blog.svg',
          duration: '4 weeks',
          price: 'Free'
        }
      ];

      setServices(mockServices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchServices();
    setTimeout(() => setRefreshing(false), 500);
  };

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'participants':
        return b.participants - a.participants;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    inactive: services.filter(s => s.status === 'inactive').length,
    totalParticipants: services.reduce((sum, s) => sum + s.participants, 0)
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        setServices(services.filter(service => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </span>
      )
      : (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
          <AlertCircle className="h-3 w-3" />
          Inactive
        </span>
      );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mental Health':
        return <Sparkles className="h-5 w-5" />;
      case 'Physical Training':
        return <Target className="h-5 w-5" />;
      case 'Professional Development':
        return <Award className="h-5 w-5" />;
      case 'Education':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 text-sm">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Services Management</h1>
              </div>
              <p className="text-blue-100 text-sm">
                Manage and organize your services and programs
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/admin/services/new'}
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Service
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Total Services</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Active</p>
                <p className="text-3xl font-bold text-white">{stats.active}</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20 hover:border-red-500/40 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Inactive</p>
                <p className="text-3xl font-bold text-white">{stats.inactive}</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">Total Participants</p>
                <p className="text-3xl font-bold text-white">{stats.totalParticipants}</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {(filterCategory !== 'all' || filterStatus !== 'all') && (
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                      {(filterCategory !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-none ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode('list')}
                    className={`rounded-none ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="participants">Most Participants</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{sortedServices.length}</span> of{' '}
          <span className="font-semibold text-white">{services.length}</span> services
        </p>
      </div>

      {/* Services Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <Card key={service.id} className="group bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getCategoryIcon(service.category)}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(service.status)}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">{service.participants}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">{service.duration || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                      <span className="text-gray-300">{service.price || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span className="text-gray-300">{new Date(service.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/admin/services/${service.id}`}
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/admin/services/${service.id}/edit`}
                      className="flex-1 border-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      className="border-gray-700 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedServices.map((service) => (
            <Card key={service.id} className="group bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {getCategoryIcon(service.category)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {service.title}
                          </h3>
                          {getStatusBadge(service.status)}
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">{service.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{service.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" />
                        <span>{service.price || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(service.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/admin/services/${service.id}`}
                        className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/admin/services/${service.id}/edit`}
                        className="border-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                        className="border-gray-700 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedServices.length === 0 && (
        <Card className="bg-gray-800/30 border-gray-700/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
              <BookOpen className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                ? "No services match your current filters. Try adjusting your search criteria."
                : "Get started by creating your first service."}
            </p>
            {(searchTerm || filterCategory !== 'all' || filterStatus !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterStatus('all');
                }}
                className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesManagement;
