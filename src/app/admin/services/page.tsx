"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, BookOpen } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  participants: number;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockServices: Service[] = [
      {
        id: '1',
        title: 'Counseling Services',
        description: 'Professional counseling and therapy sessions for women dealing with various life challenges.',
        category: 'Mental Health',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15',
        participants: 45
      },
      {
        id: '2',
        title: 'Self-Defense Training',
        description: 'Comprehensive self-defense classes designed specifically for women.',
        category: 'Physical Training',
        status: 'active',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12',
        participants: 78
      },
      {
        id: '3',
        title: 'Career Development Workshop',
        description: 'Workshops focused on career advancement and professional development for women.',
        category: 'Professional Development',
        status: 'active',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
        participants: 32
      },
      {
        id: '4',
        title: 'Online Courses Platform',
        description: 'Digital learning platform with courses on various empowerment topics.',
        category: 'Education',
        status: 'inactive',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-05',
        participants: 0
      }
    ];
    
    setServices(mockServices);
    setLoading(false);
  }, []);

  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">Active</span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">Inactive</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Management</h1>
          <p className="text-gray-300">Manage your services and programs</p>
        </div>
        <a
          href="/admin/services/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Service
        </a>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-300">
              Search
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400 rounded-md"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-gray-800 overflow-hidden shadow-lg rounded-lg border border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">{service.category}</p>
                  </div>
                </div>
                {getStatusBadge(service.status)}
              </div>
              
              <h3 className="text-lg font-medium text-white mb-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{service.participants} participants</span>
                <span>{new Date(service.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <a
                  href={`/admin/services/${service.id}`}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </a>
                <a
                  href={`/admin/services/${service.id}/edit`}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-red-600 shadow-sm text-sm leading-4 font-medium rounded-md text-red-400 bg-gray-700 hover:bg-red-900 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-300">No services found</h3>
          <p className="mt-1 text-sm text-gray-400">No services match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement; 