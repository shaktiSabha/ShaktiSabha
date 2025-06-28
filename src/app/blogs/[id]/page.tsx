"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Eye, Share2, Clock, BookOpen } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  status: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (response.ok) {
        const blogData = await response.json();
        setBlog(blogData);
      } else {
        router.push('/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      router.push('/blogs');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id, fetchBlog]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-200">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-6">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button 
            onClick={() => router.push('/blogs')}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg border-0"
          >
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const readingTime = formatReadingTime(blog.content);

  return (
    <div className="min-h-screen relative">
      {/* Header Navigation */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 border-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Articles</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
      </div>

      {/* Single Card Layout */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          {/* Title and Meta Info */}
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-white text-sm sm:text-base mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author, Share, Date, Read Time */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{blog.author}</p>
                  <p className="text-sm text-gray-300">Author</p>
                </div>
              </div>

              {/* Share Button */}
              <Button
                variant="ghost"
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 border-0"
              >
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>

            {/* Date and Read Time */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-300 mb-8 pb-6 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views} views</span>
              </div>
              {blog.updatedAt !== blog.createdAt && (
                <div className="text-xs text-gray-400">
                  Updated {new Date(blog.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg sm:prose-xl max-w-none prose-headings:text-white prose-p:text-white prose-a:text-red-400 prose-strong:text-white prose-em:text-white prose-code:text-white prose-pre:text-white prose-blockquote:text-white prose-blockquote:border-l-red-400 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-li:text-white prose-ul:text-white prose-ol:text-white prose-table:text-white prose-thead:text-white prose-tbody:text-white prose-td:text-white prose-th:text-white text-white [&_*]:text-white [&_p]:text-white [&_span]:text-white [&_div]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-red-400 hover:scrollbar-thumb-red-500"
              style={{ 
                color: 'white !important',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              More Articles
            </h3>
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">Related articles will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 