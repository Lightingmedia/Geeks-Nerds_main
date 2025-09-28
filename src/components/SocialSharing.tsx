import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Copy, Check, Mail, MessageSquare } from 'lucide-react';
import { trackSocialShare } from '../utils/gtm';

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

  // Sanitize strings to prevent URI malformed errors
  const sanitizeForURI = (str: string): string => {
    try {
      // Remove or replace problematic Unicode characters
      return str
        .replace(/[\uD800-\uDFFF]/g, '') // Remove unpaired surrogate halves
        .replace(/[^\u0000-\u007F]/g, (char) => {
          // Try to encode non-ASCII characters, fallback to empty string if it fails
          try {
            encodeURIComponent(char);
            return char;
          } catch {
            return '';
          }
        })
        .trim();
    } catch {
      return '';
    }
  };

  const encodedUrl = encodeURIComponent(sanitizeForURI(url));
  const encodedTitle = encodeURIComponent(sanitizeForURI(title));
  const encodedDescription = encodeURIComponent(sanitizeForURI(description));
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
    // Validate URL before sharing
    if (!url || url.trim() === '') {
      console.error('Cannot share: URL is empty');
      return;
    }

    // Track social sharing via GTM
    trackSocialShare(platform, 'post', url);

    // Increment share count
    setShareCount(prev => prev + 1);

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        
        // Validate that the URL was actually copied
        const copiedText = await navigator.clipboard.readText();
        if (copiedText !== url) {
          throw new Error('Copy verification failed');
        }
        
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
        // Validate share data before attempting to share
        if (!title || !url) {
          throw new Error('Missing required share data');
        }
        
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.log('Native sharing cancelled or failed');
      }
    } else {
      // Validate share link before opening
      const shareUrl = shareLinks[platform as keyof typeof shareLinks];
      if (!shareUrl) {
        console.error('Invalid sharing platform:', platform);
        return;
      }
      
      // Check if URL is properly encoded
      if (!shareUrl.includes(encodedUrl)) {
        console.error('URL encoding failed for platform:', platform);
        return;
      }
      
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
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-[280px]">
            {/* Validation Warning */}
            {(!url || url.trim() === '') && (
              <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                ⚠ Cannot share: Invalid or missing URL
              </div>
            )}
            
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
                  disabled={!url || url.trim() === ''}
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
                    disabled={!url || url.trim() === ''}
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
                disabled={!url || url.trim() === ''}
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