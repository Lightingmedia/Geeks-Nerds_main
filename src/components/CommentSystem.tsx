import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Reply, Flag, MoreHorizontal, Trash2, CreditCard as Edit3, Check, X } from 'lucide-react';

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  parent_id?: number;
  content: string;
  created_at: string;
  updated_at?: string;
  likes_count: number;
  is_edited: boolean;
  is_flagged: boolean;
  user: {
    id: number;
    full_name: string;
    profile_picture: string;
    job_title: string;
    company: string;
  };
  replies?: Comment[];
}

interface CommentSystemProps {
  postId: number;
  currentUser: any;
  onCommentCountChange: (count: number) => void;
}

export const CommentSystem: React.FC<CommentSystemProps> = ({ 
  postId, 
  currentUser, 
  onCommentCountChange 
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState<number | null>(null);

  // Mock comments data - In production, fetch from API
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: 1,
        post_id: postId,
        user_id: 2,
        content: "Great explanation! This really helped me understand the concept better. I've been struggling with this for weeks.",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes_count: 5,
        is_edited: false,
        is_flagged: false,
        user: {
          id: 2,
          full_name: 'Sarah Johnson',
          profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          job_title: 'Full Stack Engineer',
          company: 'Google'
        },
        replies: [
          {
            id: 3,
            post_id: postId,
            user_id: 1,
            parent_id: 1,
            content: "Glad it helped! Feel free to ask if you have any other questions.",
            created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
            likes_count: 2,
            is_edited: false,
            is_flagged: false,
            user: {
              id: 1,
              full_name: 'Alex Chen',
              profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              job_title: 'Senior Frontend Developer',
              company: 'Meta'
            }
          }
        ]
      },
      {
        id: 2,
        post_id: postId,
        user_id: 3,
        content: "This is exactly what I needed for my current project. Thanks for sharing!",
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        likes_count: 3,
        is_edited: false,
        is_flagged: false,
        user: {
          id: 3,
          full_name: 'Marcus Rodriguez',
          profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          job_title: 'DevOps Engineer',
          company: 'Microsoft'
        }
      }
    ];
    
    setComments(mockComments);
    
    // Calculate total comment count including replies
    const totalCount = mockComments.reduce((count, comment) => {
      return count + 1 + (comment.replies?.length || 0);
    }, 0);
    
    onCommentCountChange(totalCount);
  }, [postId, onCommentCountChange]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setLoading(true);
    
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comment_post', {
        event_category: 'engagement',
        event_label: 'new_comment',
        value: 1
      });
    }

    const comment: Comment = {
      id: Date.now(),
      post_id: postId,
      user_id: currentUser.id,
      content: newComment.trim(),
      created_at: new Date().toISOString(),
      likes_count: 0,
      is_edited: false,
      is_flagged: false,
      user: {
        id: currentUser.id,
        full_name: currentUser.full_name,
        profile_picture: currentUser.profile_picture,
        job_title: currentUser.job_title || '',
        company: currentUser.company || ''
      }
    };

    setComments([...comments, comment]);
    setNewComment('');
    setLoading(false);
    
    // Update comment count
    onCommentCountChange(comments.length + 1);
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim() || !currentUser) return;

    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comment_reply', {
        event_category: 'engagement',
        event_label: 'reply_to_comment',
        value: 1
      });
    }

    const reply: Comment = {
      id: Date.now(),
      post_id: postId,
      user_id: currentUser.id,
      parent_id: parentId,
      content: replyContent.trim(),
      created_at: new Date().toISOString(),
      likes_count: 0,
      is_edited: false,
      is_flagged: false,
      user: {
        id: currentUser.id,
        full_name: currentUser.full_name,
        profile_picture: currentUser.profile_picture,
        job_title: currentUser.job_title || '',
        company: currentUser.company || ''
      }
    };

    setComments(comments.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleLikeComment = async (commentId: number, isReply: boolean = false, parentId?: number) => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comment_like', {
        event_category: 'engagement',
        event_label: isReply ? 'like_reply' : 'like_comment',
        value: 1
      });
    }

    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes_count: reply.likes_count + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes_count: comment.likes_count + 1 }
          : comment
      ));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comment_delete', {
        event_category: 'engagement',
        event_label: 'delete_comment',
        value: 1
      });
    }

    setComments(comments.filter(comment => comment.id !== commentId));
    onCommentCountChange(comments.length - 1);
  };

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) return;

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            content: editContent.trim(),
            is_edited: true,
            updated_at: new Date().toISOString()
          }
        : comment
    ));
    
    setEditingComment(null);
    setEditContent('');
  };

  const handleReportComment = async (commentId: number, reason: string) => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'comment_report', {
        event_category: 'moderation',
        event_label: reason,
        value: 1
      });
    }

    // In production, send to moderation API
    console.log(`Reported comment ${commentId} for: ${reason}`);
    setShowReportModal(null);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const renderComment = (comment: Comment, isReply: boolean = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-3' : 'mb-6'}`}>
      <div className="flex space-x-3">
        <img
          src={comment.user.profile_picture}
          alt={comment.user.full_name}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-gray-900">{comment.user.full_name}</h4>
                <span className="text-xs text-gray-500">
                  {comment.user.job_title} at {comment.user.company}
                </span>
              </div>
              {currentUser && currentUser.id === comment.user.id && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setEditingComment(comment.id);
                      setEditContent(comment.content);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    title="Edit comment"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded"
                    title="Delete comment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            
            {editingComment === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700"
                  >
                    <Check className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingComment(null);
                      setEditContent('');
                    }}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-400"
                  >
                    <X className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-900 leading-relaxed">{comment.content}</p>
                {comment.is_edited && (
                  <p className="text-xs text-gray-400 mt-1">Edited</p>
                )}
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>{formatTime(comment.created_at)}</span>
            <button
              onClick={() => handleLikeComment(comment.id, isReply, comment.parent_id)}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <Heart className="w-3 h-3" />
              <span>{comment.likes_count}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center space-x-1 hover:text-indigo-500 transition-colors"
              >
                <Reply className="w-3 h-3" />
                <span>Reply</span>
              </button>
            )}
            <button
              onClick={() => setShowReportModal(comment.id)}
              className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
            >
              <Flag className="w-3 h-3" />
              <span>Report</span>
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 ml-3">
              <div className="flex space-x-2">
                <img
                  src={currentUser?.profile_picture}
                  alt={currentUser?.full_name}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    rows={2}
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent('');
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.map(reply => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        Comments ({comments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)})
      </h3>

      {/* New Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex space-x-3">
            <img
              src={currentUser.profile_picture}
              alt={currentUser.full_name}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {newComment.length}/1000 characters
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || loading}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">Please sign in to join the conversation.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => renderComment(comment))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Comment</h3>
            <p className="text-gray-600 mb-4">Why are you reporting this comment?</p>
            <div className="space-y-2">
              {[
                'Spam or misleading',
                'Harassment or bullying',
                'Inappropriate content',
                'Copyright violation',
                'Other'
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleReportComment(showReportModal, reason)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReportModal(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};