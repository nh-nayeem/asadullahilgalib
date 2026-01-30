"use client";

import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

interface ContentItem {
  title: string;
  year: string;
  role: string;
  image: string;
  videoLink?: string;
  category: string;
  description: string;
}

interface ContentManagerProps {
  onUpdate: (section: string, content: ContentItem[]) => void;
}

const sections = ['works', 'artworks', 'photographs'];

const workCategories = ['shorts', 'filmography', 'direction'];

export default function ContentManager({ onUpdate }: ContentManagerProps) {
  const [selectedSection, setSelectedSection] = useState('');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<ContentItem>({
    title: '',
    year: '',
    role: '',
    image: '',
    videoLink: '',
    category: 'shorts',
    description: '',
  });

  useEffect(() => {
    if (selectedSection) {
      loadContent(selectedSection);
    }
  }, [selectedSection]);

  const loadContent = async (section: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/${section}/${section}.json`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        setContent([]);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      setContent([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: selectedSection, content }),
      });

      if (response.ok) {
        onUpdate(selectedSection, content);
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving content');
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleUpdateItem = (index: number, field: keyof ContentItem, value: string) => {
    const updatedContent = [...content];
    updatedContent[index] = { ...updatedContent[index], [field]: value };
    setContent(updatedContent);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedContent = content.filter((_, i) => i !== index);
      setContent(updatedContent);
    }
  };

  const handleAddItem = () => {
    if (newItem.title && newItem.year && newItem.role) {
      setContent([...content, { ...newItem }]);
      setNewItem({
        title: '',
        year: '',
        role: '',
        image: '',
        videoLink: '',
        category: 'shorts',
        description: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Content Management</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a section...</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {selectedSection && (
          <>
            {/* Add New Form - Always Visible */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h4 className="font-semibold mb-4">Add New Content</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={newItem.year}
                  onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Year"
                />
                <input
                  type="text"
                  value={newItem.role}
                  onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Role"
                />
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Image URL"
                />
                {selectedSection === 'works' && (
                  <>
                    <input
                      type="text"
                      value={newItem.videoLink}
                      onChange={(e) => setNewItem({ ...newItem, videoLink: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                      placeholder="Video Link"
                    />
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                    >
                      {workCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded md:col-span-2 bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Description"
                  rows={2}
                />
                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={handleAddItem}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Add Content
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">
                {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} Content
              </h4>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading content...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {content.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {editingIndex === index ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => handleUpdateItem(index, 'year', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => handleUpdateItem(index, 'role', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="Role"
                        />
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => handleUpdateItem(index, 'image', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="Image URL"
                        />
                        {selectedSection === 'works' && (
                          <>
                            <input
                              type="text"
                              value={item.videoLink || ''}
                              onChange={(e) => handleUpdateItem(index, 'videoLink', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 placeholder:text-gray-400"
                              placeholder="Video Link"
                            />
                            <select
                              value={item.category}
                              onChange={(e) => handleUpdateItem(index, 'category', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
                            >
                              {workCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                              ))}
                            </select>
                          </>
                        )}
                        <textarea
                          value={item.description}
                          onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded md:col-span-2 bg-white text-gray-900 placeholder:text-gray-400"
                          placeholder="Description"
                          rows={2}
                        />
                        <div className="md:col-span-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                          >
                            <FiX className="mr-2" />
                            Cancel
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                          >
                            <FiSave className="mr-2" />
                            Done
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold">{item.title}</h5>
                          <p className="text-sm text-gray-600">
                            {item.year} • {item.role} • {item.category}
                          </p>
                          {item.description && (
                            <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {content.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No content found. Click "Add New" to create content.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
