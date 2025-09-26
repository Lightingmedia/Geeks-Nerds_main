import React, { useState } from 'react';
import { Heart, ThumbsUp, Laugh, Angry, Frown, Plus } from 'lucide-react';

interface Reaction {
  type: string;
  count: number;
  users: string[];
  hasReacted: boolean;
}

interface ReactionSystemProps {
  postId: number;
  currentUser: any;
  initialReactions?: Reaction[];
  onReactionChange?: (reactions: Reaction[]) => void;
}

export const ReactionSystem: React.FC<ReactionSystemProps> = ({
  postId,
  currentUser,
  initialReactions = [],
  onReactionChange
}) => {
  const [reactions, setReactions] = useState<Reaction[]>(
    initialReactions.length > 0 ? initialReactions : [
      { type: 'like', count: 24, users: [], hasReacted: false },
      { type: 'love', count: 8, users: [], hasReacted: false },
      { type: 'laugh', count: 3, users: [], hasReacted: false },
      { type: 'wow', count: 1, users: [], hasReacted: false }
    ]
  );
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showReactionDetails, setShowReactionDetails] = useState(false);

  const reactionTypes = {
    like: { icon: ThumbsUp, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Like' },
    love: { icon: Heart, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Love' },
    laugh: { icon: Laugh, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Haha' },
    wow: { icon: Plus, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Wow' },
    sad: { icon: Frown, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Sad' },
    angry: { icon: Angry, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Angry' }
  };

  const handleReaction = async (reactionType: string) => {
    if (!currentUser) return;

    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'reaction', {
        event_category: 'engagement',
        event_label: reactionType,
        value: 1
      });
    }

    const updatedReactions = reactions.map(reaction => {
      if (reaction.type === reactionType) {
        const hasReacted = reaction.hasReacted;
        return {
          ...reaction,
          count: hasReacted ? reaction.count - 1 : reaction.count + 1,
          hasReacted: !hasReacted,
          users: hasReacted 
            ? reaction.users.filter(user => user !== currentUser.full_name)
            : [...reaction.users, currentUser.full_name]
        };
      } else if (reaction.hasReacted) {
        // Remove reaction from other types if user had reacted
        return {
          ...reaction,
          count: reaction.count - 1,
          hasReacted: false,
          users: reaction.users.filter(user => user !== currentUser.full_name)
        };
      }
      return reaction;
    });

    // Add new reaction type if it doesn't exist
    const existingReaction = updatedReactions.find(r => r.type === reactionType);
    if (!existingReaction) {
      updatedReactions.push({
        type: reactionType,
        count: 1,
        users: [currentUser.full_name],
        hasReacted: true
      });
    }

    setReactions(updatedReactions);
    setShowReactionPicker(false);
    
    if (onReactionChange) {
      onReactionChange(updatedReactions);
    }
  };

  const getTotalReactions = () => {
    return reactions.reduce((total, reaction) => total + reaction.count, 0);
  };

  const getTopReactions = () => {
    return reactions
      .filter(reaction => reaction.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  };

  const getUserReaction = () => {
    return reactions.find(reaction => reaction.hasReacted);
  };

  const userReaction = getUserReaction();
  const totalReactions = getTotalReactions();
  const topReactions = getTopReactions();

  return (
    <div className="flex items-center space-x-4">
      {/* Reaction Button */}
      <div className="relative">
        <button
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          onMouseEnter={() => setShowReactionPicker(true)}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-200 ${
            userReaction 
              ? `${reactionTypes[userReaction.type as keyof typeof reactionTypes].bgColor} ${reactionTypes[userReaction.type as keyof typeof reactionTypes].color}` 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          {userReaction ? (
            <>
              {React.createElement(reactionTypes[userReaction.type as keyof typeof reactionTypes].icon, { className: 'w-4 h-4' })}
              <span className="text-sm font-medium">
                {reactionTypes[userReaction.type as keyof typeof reactionTypes].label}
              </span>
            </>
          ) : (
            <>
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">Like</span>
            </>
          )}
        </button>

        {/* Reaction Picker */}
        {showReactionPicker && (
          <div 
            className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-xl border border-gray-200 p-2 flex space-x-1 z-50"
            onMouseLeave={() => setShowReactionPicker(false)}
          >
            {Object.entries(reactionTypes).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => handleReaction(type)}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-125 ${config.bgColor} ${config.color}`}
                  title={config.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Reaction Count Display */}
      {totalReactions > 0 && (
        <button
          onClick={() => setShowReactionDetails(true)}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <div className="flex -space-x-1">
            {topReactions.map((reaction) => {
              const Icon = reactionTypes[reaction.type as keyof typeof reactionTypes].icon;
              return (
                <div
                  key={reaction.type}
                  className={`w-5 h-5 rounded-full flex items-center justify-center border border-white ${reactionTypes[reaction.type as keyof typeof reactionTypes].bgColor}`}
                >
                  <Icon className={`w-3 h-3 ${reactionTypes[reaction.type as keyof typeof reactionTypes].color}`} />
                </div>
              );
            })}
          </div>
          <span className="text-sm">{totalReactions}</span>
        </button>
      )}

      {/* Reaction Details Modal */}
      {showReactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Reactions</h3>
              <button
                onClick={() => setShowReactionDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-80">
              {reactions
                .filter(reaction => reaction.count > 0)
                .sort((a, b) => b.count - a.count)
                .map((reaction) => {
                  const Icon = reactionTypes[reaction.type as keyof typeof reactionTypes].icon;
                  return (
                    <div key={reaction.type} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${reactionTypes[reaction.type as keyof typeof reactionTypes].bgColor}`}>
                          <Icon className={`w-4 h-4 ${reactionTypes[reaction.type as keyof typeof reactionTypes].color}`} />
                        </div>
                        <span className="font-medium text-gray-900">
                          {reactionTypes[reaction.type as keyof typeof reactionTypes].label}
                        </span>
                      </div>
                      <span className="text-gray-500">{reaction.count}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};