"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowRight, Search, ArrowLeft } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  views: number;
  status: string;
}

export default function BlogSection() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          // Filter only published blogs
          const publishedBlogs = data.filter((blog: Blog) => blog.status === 'published');
          setBlogs(publishedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (blogId: string) => {
    router.push(`/blogs/${blogId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-6 mt-1 hover:scale-105 transition-transform duration-300">
              Latest Articles
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover insights, stories, and knowledge from our community
            </p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-400 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 border-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-400 mb-6 mt-1 hover:scale-105 transition-transform duration-300">
            Latest Articles
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover insights, stories, and knowledge from our community
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white/10 backdrop-blur-md text-white placeholder-gray-300 shadow-lg"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm ? 'No articles found' : 'No articles available yet'}
              </h3>
              <p className="text-gray-300">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Check back soon for new content'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog._id} 
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => handleReadMore(blog._id)}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl mb-6">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={256}
                    height={256}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Article
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-300 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-300">
                      <Eye className="h-3 w-3" />
                      <span>{blog.views} views</span>
                    </div>
                  </div>
                </div>
                
                {/* Read More Button */}
                <div className="mt-6">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMore(blog._id);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg border-0"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
