import React, { useState, useEffect } from 'react';
import { Link, ExternalLink, Image, FileText, Globe, Loader, AlertCircle, X } from 'lucide-react';

interface URLPreview {
  url: string;
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  isValid: boolean;
  error?: string;
}

interface URLEmbedderProps {
  onEmbed: (preview: URLPreview) => void;
  onCancel: () => void;
  className?: string;
}

export const URLEmbedder: React.FC<URLEmbedderProps> = ({ onEmbed, onCancel, className = '' }) => {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<URLPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock URL preview generation (in production, this would call a backend service)
  const generatePreview = async (inputUrl: string): Promise<URLPreview> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate URL format
    try {
      const urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      const domain = urlObj.hostname;

      // Mock different website types for demonstration
      const mockPreviews: Record<string, Partial<URLPreview>> = {
        'github.com': {
          title: 'GitHub - Where the world builds software',
          description: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage Git repositories, and review code.',
          image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
          siteName: 'GitHub',
          favicon: '🐙'
        },
        'stackoverflow.com': {
          title: 'Stack Overflow - Where Developers Learn, Share, & Build Careers',
          description: 'Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
          siteName: 'Stack Overflow',
          favicon: '📚'
        },
        'medium.com': {
          title: 'Medium – Where good ideas find you',
          description: 'Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.',
          image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
          siteName: 'Medium',
          favicon: '✍️'
        },
        'dev.to': {
          title: 'DEV Community - A constructive and inclusive social network for software developers',
          description: 'Where programmers share ideas and help each other grow. It is an online community for sharing and discovering great ideas, having debates, and making friends.',
          image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
          siteName: 'DEV Community',
          favicon: '👩‍💻'
        }
      };

      // Find matching preview or create generic one
      const matchedPreview = Object.entries(mockPreviews).find(([key]) => 
        domain.includes(key)
      )?.[1];

      if (matchedPreview) {
        return {
          url: urlObj.toString(),
          title: matchedPreview.title || 'Website',
          description: matchedPreview.description || 'Check out this website',
          image: matchedPreview.image,
          siteName: matchedPreview.siteName || domain,
          favicon: matchedPreview.favicon || '🌐',
          isValid: true
        };
      }

      // Generic preview for unknown domains
      return {
        url: urlObj.toString(),
        title: `Visit ${domain}`,
        description: `Discover content and resources on ${domain}`,
        image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
        siteName: domain,
        favicon: '🌐',
        isValid: true
      };

    } catch (err) {
      throw new Error('Invalid URL format. Please enter a valid website URL.');
    }
  };

  const handlePreviewGeneration = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const previewData = await generatePreview(url.trim());
      setPreview(previewData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEmbed = () => {
    if (preview) {
      onEmbed(preview);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handlePreviewGeneration();
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Link className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Embed Website</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* URL Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com or example.com"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              onClick={handlePreviewGeneration}
              disabled={!url.trim() || loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Preview</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Preview Card */}
        {preview && (
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Preview Image */}
            {preview.image && (
              <div className="relative h-48 bg-gray-100">
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    Preview
                  </span>
                </div>
              </div>
            )}

            {/* Preview Content */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    {preview.favicon || '🌐'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {preview.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                    {preview.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{preview.siteName}</span>
                    <span>•</span>
                    <span className="truncate">{new URL(preview.url).hostname}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {preview && (
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEmbed}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Embed Website
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="mb-1">💡 <strong>Tip:</strong> You can embed any website URL to showcase:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Your portfolio or personal website</li>
            <li>Open source projects on GitHub</li>
            <li>Blog posts and articles</li>
            <li>Product launches and announcements</li>
            <li>Useful tools and resources</li>
          </ul>
        </div>
      </div>
    </div>
  );
};