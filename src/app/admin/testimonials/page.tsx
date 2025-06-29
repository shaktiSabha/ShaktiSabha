"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, MessageSquare, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Testimonial } from '@/types/testimonial';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || testimonial.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
        } else {
          alert('Failed to delete testimonial');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete testimonial');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'published' 
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">Published</span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">Draft</span>;
  };

  const getStats = () => {
    const total = testimonials.length;
    const published = testimonials.filter(t => t.status === 'published').length;
    const drafts = testimonials.filter(t => t.status === 'draft').length;
    return { total, published, drafts };
  };

  const stats = getStats();

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
          <h1 className="text-3xl font-bold text-white">Testimonials Management</h1>
          <p className="text-gray-300 mt-1">Manage member testimonials</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <a href="/admin/testimonials/new" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Testimonial</span>
          </a>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total</p>
                <p className="text-2xl font-semibold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Published</p>
                <p className="text-2xl font-semibold text-white">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Drafts</p>
                <p className="text-2xl font-semibold text-white">{stats.drafts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search testimonials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial._id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                    {getStatusBadge(testimonial.status)}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    &quot;{testimonial.message}&quot;
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Member since {testimonial.memberSince}</span>
                    <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <a href={`/admin/testimonials/${testimonial._id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(testimonial._id)}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No testimonials found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first testimonial'
              }
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/admin/testimonials/new">Add First Testimonial</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestimonialsManagement; 