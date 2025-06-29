"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Settings as SettingsIcon, Save, Upload, Globe, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Settings } from '@/types/settings';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (!settings) return;
    
    if (field.startsWith('socialMedia.')) {
      const socialField = field.split('.')[1];
      setSettings({
        ...settings,
        socialMedia: {
          ...settings.socialMedia,
          [socialField]: value
        }
      });
    } else {
      setSettings({
        ...settings,
        [field]: value
      });
    }
  };



  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <SettingsIcon className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
            <span className="truncate">Website Settings</span>
          </h1>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">Manage your website configuration and branding</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 flex-shrink-0"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              <span className="hidden sm:inline">Saving...</span>
              <span className="sm:hidden">...</span>
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </>
          )}
        </Button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-900 border border-green-700 text-green-100' 
            : 'bg-red-900 border border-red-700 text-red-100'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Website Logo */}
        <Card className="bg-gray-800 border-gray-700 p-4 md:p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Website Logo
          </h3>
          <div className="space-y-4 min-h-0">
            <ImageUpload
              onImageUpload={(imageUrl) => {
                setSettings(prev => prev ? {
                  ...prev,
                  logoUrl: imageUrl,
                  logoPublicId: ''
                } : null);
                setMessage('Logo uploaded successfully!');
              }}
              currentImage={settings.logoUrl}
            />
            {settings.logoUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">Current Logo:</p>
                <div className="w-full max-w-sm mx-auto bg-white rounded-lg p-3 shadow-md overflow-hidden">
                  <div className="relative w-full h-20 flex items-center justify-center">
                    <Image
                      src={settings.logoUrl}
                      alt="Website Logo"
                      width={200}
                      height={80}
                      className="object-contain max-w-full max-h-full"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Logo will be resized automatically to fit
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="bg-gray-800 border-gray-700 p-4 md:p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Basic Information
          </h3>
          <div className="space-y-4 min-h-0">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website Name
              </label>
              <Input
                value={settings.websiteName}
                onChange={(e) => handleInputChange('websiteName', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="Enter website name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <Textarea
                value={settings.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0 resize-none"
                placeholder="Enter website description"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gray-800 border-gray-700 p-4 md:p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Contact Information
          </h3>
          <div className="space-y-4 min-h-0">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="Enter contact email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Phone
              </label>
              <Input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="Enter contact phone"
              />
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <Card className="bg-gray-800 border-gray-700 p-4 md:p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4">
            Social Media Links
          </h3>
          <div className="space-y-4 min-h-0">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </label>
              <Input
                value={settings.socialMedia.facebook}
                onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </label>
              <Input
                value={settings.socialMedia.instagram}
                onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </label>
              <Input
                value={settings.socialMedia.twitter}
                onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Youtube className="mr-2 h-4 w-4" />
                YouTube
              </label>
              <Input
                value={settings.socialMedia.youtube}
                onChange={(e) => handleInputChange('socialMedia.youtube', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white w-full min-w-0"
                placeholder="https://youtube.com/yourchannel"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button at Bottom */}
      <div className="flex justify-center sm:justify-end pt-6 border-t border-gray-700">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              <span className="hidden sm:inline">Saving Changes...</span>
              <span className="sm:hidden">Saving...</span>
            </>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Save All Changes</span>
              <span className="sm:hidden">Save All</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 