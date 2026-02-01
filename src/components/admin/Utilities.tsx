"use client";

import { useState } from 'react';
import { FiTool, FiYoutube, FiLink, FiCopy, FiCheck } from 'react-icons/fi';

export default function Utilities() {
  // Thumbnail tool states
  const [thumbnailYoutubeLink, setThumbnailYoutubeLink] = useState('');
  const [thumbnailVideoId, setThumbnailVideoId] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  
  // Video ID tool states
  const [videoIdYoutubeLink, setVideoIdYoutubeLink] = useState('');
  const [extractedVideoId, setExtractedVideoId] = useState('');
  
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    if (!url) return '';
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return '';
  };

  // Generate thumbnail URL from video ID
  const generateThumbnailUrl = (videoId: string) => {
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Handle YouTube link processing for thumbnail tool
  const handleThumbnailLinkChange = (url: string) => {
    setThumbnailYoutubeLink(url);
    const id = extractVideoId(url);
    setThumbnailVideoId(id);
    setThumbnailUrl(generateThumbnailUrl(id));
  };

  // Handle YouTube link processing for video ID tool
  const handleVideoIdLinkChange = (url: string) => {
    setVideoIdYoutubeLink(url);
    const id = extractVideoId(url);
    setExtractedVideoId(id);
  };

  // Copy to clipboard functionality
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [key]: true });
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Utilities</h2>
      
      {/* YouTube Thumbnail Extractor */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FiYoutube className="text-red-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-black">YouTube Thumbnail Extractor</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video Link
            </label>
            <input
              type="text"
              value={thumbnailYoutubeLink}
              onChange={(e) => handleThumbnailLinkChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {thumbnailUrl && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={thumbnailUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                  <button
                    onClick={() => copyToClipboard(thumbnailUrl, 'thumbnail')}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Copy URL"
                  >
                    {copiedStates['thumbnail'] ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Preview
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden max-w-md">
                  <img
                    src={thumbnailUrl}
                    alt="YouTube thumbnail"
                    className="w-full h-auto"
                    onError={(e) => {
                      // Fallback to lower quality thumbnail if maxresdefault fails
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${thumbnailVideoId}/hqdefault.jpg`;
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* YouTube Video ID Extractor */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FiLink className="text-blue-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-black">YouTube Video ID Extractor</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video Link
            </label>
            <input
              type="text"
              value={videoIdYoutubeLink}
              onChange={(e) => handleVideoIdLinkChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {extractedVideoId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video ID
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={extractedVideoId}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
                <button
                  onClick={() => copyToClipboard(extractedVideoId, 'videoId')}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  title="Copy Video ID"
                >
                  {copiedStates['videoId'] ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
              
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Supported formats:</strong>
                </p>
                <ul className="text-sm text-gray-500 mt-1 space-y-1">
                  <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                  <li>• https://youtu.be/VIDEO_ID</li>
                  <li>• https://www.youtube.com/embed/VIDEO_ID</li>
                  <li>• https://www.youtube.com/shorts/VIDEO_ID</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Tools Section (for future expansion) */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FiTool className="text-gray-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold">More Tools</h3>
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <FiTool className="mx-auto mb-2" size={48} />
          <p>More utilities will be added here soon...</p>
        </div>
      </div>
    </div>
  );
}
