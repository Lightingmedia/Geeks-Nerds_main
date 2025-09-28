import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, X, Eye } from 'lucide-react';
import { PdfViewer } from './PdfViewer';

interface PDFFile {
  file: File;
  preview: string;
  name: string;
  size: string;
}

interface PDFUploadProps {
  onFileSelect: (file: File) => void;
  onRemove?: () => void;
  selectedFile?: PDFFile | null;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onFileSelect, onRemove, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [modalPdfUrl, setModalPdfUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPreviewOpen && selectedFile) {
      const url = URL.createObjectURL(selectedFile.file);
      setModalPdfUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setModalPdfUrl('');
    }
  }, [isPreviewOpen, selectedFile]);

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
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      onFileSelect(pdfFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    } else if (file) {
      alert('Please select a PDF file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedFile) {
    return (
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.file.size)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                title="Preview PDF"
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

        {/* Inline PDF Preview */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h4 className="text-sm font-medium text-gray-700">PDF Preview</h4>
          </div>
          <PdfViewer file={selectedFile.file} className="h-64" />
        </div>

        {/* Full PDF Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-6xl max-h-[95vh] w-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-[calc(95vh-80px)]">
                {modalPdfUrl && (
                  <iframe
                    src={modalPdfUrl}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  />
                )}
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
          ? 'border-indigo-500 bg-indigo-50'
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
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isDragOver ? 'bg-indigo-100' : 'bg-gray-100'
        }`}>
          <Upload className={`w-8 h-8 ${isDragOver ? 'text-indigo-600' : 'text-gray-400'}`} />
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Upload PDF Document
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop your PDF here, or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Maximum file size: 10MB • PDF files only
          </p>
        </div>
      </div>
    </div>
  );
};