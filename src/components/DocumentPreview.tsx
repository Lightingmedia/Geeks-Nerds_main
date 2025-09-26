import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, Download, AlertCircle, Loader } from 'lucide-react';

interface DocumentPreviewProps {
  file?: File;
  url?: string;
  className?: string;
  title?: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  file, 
  url, 
  className = '', 
  title 
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    const setupPreview = async () => {
      setLoading(true);
      setError(null);

      try {
        if (file) {
          // Check if it's a PDF file
          const fileType = file.type;
          const fileName = file.name.toLowerCase();
          
          if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
            setIsPdf(true);
          }
          
          // Create blob URL for the file
          const objectUrl = URL.createObjectURL(file);
          setPreviewUrl(objectUrl);
          
          // Cleanup function will be called on unmount
          return () => URL.revokeObjectURL(objectUrl);
        } else if (url) {
          // Check if URL points to a PDF
          if (url.toLowerCase().includes('.pdf')) {
            setIsPdf(true);
          }
          setPreviewUrl(url);
        } else {
          throw new Error('Either file or URL must be provided');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    setupPreview();
  }, [file, url]);

  const handleDownload = () => {
    if (file) {
      const downloadUrl = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  const handleOpenInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileName = (): string => {
    if (file) return file.name;
    if (url) return url.split('/').pop() || 'Document';
    return title || 'Document';
  };

  const getFileSize = (): string => {
    if (file) return formatFileSize(file.size);
    return 'Unknown size';
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading document preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6" />
            <div>
              <h3 className="font-medium">{getFileName()}</h3>
              <p className="text-sm text-gray-300">{getFileSize()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Preview Error</h4>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mx-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download File</span>
          </button>
        </div>
      </div>
    );
  }

  if (!previewUrl) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6" />
          <div>
            <h3 className="font-medium">{getFileName()}</h3>
            <p className="text-sm text-gray-300">{getFileSize()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenInNewTab}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="relative">
        {isPdf ? (
          <iframe
            src={previewUrl}
            className="w-full h-96 border-0"
            title={`Preview of ${getFileName()}`}
            onError={() => setError('Failed to load PDF preview')}
          />
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Preview not available for this file type</p>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download to View</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Preview Type Indicator */}
        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {isPdf ? 'PDF' : 'FILE'} Preview
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-4 py-3 text-sm text-gray-600 flex items-center justify-between">
        <p>
          {isPdf ? 'Native browser PDF viewer' : 'File preview'}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={handleOpenInNewTab}
            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};