import React, { useState, useEffect } from 'react';
import { User, Upload, Plus, X, Search, Bell, Settings, FileText, Eye, Mail, Trash2, MoreHorizontal, ExternalLink, ArrowLeft } from 'lucide-react';
import { Logo } from './components/Logo';
import { CodeSnippet } from './components/CodeSnippet';
import { PostCreator } from './components/PostCreator';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { MessagingSystem } from './components/MessagingSystem';
import { CommentSystem } from './components/CommentSystem';
import { EngagementBar } from './components/EngagementBar';
import { ResumeViewer } from './components/ResumeViewer';
import { PostDeleteConfirmation } from './components/PostDeleteConfirmation';
import { RSSFeedManager } from './components/RSSFeedManager';
import { mockUsers, mockPosts } from './data/mockUsers';

interface User {
  id: number;
  email: string;
  full_name: string;
  profile_picture: string;
  bio?: string;
  location?: string;
  skills?: string[];
  company?: string;
  job_title?: string;
}

interface Post {
  id: number;
  user_id: number;
  content: string;
  post_type: string;
  code_language?: string;
  document_name?: string;
  resume_name?: string;
  url_preview?: {
    url: string;
    title: string;
    description: string;
    image?: string;
    siteName?: string;
    favicon?: string;
  };
  resume_url?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  full_name: string;
  profile_picture: string;
  job_title: string;
  company: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [showRSSManager, setShowRSSManager] = useState(false);
  const [selectedResume, setSelectedResume] = useState<{ url?: string; file?: File; userName: string } | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [postCommentCounts, setPostCommentCounts] = useState<Record<number, number>>({});
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    fullName: '',
    jobTitle: '',
    company: ''
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - find user by email
    const foundUser = mockUsers.find(u => u.email === loginForm.email);
    if (foundUser && loginForm.password === 'geek123') {
      setUser(foundUser);
      setShowLogin(false);
      
      // Show onboarding for new users
      if (!foundUser.onboarding_completed) {
        setShowOnboarding(true);
      }
      
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      alert('Invalid credentials. Try any email from the demo list with password: geek123');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock registration
    const newUser = {
      id: Date.now(),
      email: registerForm.email,
      full_name: registerForm.fullName,
      profile_picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: `${registerForm.jobTitle} at ${registerForm.company}`,
      location: 'Remote',
      skills: [],
      company: registerForm.company,
      job_title: registerForm.jobTitle
    };
    
    setUser(newUser);
    setShowLogin(false);
    setShowRegister(false);
    setShowOnboarding(true); // Always show onboarding for new registrations
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleCreatePost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const handleCommentCountChange = (postId: number, count: number) => {
    setPostCommentCounts(prev => ({ ...prev, [postId]: count }));
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleDeletePost = async (postId: number) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would be an API call
    // await deletePost(postId);
    
    setPosts(posts.filter(post => post.id !== postId));
    setShowDeleteConfirm(null);
    
    // Show success feedback
    // You could add a toast notification here
  };

  const handleLike = async (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes_count: post.likes_count + 1 }
        : post
    ));
  };

  const handleViewResume = (documentUrl: string, userName: string) => {
    setSelectedResume({ url: documentUrl, userName });
    setShowResumeViewer(true);
  };

  const handleCloseResumeViewer = () => {
    setShowResumeViewer(false);
    setSelectedResume(null);
  };

  const logout = () => {
    setUser(null);
    setShowLogin(true);
    setPosts(mockPosts);
    localStorage.removeItem('user');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Check for stored user on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setShowLogin(false);
      
      // Check if onboarding is needed
      if (!userData.onboarding_completed) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (user) {
      const updatedUser = { ...user, onboarding_completed: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Show Resume Viewer if active
  if (showResumeViewer && selectedResume) {
    return (
      <ResumeViewer
        resumeUrl={selectedResume.url}
        resumeFile={selectedResume.file}
        userName={selectedResume.userName}
        onBack={handleCloseResumeViewer}
      />
    );
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Logo size="lg" className="justify-center mb-4" />
            <p className="text-gray-600">Connect with tech professionals worldwide</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8">
            {!showRegister ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="password123"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Sign In
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowRegister(true)}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-xs text-gray-500 mb-2">Demo accounts:</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>📧 alex.chen@meta.com | 🔑 geek123</p>
                    <p>📧 sarah.johnson@google.com | 🔑 geek123</p>
                    <p>📧 emily.watson@startup.io | 🔑 geek123</p>
                    <p>📧 david.kim@nvidia.com | 🔑 geek123</p>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="geek123"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    required
                    value={registerForm.jobTitle}
                    onChange={(e) => setRegisterForm({ ...registerForm, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Software Developer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    value={registerForm.company}
                    onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tech Corp"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Create Account
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowRegister(false)}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Logo size="md" />
              <nav className="flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium bg-indigo-50">
                  Feed
                </a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search people, skills, jobs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
              <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="flex items-center space-x-3">
                <img
                  src={user?.profile_picture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                  alt={user?.full_name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user?.full_name}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="text-center">
                <img
                  src={user?.profile_picture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                  alt={user?.full_name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{user?.full_name}</h3>
                <p className="text-sm text-gray-600">{user?.job_title}</p>
                <p className="text-sm text-gray-500">{user?.company}</p>
                {user?.location && (
                  <p className="text-sm text-gray-500 mt-2">{user.location}</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Post</span>
                </button>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition duration-200"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Document</span>
                </button>
                <button
                  onClick={() => setShowMessaging(true)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition duration-200"
                >
                  <Mail className="w-5 h-5" />
                  <span>Messages</span>
                </button>
                {user && (user.is_super_admin || user.admin_permissions?.rss_management) && (
                  <button
                    onClick={() => setShowRSSManager(true)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition duration-200"
                  >
                    <Rss className="w-5 h-5" />
                    <span>RSS Feeds</span>
                  </button>
                )}
              </div>
            </div>

            {/* Trending Skills */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Trending Skills</h4>
              <div className="space-y-2">
                {['React', 'TypeScript', 'Python', 'Node.js', 'AWS'].map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{skill}</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +{Math.floor(Math.random() * 20) + 5}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start space-x-3 mb-4">
                    <img
                      src={post.profile_picture}
                      alt={post.full_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-gray-900">{post.full_name}</h4>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          {post.job_title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{post.company}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(post.created_at)}</p>
                    </div>
                    {user && user.id === post.user_id && (
                      <div className="relative">
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                              handleDeletePost(post.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors group"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    {post.post_type === 'code' ? (
                      <div className="space-y-4">
                        {post.content && post.content !== post.content.trim() && (
                          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed mb-4">
                            {post.content.split('\n').find(line => !line.includes('public') && !line.includes('List') && line.trim())}
                          </p>
                        )}
                        <CodeSnippet 
                          code={post.content} 
                          language={post.code_language || 'javascript'} 
                        />
                      </div>
                    ) : post.post_type === 'document' ? (
                      <div className="space-y-4">
                        {post.content && (
                          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                        )}
                        {post.document_name && (
                          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            {/* Document Header */}
                            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-white">{post.document_name}</p>
                                  <p className="text-sm text-gray-300">PDF Document</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    if (post.document_url) {
                                      handleViewResume(post.document_url, post.full_name);
                                    }
                                  }}
                                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="View resume"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (post.document_url) {
                                      const link = document.createElement('a');
                                      link.href = post.document_url;
                                      link.download = post.document_name;
                                      link.click();
                                    }
                                  }}
                                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {/* PDF Preview */}
                            <div className="relative">
                              {post.document_url ? (
                                <iframe
                                  src={post.document_url}
                                  className="w-full h-64 border-0"
                                  title={`Preview of ${post.document_name}`}
                                  onError={() => {
                                    console.error('Failed to load PDF preview');
                                  }}
                                />
                              ) : (
                                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                  <div className="text-center">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 text-sm mb-2">PDF Preview</p>
                                    <p className="text-xs text-gray-500">Click "Open" to view full document</p>
                                  </div>
                                </div>
                              )}
                              
                              {/* Document type indicator */}
                              <div className="absolute top-2 right-2">
                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                                  PDF
                                </span>
                              </div>
                            </div>
                            
                            {/* Document info footer */}
                            <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
                              <p>Shared document</p>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => {
                                    if (post.document_url) {
                                      handleViewResume(post.document_url, post.full_name);
                                    }
                                  }}
                                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : post.post_type === 'resume' ? (
                      <div className="space-y-4">
                        {post.content && (
                          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                        )}
                        {post.resume_name && (
                          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            {/* Resume Header */}
                            <div className="bg-blue-800 text-white p-4 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-white">{post.resume_name}</p>
                                  <p className="text-sm text-blue-200">Resume/CV</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    if (post.resume_url) {
                                      handleViewResume(post.resume_url, post.full_name);
                                    }
                                  }}
                                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                                  title="View resume"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (post.resume_url) {
                                      const link = document.createElement('a');
                                      link.href = post.resume_url;
                                      link.download = post.resume_name;
                                      link.click();
                                    }
                                  }}
                                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <Upload className="w-4 h-4" />
                                </button>
                                {/* Delete Resume Button - Only for post owner */}
                                {user && user.id === post.user_id && (
                                  <button
                                    onClick={() => setShowDeleteConfirm(post.id)}
                                    className="p-2 hover:bg-red-600 rounded-lg transition-colors group"
                                    title="Delete resume post"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-200 group-hover:text-white" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Resume Preview - Fixed Display */}
                            <div className="relative">
                              <div className="w-full h-80 bg-white">
                                {post.resume_url ? (
                                  <iframe
                                    src={`${post.resume_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full border-0"
                                    title={`Preview of ${post.resume_name}`}
                                    style={{ 
                                      minHeight: '320px',
                                      backgroundColor: 'white'
                                    }}
                                    onLoad={() => {
                                      console.log('Resume loaded successfully');
                                    }}
                                    onError={(e) => {
                                      console.error('Failed to load resume preview:', e);
                                      // Fallback to document viewer
                                      const iframe = e.target as HTMLIFrameElement;
                                      iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(post.resume_url!)}&embedded=true`;
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                    <div className="text-center">
                                      <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                      <p className="text-gray-600 text-lg font-medium mb-2">Resume Preview</p>
                                      <p className="text-gray-500 text-sm">Document is loading...</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Resume type indicator */}
                              <div className="absolute top-2 right-2">
                                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                  CV
                                </span>
                              </div>
                            </div>
                            
                            {/* Resume info footer */}
                            <div className="bg-blue-50 px-4 py-3 text-sm text-blue-800 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>Professional Resume • {post.full_name}</span>
                              </div>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => {
                                    if (post.resume_url) {
                                      handleViewResume(post.resume_url, post.full_name);
                                    }
                                  }}
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (post.resume_url) {
                                      const link = document.createElement('a');
                                      link.href = post.resume_url;
                                      link.download = post.resume_name || 'resume.pdf';
                                      link.click();
                                    }
                                  }}
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                                >
                                  <Upload className="w-3 h-3" />
                                  <span>Download</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : post.url_preview ? (
                      <div className="space-y-4">
                        {post.content && (
                          <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                        )}
                        <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          {post.url_preview.image && (
                            <div className="relative h-48 bg-gray-100">
                              <img
                                src={post.url_preview.image}
                                alt={post.url_preview.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <div className="absolute top-2 right-2">
                                <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                  Website
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                  {post.url_preview.favicon || '🌐'}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                                  {post.url_preview.title}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                  {post.url_preview.description}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <span>{post.url_preview.siteName}</span>
                                  <span>•</span>
                                  <span className="truncate">{new URL(post.url_preview.url).hostname}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => window.open(post.url_preview!.url, '_blank')}
                                className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                                title="Visit website"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                    )}
                  </div>

                  {/* Engagement Bar */}
                  <EngagementBar
                    postId={post.id}
                    currentUser={user}
                    commentsCount={postCommentCounts[post.id] || post.comments_count}
                    onCommentClick={() => toggleComments(post.id)}
                    shareUrl={`${window.location.origin}/post/${post.id}`}
                    shareTitle={post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                    shareDescription={`Shared by ${post.full_name} - ${post.job_title} at ${post.company}`}
                    hashtags={['GeeksAndNerds', 'Tech', 'Programming']}
                  />

                  {/* Comments Section */}
                  {expandedComments.has(post.id) && (
                    <CommentSystem
                      postId={post.id}
                      currentUser={user}
                      onCommentCountChange={(count) => handleCommentCountChange(post.id, count)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Onboarding Flow */}
      {showOnboarding && user && (
        <OnboardingFlow
          user={user}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <PostCreator
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          user={user}
        />
      )}

      {/* Messaging System */}
      {showMessaging && user && (
        <MessagingSystem
          currentUserId={user.id}
          onClose={() => setShowMessaging(false)}
        />
      )}

      {/* RSS Feed Manager */}
      {showRSSManager && user && (
        <RSSFeedManager
          user={user}
          onClose={() => setShowRSSManager(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <PostDeleteConfirmation
          postId={showDeleteConfirm}
          postContent={posts.find(p => p.id === showDeleteConfirm)?.content || ''}
          postAuthor={posts.find(p => p.id === showDeleteConfirm)?.full_name || ''}
          onConfirm={handleDeletePost}
          onCancel={() => setShowDeleteConfirm(null)}
          isVisible={true}
        />
      )}

    </div>
  );
}

export default App;