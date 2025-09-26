import React from 'react';
import { DocumentPreview } from './DocumentPreview';

interface PdfViewerProps {
  file: File;
  className?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ file, className = '' }) => {
  return (
    <div className={className}>
      <iframe
        src={URL.createObjectURL(file)}
        className="w-full h-full border-0"
        title="PDF Preview"
      />
    </div>
  );
};