import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Copy, Check, Mail, MessageSquare } from 'lucide-react';

interface SocialSharingProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

export const SocialSharing: React.FC<SocialSharingProps> = ({
  url,
  title,
  description = '',
  hashtags = [],
  className = ''
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 50) + 10); // Mock share count

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.map(tag => `#${tag}`).join(' ');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
  };

  const handleShare = async (platform: string) => {
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        event_category: 'engagement',
        event_label: platform,
        value: 1
      });
    }

    // Increment share count
    setShareCount(prev => prev + 1);

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.log('Native sharing cancelled or failed');
      }
    } else {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600 hover:bg-blue-50',
      key: 'facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500 hover:bg-sky-50',
      key: 'twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700 hover:bg-blue-50',
      key: 'linkedin'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-gray-600 hover:bg-gray-50',
      key: 'email'
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'text-green-600 hover:bg-green-50',
      key: 'whatsapp'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
        aria-label="Share post"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm">{shareCount}</span>
      </button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Share this post</h3>
              <span className="text-xs text-gray-500">{shareCount} shares</span>
            </div>
            
            {/* Copy Link */}
            <div className="mb-3 p-2 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center space-x-1 px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="grid grid-cols-2 gap-2">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.key}
                    onClick={() => handleShare(platform.key)}
                    className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${platform.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Native Share (if supported) */}
            {navigator.share && (
              <button
                onClick={() => handleShare('native')}
                className="w-full mt-2 flex items-center justify-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">More options</span>
              </button>
            )}

            {/* Hashtags */}
            {hashtags.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Suggested hashtags:</p>
                <div className="flex flex-wrap gap-1">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};