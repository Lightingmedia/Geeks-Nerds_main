import React, { useState } from 'react';
import { X, Code, FileText, Image, Folder, FolderOpen, Link } from 'lucide-react';
import { PDFUpload } from './PDFUpload';
import { URLEmbedder } from './URLEmbedder';

interface PostCreatorProps {
  onClose: () => void;
  onSubmit: (post: any) => void;
  user: any;
}

interface PDFFile {
  file: File;
  preview: string;
  name: string;
  size: string;
}

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

export const PostCreator: React.FC<PostCreatorProps> = ({ onClose, onSubmit, user }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'code' | 'photo' | 'document' | 'url'>('text');
  const [content, setContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [selectedPDF, setSelectedPDF] = useState<PDFFile | null>(null);
  const [urlPreview, setUrlPreview] = useState<URLPreview | null>(null);
  const [showURLEmbedder, setShowURLEmbedder] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePDFSelect = (file: File) => {
    const preview = URL.createObjectURL(file);
    setSelectedPDF({
      file,
      preview,
      name: file.name,
      size: formatFileSize(file.size)
    });
  };

  const handleURLEmbed = (preview: URLPreview) => {
    setUrlPreview(preview);
    setShowURLEmbedder(false);
  };

  const handleURLRemove = () => {
    setUrlPreview(null);
  };

  const handlePDFRemove = () => {
    if (selectedPDF) {
      URL.revokeObjectURL(selectedPDF.preview);
      setSelectedPDF(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !selectedPDF && !urlPreview) return;

    const post = {
      id: Date.now(),
      user_id: user.id,
      content: content.trim(),
      post_type: activeTab,
      code_language: activeTab === 'code' ? codeLanguage : undefined,
      document_name: selectedPDF?.name || undefined,
      document_url: selectedPDF ? URL.createObjectURL(selectedPDF.file) : undefined,
      url_preview: urlPreview || undefined,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      full_name: user.full_name,
      profile_picture: user.profile_picture,
      job_title: user.job_title || '',
      company: user.company || ''
    };

    onSubmit(post);
    setContent('');
    setSelectedPDF(null);
    onClose();
  };

  const tabs = [
    { id: 'text', label: 'Text', icon: FileText, color: 'text-gray-600' },
    { id: 'code', label: 'Code', icon: Code, color: 'text-green-600' },
    { id: 'photo', label: 'Project', icon: Image, color: 'text-purple-600' },
    { id: 'document', label: 'Document', icon: FolderOpen, color: 'text-orange-600' },
    { id: 'url', label: 'Website', icon: Link, color: 'text-blue-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user?.profile_picture}
              alt={user?.full_name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Share your thoughts, code, or projects...</h3>
              <p className="text-sm text-gray-500">Posting as {user?.full_name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : tab.color}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {activeTab === 'code' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <select
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="sql">SQL</option>
              </select>
            </div>
          )}

          {activeTab === 'document' ? (
            <div className="space-y-4">
              <PDFUpload
                onFileSelect={handlePDFSelect}
                onRemove={handlePDFRemove}
                selectedFile={selectedPDF}
              />
              {selectedPDF && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add a description (optional)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell us about this document..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows={3}
                  />
                </div>
              )}
            </div>
          ) : activeTab === 'url' ? (
            <div className="space-y-4">
              {!urlPreview && !showURLEmbedder && (
                <div className="text-center py-8">
                  <Link className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Share a Website</h3>
                  <p className="text-gray-600 mb-4">
                    Embed any website URL to showcase projects, articles, or resources
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowURLEmbedder(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Website URL
                  </button>
                </div>
              )}
              
              {showURLEmbedder && (
                <URLEmbedder
                  onEmbed={handleURLEmbed}
                  onCancel={() => setShowURLEmbedder(false)}
                />
              )}
              
              {urlPreview && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {urlPreview.image && (
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={urlPreview.image}
                          alt={urlPreview.title}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleURLRemove}
                          className="absolute top-2 right-2 p-1 bg-black bg-opacity-75 text-white rounded-full hover:bg-opacity-90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                            {urlPreview.favicon || '🌐'}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {urlPreview.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {urlPreview.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {urlPreview.siteName} • {new URL(urlPreview.url).hostname}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add a description (optional)
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Tell us about this website..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  activeTab === 'code'
                    ? 'Paste your code here...'
                    : activeTab === 'photo'
                    ? 'Share your project and tell us about it...'
                    : "What's on your mind?"
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={activeTab === 'code' ? 12 : 6}
                required={activeTab !== 'document'}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() && !selectedPDF && !urlPreview}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {activeTab === 'document' && selectedPDF 
                ? 'Share Document' 
                : activeTab === 'url' && urlPreview 
                ? 'Share Website' 
                : 'Share Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};