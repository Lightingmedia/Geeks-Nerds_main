import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText, AlertCircle, Loader, Eye, ZoomIn, ZoomOut, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { trackFileAction } from '../utils/gtm';

interface ResumeViewerProps {
  resumeUrl?: string;
  resumeFile?: File;
  userName: string;
  onBack: () => void;
  className?: string;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  resumeUrl,
  resumeFile,
  userName,
  onBack,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [documentType, setDocumentType] = useState<'pdf' | 'doc' | 'unknown'>('unknown');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'slow'>('online');
  const [retryCount, setRetryCount] = useState(0);
  const [fileSize, setFileSize] = useState<number | null>(null);

  useEffect(() => {
    // Check network connection
    const checkConnection = () => {
      if (!navigator.onLine) {
        setConnectionStatus('offline');
        return;
      }
      
      // Test connection speed with a small image
      const startTime = Date.now();
      const img = new Image();
      img.onload = () => {
        const loadTime = Date.now() - startTime;
        setConnectionStatus(loadTime > 3000 ? 'slow' : 'online');
      };
      img.onerror = () => setConnectionStatus('offline');
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    };

    checkConnection();
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    const loadDocument = async () => {
      setLoading(true);
      setError(null);
      setLoadingProgress(10);

      try {
        let url: string;
        let type: 'pdf' | 'doc' | 'unknown' = 'unknown';

        if (resumeFile) {
          // Handle file upload
          url = URL.createObjectURL(resumeFile);
          setFileSize(resumeFile.size);
          
          // Check file size (warn if > 10MB)
          if (resumeFile.size > 10 * 1024 * 1024) {
            console.warn('Large file detected:', resumeFile.size / 1024 / 1024, 'MB');
          }
          
          type = getDocumentType(resumeFile.name, resumeFile.type);
        } else if (resumeUrl) {
          // Handle URL
          url = resumeUrl;
          type = getDocumentType(resumeUrl);
        } else {
          throw new Error('No resume file or URL provided');
        }

        setLoadingProgress(50);
        setDocumentUrl(url);
        setDocumentType(type);
        
        // Progressive loading simulation
        setLoadingProgress(75);
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoadingProgress(90);
        await new Promise(resolve => setTimeout(resolve, 300));
        setLoadingProgress(100);
        
        setRetryCount(0); // Reset retry count on success
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
      // Cleanup function
      if (resumeFile && documentUrl) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [resumeUrl, resumeFile]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setLoading(true);
    setLoadingProgress(0);
    // Trigger reload by updating a dependency
    window.location.reload();
  };

  const getDocumentType = (fileName: string, mimeType?: string): 'pdf' | 'doc' | 'unknown' => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return 'pdf';
    }
    
    if (mimeType?.includes('document') || 
        extension === 'doc' || 
        extension === 'docx') {
      return 'doc';
    }
    
    return 'unknown';
  };

  const handleDownload = () => {
    if (!documentUrl) return;

    // Track download via GTM
    trackFileAction('download', documentType, selectedResume?.file?.name || 'resume.pdf', selectedResume?.file?.size);

    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = resumeFile?.name || `${userName}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  const handleOpenInNewTab = () => {
    // Track file view via GTM
    trackFileAction('view', documentType, selectedResume?.file?.name || 'resume.pdf');
    
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  const adjustZoom = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Connection Status */}
            {connectionStatus !== 'online' && (
              <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                connectionStatus === 'offline' 
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              }`}>
                {connectionStatus === 'offline' ? (
                  <WifiOff className="w-4 h-4" />
                ) : (
                  <Wifi className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {connectionStatus === 'offline' 
                    ? 'No internet connection detected'
                    : 'Slow connection detected - loading may take longer'
                  }
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-center h-96">
              <div className="text-center max-w-md">
                <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Resume</h3>
                <p className="text-gray-600 mb-4">Please wait while we prepare the document...</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                
                {fileSize && (
                  <p className="text-sm text-gray-500">
                    File size: {formatFileSize(fileSize)}
                    {fileSize > 5 * 1024 * 1024 && (
                      <span className="text-yellow-600 ml-2">
                        (Large file - may take longer to load)
                      </span>
                    )}
                  </p>
                )}
                
                {retryCount > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Retry attempt: {retryCount}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                
                {/* Connection-specific error messages */}
                {connectionStatus === 'offline' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <WifiOff className="w-5 h-5 text-red-600 mx-auto mb-2" />
                    <p className="text-red-700 text-sm">No internet connection</p>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Resume</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="space-x-3">
                  <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleRetry}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {userName}'s Resume
                  </h1>
                  <p className="text-sm text-gray-500">
                    {documentType.toUpperCase()} Document
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => adjustZoom(-10)}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium px-2">{zoom}%</span>
                <button
                  onClick={() => adjustZoom(10)}
                  className="p-2 hover:bg-white rounded transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleOpenInNewTab}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              {/* Retry button for loading issues */}
              {(connectionStatus !== 'online' || retryCount > 0) && (
                <button
                  onClick={handleRetry}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  title="Retry loading document"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            {documentType === 'pdf' && documentUrl ? (
              <div className="w-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                {/* Loading overlay for iframe */}
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10" id="pdf-loading">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-600" />
                    <p className="text-sm text-gray-600">Loading PDF...</p>
                  </div>
                </div>
                
                <iframe
                  src={`${documentUrl}#toolbar=1&navpanes=1&scrollbar=1&zoom=page-fit&view=FitH`}
                  className="w-full h-screen border-0"
                  title={`${userName}'s Resume`}
                  onLoad={() => {
                    setLoading(false);
                    // Hide loading overlay
                    const loadingEl = document.getElementById('pdf-loading');
                    if (loadingEl) loadingEl.style.display = 'none';
                  }}
                  onError={() => {
                    setError('Failed to load PDF document. This may be due to file corruption or network issues.');
                    // Hide loading overlay
                    const loadingEl = document.getElementById('pdf-loading');
                    if (loadingEl) loadingEl.style.display = 'none';
                  }}
                />
              </div>
            ) : documentType === 'doc' && documentUrl ? (
              <div className="w-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                {/* Loading overlay for Google Docs viewer */}
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10" id="doc-loading">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-600" />
                    <p className="text-sm text-gray-600">Loading document via Google Docs...</p>
                  </div>
                </div>
                
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
                  className="w-full h-screen border-0"
                  title={`${userName}'s Resume`}
                  onLoad={() => {
                    setLoading(false);
                    // Hide loading overlay
                    const loadingEl = document.getElementById('doc-loading');
                    if (loadingEl) loadingEl.style.display = 'none';
                  }}
                  onError={() => {
                    setError('Failed to load document via Google Docs viewer. Please try downloading the file instead.');
                    // Hide loading overlay
                    const loadingEl = document.getElementById('doc-loading');
                    if (loadingEl) loadingEl.style.display = 'none';
                  }}
                  style={{ 
                    minHeight: '600px',
                    backgroundColor: 'white'
                  }}
                />
              </div>
            ) : (
              // Fallback for unknown document types
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Preview not available for this document type</p>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Download to View
                  </button>
                </div>
              </div>
            )}
            
            {/* Fallback for unsupported formats */}
            {error && (
              <div className="absolute inset-0 w-full h-96 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Preview not available</p>
                  <p className="text-sm text-gray-500 mb-4">{error}</p>
                  <p className="text-gray-600 mb-4">
                    This document format may not support inline preview
                  </p>
                  <div className="space-x-3">
                    <button
                      onClick={handleOpenInNewTab}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Open Document
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Info */}
        {/* Performance Tips */}
        {((fileSize && fileSize > 5 * 1024 * 1024) || connectionStatus === 'slow') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg mt-6 p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Performance Tips</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {fileSize && fileSize > 5 * 1024 * 1024 && (
                <li>• Large file detected - consider compressing your resume to improve loading speed</li>
              )}
              {connectionStatus === 'slow' && (
                <li>• Slow connection detected - try switching to a faster network if available</li>
              )}
              <li>• If loading fails, try refreshing the page or downloading the file directly</li>
              <li>• For best performance, use PDF format and keep file size under 5MB</li>
            </ul>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Owner:</span>
              <p className="text-gray-600">{userName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type:</span>
              <p className="text-gray-600">{documentType.toUpperCase()} Document</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Size:</span>
              <p className="text-gray-600">
                {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
                {resumeFile && resumeFile.size > 5 * 1024 * 1024 && (
                  <span className="text-yellow-600 text-xs ml-2">
                    (Large file)
                  </span>
                )}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Connection:</span>
              <p className={`text-sm ${
                connectionStatus === 'online' ? 'text-green-600' : 
                connectionStatus === 'slow' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {connectionStatus === 'online' ? '✓ Good' : 
                 connectionStatus === 'slow' ? '⚠ Slow' : '✗ Offline'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};