"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowRight, Search, ArrowLeft, TrendingUp, Clock, Sparkles } from 'lucide-react';

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
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'popular'>('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
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

  const filteredBlogs = blogs
    .filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (selectedFilter === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (selectedFilter === 'popular') {
        return b.views - a.views;
      }
      return 0;
    });

  const featuredBlog = blogs.length > 0 ? blogs.reduce((prev, current) =>
    (prev.views > current.views) ? prev : current
  ) : null;

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-purple-950/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Back Button Skeleton */}
          <div className="mb-6">
            <div className="w-24 h-10 bg-white/10 backdrop-blur-md rounded-lg animate-pulse"></div>
          </div>

          {/* Hero Section Skeleton */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-8 w-32 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
            </div>
            <div className="h-16 bg-white/10 rounded-lg w-2/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/5 rounded-lg w-1/2 mx-auto mb-8 animate-pulse"></div>

            {/* Search and Filter Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8">
              <div className="flex-1 h-12 bg-white/10 rounded-full animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-12 w-24 bg-white/10 rounded-full animate-pulse"></div>
                <div className="h-12 w-24 bg-white/10 rounded-full animate-pulse"></div>
                <div className="h-12 w-24 bg-white/10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Featured Blog Skeleton */}
          <div className="mb-16">
            <div className="h-8 w-48 bg-white/10 rounded-lg mb-6 animate-pulse"></div>
            <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 animate-pulse">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-96 bg-gray-700"></div>
                <div className="p-8 space-y-4">
                  <div className="h-10 bg-white/10 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-2/3"></div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 animate-pulse"
              >
                <div className="h-56 bg-gray-700"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-2/3"></div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <div className="h-4 bg-white/10 rounded w-20"></div>
                    <div className="h-4 bg-white/10 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-purple-950/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg px-4 py-2 border-0 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-purple-500/20 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-gray-200">Explore Our Stories</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Inspiring Articles
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover powerful stories, insights, and knowledge from our community of changemakers
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white/10 backdrop-blur-md text-white placeholder-gray-400 shadow-lg transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setSelectedFilter('all')}
                className={`rounded-full px-6 transition-all duration-300 ${selectedFilter === 'all'
                    ? 'bg-red-500 hover:bg-red-600 text-white border-0'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20'
                  }`}
              >
                All
              </Button>
              <Button
                onClick={() => setSelectedFilter('recent')}
                className={`rounded-full px-6 transition-all duration-300 flex items-center gap-2 ${selectedFilter === 'recent'
                    ? 'bg-red-500 hover:bg-red-600 text-white border-0'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20'
                  }`}
              >
                <Clock className="h-4 w-4" />
                Recent
              </Button>
              <Button
                onClick={() => setSelectedFilter('popular')}
                className={`rounded-full px-6 transition-all duration-300 flex items-center gap-2 ${selectedFilter === 'popular'
                    ? 'bg-red-500 hover:bg-red-600 text-white border-0'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300 border border-white/20'
                  }`}
              >
                <TrendingUp className="h-4 w-4" />
                Popular
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Blog Section */}
        {featuredBlog && !searchTerm && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Featured Article</h2>
            </div>

            <div
              className="bg-gradient-to-br from-red-500/10 to-purple-500/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 cursor-pointer group"
              onClick={() => handleReadMore(featuredBlog._id)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-full overflow-hidden">
                  {featuredBlog.imageUrl && featuredBlog.imageUrl.startsWith('https://') ? (
                    <Image
                      src={featuredBlog.imageUrl}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      width={800}
                      height={600}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-600 to-purple-600">
                      <Sparkles className="w-20 h-20 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{featuredBlog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{featuredBlog.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadMore(featuredBlog._id);
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-500/50 border-0 w-fit"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {searchTerm ? 'Search Results' : 'All Articles'}
            </h2>
            <span className="text-gray-400 text-sm">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {searchTerm ? 'No articles found' : 'No articles available yet'}
                </h3>
                <p className="text-gray-400 text-lg">
                  {searchTerm
                    ? 'Try adjusting your search terms or filters'
                    : 'Check back soon for inspiring new content'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
                  onClick={() => handleReadMore(blog._id)}
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    {blog.imageUrl && blog.imageUrl.startsWith('https://') ? (
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={300}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                        <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-300 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="h-3 w-3" />
                        <span>{blog.views} views</span>
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadMore(blog._id);
                        }}
                        className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm border-0 group/btn"
                      >
                        <span>Read</span>
                        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
