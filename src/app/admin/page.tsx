"use client";

import { useState, useEffect } from 'react';
import { FiSettings, FiFileText, FiImage, FiMail, FiBarChart2, FiLogOut, FiMenu, FiX, FiTool } from 'react-icons/fi';
import LoginForm from '@/components/admin/LoginForm';
import FileUpload from '@/components/admin/FileUpload';
import ContentManager from '@/components/admin/ContentManager';
import Utilities from '@/components/admin/Utilities';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stats, setStats] = useState({ totalContent: 0, totalMedia: 0, totalMessages: 45 });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch content stats
      const sections = ['works', 'artworks', 'photographs', 'works-home', 'artworks-home', 'photographs-home', 'shorts-home'];
      let totalContent = 0;
      
      for (const section of sections) {
        try {
          const filePath = section.includes('-home') 
            ? `/content/${section.replace('-', '_')}.json`
            : `/content/${section}.json`;
          const response = await fetch(filePath);
          if (response.ok) {
            const data = await response.json();
            totalContent += Array.isArray(data) ? data.length : 0;
          }
        } catch (error) {
          console.log(`Failed to load ${section} content`);
        }
      }

      // Fetch media files count
      const mediaResponse = await fetch('/api/admin/stats/media');
      const mediaData = mediaResponse.ok ? await mediaResponse.json() : { count: 0 };

      setStats({
        totalContent,
        totalMedia: mediaData.count || 0,
        totalMessages: 45, // This could be fetched from a messages API later
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleFileUpload = async (folder: string, fileName: string, file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('fileName', fileName);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        if (data.gitError) {
          // Specific GitHub error
          alert(`${data.message}\n\nPlease check your GitHub environment variables:\n- GITHUB_TOKEN\n- GITHUB_REPO\n- GITHUB_BRANCH\n\nCheck Vercel logs for more details.`);
        } else {
          alert(`Failed to upload file: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpdate = async (folder: string, fileName: string, file: File) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('fileName', fileName);

      // Use the same upload endpoint - GitHub API handles both create and update
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert('File updated successfully!');
      } else {
        if (data.gitError) {
          // Specific GitHub error
          alert(`${data.message}\n\nPlease check your GitHub environment variables:\n- GITHUB_TOKEN\n- GITHUB_REPO\n- GITHUB_BRANCH\n\nCheck Vercel logs for more details.`);
        } else {
          alert(`Failed to update file: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating file. Please check your connection and try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleContentUpdate = async (section: string, content: any[]) => {
    console.log(`Updated ${section} content:`, content);
  };

  const checkEnvironment = async () => {
    try {
      const response = await fetch('/api/admin/debug/env');
      if (response.ok) {
        const data = await response.json();
        console.log('Environment Debug:', data);
        alert(`Environment Check:\n\nNODE_ENV: ${data.NODE_ENV}\nGitHub Token: ${data.hasGitHubToken ? '✓ Set' : '✗ Missing'}\nGitHub Repo: ${data.gitHubRepo || 'Not set'}\nGitHub Branch: ${data.gitHubBranch || 'Not set'}\nRepo Format: ${data.repoFormat}\n\nCheck console for details.`);
      } else {
        alert('Failed to check environment');
      }
    } catch (error) {
      console.error('Environment check error:', error);
      alert('Error checking environment');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { id: 'content', label: 'Content', icon: FiFileText },
    { id: 'media', label: 'Media', icon: FiImage },
    { id: 'messages', label: 'Messages', icon: FiMail },
    { id: 'utilities', label: 'Utilities', icon: FiTool },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Content</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
                  </div>
                  <FiFileText className="text-3xl text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Media Files</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMedia}</p>
                  </div>
                  <FiImage className="text-3xl text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
                  </div>
                  <FiMail className="text-3xl text-red-500" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Content Management</h2>
            <ContentManager onUpdate={handleContentUpdate} />
          </div>
        );
      case 'media':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Media Library</h2>
            <FileUpload 
              onUpload={handleFileUpload} 
              onUpdate={handleFileUpdate}
              isLoading={isUploading} 
              isUpdating={isUpdating} 
            />
          </div>
        );
      case 'utilities':
        return <Utilities />;
      case 'messages':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Messages</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Contact Form Message</h4>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">From: user@example.com</p>
                  <p className="text-gray-700">Hello, I have a question about your services...</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Environment Debug</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Check if your GitHub environment variables are properly configured for production.
                </p>
                <button
                  onClick={checkEnvironment}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Check Environment Variables
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="Admin Panel" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" defaultValue="admin@example.com" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="ml-4 text-2xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin User</span>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleLogout}>
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white shadow-md border-r border-gray-200 overflow-hidden`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}