import React from 'react';
import { ReactionSystem } from './ReactionSystem';
import { SocialSharing } from './SocialSharing';
import { MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';

interface EngagementBarProps {
  postId: number;
  currentUser: any;
  commentsCount: number;
  onCommentClick: () => void;
  shareUrl: string;
  shareTitle: string;
  shareDescription?: string;
  hashtags?: string[];
  className?: string;
}

export const EngagementBar: React.FC<EngagementBarProps> = ({
  postId,
  currentUser,
  commentsCount,
  onCommentClick,
  shareUrl,
  shareTitle,
  shareDescription,
  hashtags = [],
  className = ''
}) => {
  const handleBookmark = () => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bookmark', {
        event_category: 'engagement',
        event_label: 'save_post',
        value: 1
      });
    }
    
    // In production, save to user's bookmarks
    console.log('Bookmarked post:', postId);
  };

  const handleMoreOptions = () => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'post_options', {
        event_category: 'engagement',
        event_label: 'more_options',
        value: 1
      });
    }
  };

  return (
    <div className={`flex items-center justify-between border-t border-gray-200 pt-4 ${className}`}>
      <div className="flex items-center space-x-6">
        {/* Reactions */}
        <ReactionSystem 
          postId={postId}
          currentUser={currentUser}
        />
        
        {/* Comments */}
        <button
          onClick={onCommentClick}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{commentsCount}</span>
        </button>
        
        {/* Share */}
        <div className="relative">
          <SocialSharing
            url={shareUrl}
            title={shareTitle}
            description={shareDescription}
            hashtags={hashtags}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Bookmark */}
        <button
          onClick={handleBookmark}
          className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
          title="Save post"
        >
          <Bookmark className="w-4 h-4" />
        </button>
        
        {/* More Options */}
        <button
          onClick={handleMoreOptions}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};