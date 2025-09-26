import React, { useState } from 'react';
import { Trash2, AlertTriangle, X, Loader } from 'lucide-react';

interface PostDeleteConfirmationProps {
  postId: number;
  postContent: string;
  postAuthor: string;
  onConfirm: (postId: number) => Promise<void>;
  onCancel: () => void;
  isVisible: boolean;
}

export const PostDeleteConfirmation: React.FC<PostDeleteConfirmationProps> = ({
  postId,
  postContent,
  postAuthor,
  onConfirm,
  onCancel,
  isVisible
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await onConfirm(postId);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'post_delete', {
          event_category: 'content_management',
          event_label: 'delete_post',
          value: 1
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-900">Delete Post</h3>
                <p className="text-sm text-red-700">This action cannot be undone</p>
              </div>
            </div>
            {!isDeleting && (
              <button
                onClick={onCancel}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-3">
              Are you sure you want to delete this post? This will permanently remove it from your profile and the community feed.
            </p>
            
            {/* Post Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-900">{postAuthor}</span>
                <span className="text-xs text-gray-500">• Your post</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {truncateContent(postContent)}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">This will also remove:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>All comments and replies</li>
                  <li>All likes and reactions</li>
                  <li>Any shared versions of this post</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};