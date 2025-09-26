import React, { useState, useEffect } from 'react';
import { Rss, Plus, Trash2, RefreshCw, Globe, CheckCircle, AlertCircle, Settings } from 'lucide-react';

interface RSSFeed {
  id: number;
  name: string;
  url: string;
  category: string;
  isActive: boolean;
  lastFetch: string;
  postCount: number;
  status: 'active' | 'error' | 'pending';
}

interface RSSFeedManagerProps {
  user: any;
  onClose: () => void;
}

export const RSSFeedManager: React.FC<RSSFeedManagerProps> = ({ user, onClose }) => {
  const [feeds, setFeeds] = useState<RSSFeed[]>([
    {
      id: 1,
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Tech News',
      isActive: true,
      lastFetch: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      postCount: 15,
      status: 'active'
    },
    {
      id: 2,
      name: 'Stack Overflow Blog',
      url: 'https://stackoverflow.blog/feed/',
      category: 'Developer Content',
      isActive: true,
      lastFetch: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      postCount: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'GitHub Blog',
      url: 'https://github.blog/feed/',
      category: 'Development Tools',
      isActive: false,
      lastFetch: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      postCount: 12,
      status: 'pending'
    },
    {
      id: 4,
      name: 'Hacker News',
      url: 'https://hnrss.org/frontpage',
      category: 'Tech Discussion',
      isActive: true,
      lastFetch: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      postCount: 25,
      status: 'active'
    }
  ]);

  const [newFeed, setNewFeed] = useState({ name: '', url: '', category: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshing, setRefreshing] = useState<number | null>(null);

  // Check if user has RSS management permissions
  const canManageRSS = user?.is_super_admin || user?.admin_permissions?.rss_management;

  if (!canManageRSS) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600 mb-4">You don't have permission to manage RSS feeds.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeed.name || !newFeed.url || !newFeed.category) return;

    const feed: RSSFeed = {
      id: Date.now(),
      name: newFeed.name,
      url: newFeed.url,
      category: newFeed.category,
      isActive: true,
      lastFetch: new Date().toISOString(),
      postCount: 0,
      status: 'pending'
    };

    setFeeds([...feeds, feed]);
    setNewFeed({ name: '', url: '', category: '' });
    setShowAddForm(false);
  };

  const handleToggleFeed = (id: number) => {
    setFeeds(feeds.map(feed => 
      feed.id === id 
        ? { ...feed, isActive: !feed.isActive, status: feed.isActive ? 'pending' : 'active' }
        : feed
    ));
  };

  const handleDeleteFeed = (id: number) => {
    if (window.confirm('Are you sure you want to delete this RSS feed?')) {
      setFeeds(feeds.filter(feed => feed.id !== id));
    }
  };

  const handleRefreshFeed = async (id: number) => {
    setRefreshing(id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFeeds(feeds.map(feed => 
      feed.id === id 
        ? { 
            ...feed, 
            lastFetch: new Date().toISOString(),
            postCount: feed.postCount + Math.floor(Math.random() * 5) + 1,
            status: 'active'
          }
        : feed
    ));
    
    setRefreshing(null);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <RefreshCw className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Rss className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">RSS Feed Manager</h2>
                <p className="text-indigo-200">Manage automated content feeds</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Active Feeds</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {feeds.filter(f => f.isActive).length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Total Posts</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {feeds.reduce((sum, feed) => sum + feed.postCount, 0)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Categories</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {new Set(feeds.map(f => f.category)).size}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Last Update</span>
              </div>
              <p className="text-sm font-bold text-yellow-900 mt-1">
                {formatTime(Math.max(...feeds.map(f => new Date(f.lastFetch).getTime())).toString())}
              </p>
            </div>
          </div>

          {/* Add Feed Button */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">RSS Feeds</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Feed</span>
            </button>
          </div>

          {/* Add Feed Form */}
          {showAddForm && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <form onSubmit={handleAddFeed} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Feed Name"
                    value={newFeed.name}
                    onChange={(e) => setNewFeed({ ...newFeed, name: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="url"
                    placeholder="RSS URL"
                    value={newFeed.url}
                    onChange={(e) => setNewFeed({ ...newFeed, url: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <select
                    value={newFeed.category}
                    onChange={(e) => setNewFeed({ ...newFeed, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Tech News">Tech News</option>
                    <option value="Developer Content">Developer Content</option>
                    <option value="Development Tools">Development Tools</option>
                    <option value="Tech Discussion">Tech Discussion</option>
                    <option value="Industry Updates">Industry Updates</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Feeds List */}
          <div className="space-y-4">
            {feeds.map((feed) => (
              <div key={feed.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(feed.status)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{feed.name}</h4>
                        <p className="text-sm text-gray-500">{feed.category}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>URL: <span className="font-mono text-xs">{feed.url}</span></p>
                      <p>Posts: {feed.postCount} • Last fetch: {formatTime(feed.lastFetch)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feed.isActive}
                        onChange={() => handleToggleFeed(feed.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                    
                    <button
                      onClick={() => handleRefreshFeed(feed.id)}
                      disabled={refreshing === feed.id}
                      className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      title="Refresh feed"
                    >
                      <RefreshCw className={`w-4 h-4 ${refreshing === feed.id ? 'animate-spin' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteFeed(feed.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete feed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>RSS feeds are automatically processed every 30 minutes</p>
            <p>Total feeds: {feeds.length} • Active: {feeds.filter(f => f.isActive).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};