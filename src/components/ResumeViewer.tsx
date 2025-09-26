import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText, AlertCircle, Loader, Eye, ZoomIn, ZoomOut } from 'lucide-react';

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

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        let url: string;
        let type: 'pdf' | 'doc' | 'unknown' = 'unknown';

        if (resumeFile) {
          // Handle file upload
          url = URL.createObjectURL(resumeFile);
          type = getDocumentType(resumeFile.name, resumeFile.type);
        } else if (resumeUrl) {
          // Handle URL
          url = resumeUrl;
          type = getDocumentType(resumeUrl);
        } else {
          throw new Error('No resume file or URL provided');
        }

        setDocumentUrl(url);
        setDocumentType(type);
        
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resume');
      } finally {
        setLoading(false);
      }
    };

    loadDocument();

    // Cleanup function
    return () => {
      if (resumeFile && documentUrl) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [resumeUrl, resumeFile]);

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

    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = resumeFile?.name || `${userName}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'download_resume',
        value: 1
      });
    }
  };

  const handleOpenInNewTab = () => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  const adjustZoom = (delta: number) => {
    setZoom(prev => Math.max(50, Math.min(200, prev + delta)));
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Resume</h3>
                <p className="text-gray-600">Please wait while we prepare the document...</p>
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
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Try Again
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
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            {documentType === 'pdf' && documentUrl ? (
              <div className="w-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <iframe
                  src={documentUrl}
                  className="w-full h-screen border-0"
                  title={`${userName}'s Resume`}
                  onLoad={() => setLoading(false)}
                  onError={() => setError('Failed to load PDF document')}
                />
              </div>
            ) : documentType === 'doc' && documentUrl ? (
              <div className="w-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
                  className="w-full h-screen border-0"
                  title={`${userName}'s Resume`}
                  onLoad={() => setLoading(false)}
                  onError={() => setError('Failed to load document')}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Preview</h3>
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};