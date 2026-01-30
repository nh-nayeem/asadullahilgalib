"use client";

import { useState, useEffect } from 'react';
import { FiSettings, FiUsers, FiFileText, FiImage, FiMail, FiBarChart2, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

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

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'content', label: 'Content', icon: FiFileText },
    { id: 'media', label: 'Media', icon: FiImage },
    { id: 'messages', label: 'Messages', icon: FiMail },
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <FiUsers className="text-3xl text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">567</p>
                  </div>
                  <FiFileText className="text-3xl text-green-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Media Files</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                  <FiImage className="text-3xl text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Messages</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                  <FiMail className="text-3xl text-red-500" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">All Users</h3>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 text-gray-600">Name</th>
                        <th className="pb-3 text-gray-600">Email</th>
                        <th className="pb-3 text-gray-600">Role</th>
                        <th className="pb-3 text-gray-600">Status</th>
                        <th className="pb-3 text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">John Doe</td>
                        <td className="py-3">john@example.com</td>
                        <td className="py-3">Admin</td>
                        <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span></td>
                        <td className="py-3">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Jane Smith</td>
                        <td className="py-3">jane@example.com</td>
                        <td className="py-3">User</td>
                        <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span></td>
                        <td className="py-3">
                          <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                          <button className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Content Management</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">All Content</h3>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Create New
                </button>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Sample Blog Post</h4>
                  <p className="text-gray-600 text-sm mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last updated: 2 hours ago</span>
                    <div>
                      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                      <button className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'media':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Media Library</h2>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload Files</h3>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                  Upload
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <FiImage className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm">image1.jpg</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <FiImage className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm">image2.jpg</p>
                </div>
              </div>
            </div>
          </div>
        );
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