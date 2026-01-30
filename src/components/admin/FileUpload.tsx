"use client";

import { useState, useEffect } from 'react';
import { FiUpload, FiFolder, FiFile, FiTrash2, FiRefreshCw } from 'react-icons/fi';

interface FileUploadProps {
  onUpload: (folder: string, fileName: string, file: File) => void;
  isLoading?: boolean;
}

interface MediaFile {
  name: string;
  path: string;
  size: number;
  type: string;
}

export default function FileUpload({ onUpload, isLoading = false }: FileUploadProps) {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const folders = ['works', 'artworks', 'photographs', 'images', 'logos'];

  useEffect(() => {
    if (selectedFolder) {
      loadMediaFiles();
    }
  }, [selectedFolder]);

  const loadMediaFiles = async () => {
    if (!selectedFolder) return;
    
    setIsLoadingFiles(true);
    try {
      const response = await fetch(`/api/admin/media/files?folder=${selectedFolder}`);
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      } else {
        setMediaFiles([]);
      }
    } catch (error) {
      console.error('Failed to load media files:', error);
      setMediaFiles([]);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Set default filename without extension
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      setFileName(nameWithoutExt);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFolder && fileName && selectedFile) {
      // Get the original file extension
      const fileExtension = selectedFile.name.split('.').pop() || '';
      const fullFileName = `${fileName}.${fileExtension}`;
      onUpload(selectedFolder, fullFileName, selectedFile);
      // Reset form and reload files
      setSelectedFile(null);
      setFileName('');
      loadMediaFiles();
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

    try {
      const response = await fetch(`/api/admin/media/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: selectedFolder, fileName }),
      });

      if (response.ok) {
        alert('File deleted successfully!');
        loadMediaFiles(); // Reload the file list
      } else {
        const error = await response.json();
        alert(`Failed to delete file: ${error.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FiUpload className="mr-2" />
          Upload File
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Folder
            </label>
            <div className="relative">
              <FiFolder className="absolute left-3 top-3 text-gray-400" />
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a folder...</option>
                {folders.map((folder) => (
                  <option key={folder} value={folder}>
                    {folder}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose File
            </label>
            <div className="relative">
              <FiFile className="absolute left-3 top-3 text-gray-400" />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-500">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File Name (without extension)
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter file name..."
              required
            />
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-500">
                Will be saved as: <span className="font-mono">{fileName}.{selectedFile.name.split('.').pop()}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !selectedFolder || !fileName || !selectedFile}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Upload File
              </>
            )}
          </button>
        </form>
      </div>

      {selectedFolder && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FiFolder className="mr-2" />
              {selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)} Files
            </h3>
            <button
              onClick={loadMediaFiles}
              disabled={isLoadingFiles}
              className="text-gray-500 hover:text-gray-700 p-2 rounded hover:bg-gray-100"
              title="Refresh files"
            >
              <FiRefreshCw className={isLoadingFiles ? 'animate-spin' : ''} />
            </button>
          </div>

          {isLoadingFiles ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading files...</p>
            </div>
          ) : mediaFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No files found in this folder.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaFiles.map((file) => (
                <div key={file.name} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      title="Delete file"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  {file.type.startsWith('image/') && (
                    <div className="mt-2">
                      <img
                        src={`/${selectedFolder}/${file.name}`}
                        alt={file.name}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
