/**
 * Generates an embedded preview URL for various content types
 * @param sourceUrl - Publicly accessible URL to the file (or direct URL for web pages)
 * @param fileType - Optional file extension (e.g., 'pdf', 'docx'). Required for local files
 * @returns Object with preview URL and type
 */
export function getPreviewUrl(
  sourceUrl: string,
  fileType?: string
): { previewUrl: string; type: 'url' | 'pdf' | 'office' } {
  // Validate URL format - allow both HTTP and HTTPS
  if (!sourceUrl.startsWith('http://') && !sourceUrl.startsWith('https://')) {
    throw new Error('Source URL must be a valid HTTP or HTTPS URL');
  }

  // Development environment warning for HTTPS requirement (only for Office docs)
  if (process.env.NODE_ENV !== 'production' && !sourceUrl.startsWith('https://') && !sourceUrl.includes('localhost')) {
    console.warn('⚠️ Office previews may fail without HTTPS (use ngrok for local development)');
  }

  // Handle direct web URLs (no file extension)
  if (!fileType && sourceUrl.startsWith('http')) {
    return { 
      previewUrl: sourceUrl, 
      type: 'url' 
    };
  }

  // Normalize file extension
  const ext = fileType?.toLowerCase().replace('.', '') || 
             sourceUrl.split('.').pop()?.toLowerCase() || '';

  // PDFs use native browser rendering
  if (ext === 'pdf') {
    return { 
      previewUrl: sourceUrl, 
      type: 'pdf' 
    };
  }

  // Office documents use Google Docs Viewer
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) {
    return { 
      previewUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(sourceUrl)}&embedded=true`, 
      type: 'office' 
    };
  }

  // Fallback for unknown types (handle in your UI)
  return { 
    previewUrl: sourceUrl, 
    type: 'url' 
  };
}

/**
 * Validates if a file type is supported for preview
 * @param fileType - File extension to validate
 * @returns boolean indicating if preview is supported
 */
export function isPreviewSupported(fileType: string): boolean {
  const supportedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  const normalizedType = fileType.toLowerCase().replace('.', '');
  return supportedTypes.includes(normalizedType);
}

/**
 * Gets the appropriate iframe sandbox attributes based on preview type
 * @param previewType - Type of preview content
 * @returns string of sandbox attributes
 */
export function getSandboxAttributes(previewType: 'url' | 'pdf' | 'office'): string {
  switch (previewType) {
    case 'pdf':
      return 'allow-same-origin allow-scripts allow-forms';
    case 'office':
      return 'allow-same-origin allow-scripts allow-forms allow-popups';
    case 'url':
    default:
      return 'allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation';
  }
}