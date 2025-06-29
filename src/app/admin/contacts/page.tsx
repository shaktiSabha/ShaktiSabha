"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  User, 
  Calendar, 
  Eye, 
  MessageCircle, 
  Trash2, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { IContact } from '@/types/contact';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [replyText, setReplyText] = useState('');

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/contact?${params}`);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
      } else {
        console.error('Error fetching contacts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchContacts();
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, status: status as 'unread' | 'read' | 'replied' });
        }
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleReply = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'replied',
          reply: replyText 
        })
      });

      if (response.ok) {
        fetchContacts();
        setReplyText('');
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ 
            ...selectedContact, 
            status: 'replied',
            reply: replyText 
          });
        }
        // Show success message
        alert('✅ Reply sent successfully! User will receive an email notification.');
      } else {
        alert('❌ Failed to send reply. Please try again.');
      }
    } catch (error) {
      console.error('Error replying to contact:', error);
      alert('❌ Error sending reply. Please check your connection.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchContacts();
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-gray-300">Manage contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        {[
          { name: 'Total Messages', value: total, color: 'bg-blue-600' },
          { 
            name: 'Unread', 
            value: contacts.filter(c => c.status === 'unread').length, 
            color: 'bg-red-600' 
          },
          { 
            name: 'Read', 
            value: contacts.filter(c => c.status === 'read').length, 
            color: 'bg-yellow-600' 
          },
          { 
            name: 'Replied', 
            value: contacts.filter(c => c.status === 'replied').length, 
            color: 'bg-green-600' 
          }
        ].map((stat) => (
          <div key={stat.name} className="bg-gray-800 overflow-hidden shadow-lg rounded-lg border border-gray-700">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center h-8 w-8 rounded-md ${stat.color} text-white`}>
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-white">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading...</div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No contacts found</div>
            ) : (
              <>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedContact?._id === contact._id
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-white">{contact.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{contact.email}</p>
                          <p className="text-sm text-gray-400 mt-1 truncate">{contact.subject}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(contact.createdAt!)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="text-white border-gray-600"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="text-white border-gray-600"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{selectedContact.subject}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4" />
                      <span>{selectedContact.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="h-4 w-4" />
                      <span>{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(selectedContact.createdAt!)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-white mb-2">Message:</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>

                  {selectedContact.reply && (
                    <div className="bg-green-900/20 border border-green-500/20 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-green-400 mb-2">Your Reply:</h4>
                      <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.reply}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedContact.status === 'unread' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(selectedContact._id!, 'read')}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(selectedContact._id!)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>

                {/* Reply Section */}
                {selectedContact.status !== 'replied' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Send Reply:</h4>
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                    />
                    <Button
                      onClick={() => handleReply(selectedContact._id!)}
                      disabled={!replyText.trim()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Send Reply
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                Select a message to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactsPage; 