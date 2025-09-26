import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Eye, User, Briefcase } from 'lucide-react';

interface ResumeFile {
  file: File;
  preview: string;
  name: string;
  size: string;
}

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  onRemove?: () => void;
  selectedFile?: ResumeFile | null;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onFileSelect, onRemove, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const resumeFile = files.find(file => 
      file.type === 'application/pdf' || 
      file.type.includes('document') ||
      file.name.toLowerCase().endsWith('.pdf') ||
      file.name.toLowerCase().endsWith('.doc') ||
      file.name.toLowerCase().endsWith('.docx')
    );
    
    if (resumeFile) {
      onFileSelect(resumeFile);
    } else {
      alert('Please select a PDF, DOC, or DOCX file for your resume');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidType = file.type === 'application/pdf' || 
                         file.type.includes('document') ||
                         file.name.toLowerCase().endsWith('.pdf') ||
                         file.name.toLowerCase().endsWith('.doc') ||
                         file.name.toLowerCase().endsWith('.docx');
      
      if (isValidType) {
        onFileSelect(file);
      } else {
        alert('Please select a PDF, DOC, or DOCX file for your resume');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedFile) {
    return (
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{selectedFile.size} • Resume/CV</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-100"
                title="Preview resume"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={onRemove}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Inline Resume Preview */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2 border-b flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-medium text-blue-900">Resume Preview</h4>
          </div>
          <div className="h-64 bg-white">
            <iframe
              src={URL.createObjectURL(selectedFile.file)}
              className="w-full h-full border-0"
              title="Resume Preview"
            />
          </div>
        </div>

        {/* Full Resume Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] w-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>{selectedFile.name}</span>
                </h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-[calc(95vh-80px)]">
                <iframe
                  src={URL.createObjectURL(selectedFile.file)}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
        isDragOver
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDragOver ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Briefcase className={`w-8 h-8 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Upload Your Resume/CV
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop your resume here, or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supports PDF, DOC, DOCX • Maximum file size: 10MB
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>PDF</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>DOC</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>DOCX</span>
          </div>
        </div>
      </div>
    </div>
  );
};