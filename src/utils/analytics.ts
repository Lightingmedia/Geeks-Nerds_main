/**
 * Analytics utility functions for tracking user engagement
 * Compliant with Google AdSense and TAG standards
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    adsbygoogle: any[];
  }
}

export interface EngagementEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

/**
 * Track user engagement events
 * @param event - Engagement event details
 */
export const trackEngagement = (event: EngagementEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters
    });
  }
};

/**
 * Track social sharing events
 * @param platform - Social media platform
 * @param contentType - Type of content being shared
 * @param contentId - Unique identifier for the content
 */
export const trackSocialShare = (platform: string, contentType: string, contentId: string) => {
  trackEngagement({
    action: 'share',
    category: 'social_engagement',
    label: platform,
    value: 1,
    custom_parameters: {
      content_type: contentType,
      content_id: contentId,
      engagement_type: 'share'
    }
  });
};

/**
 * Track comment interactions
 * @param action - Comment action (post, reply, like, delete)
 * @param postId - Post identifier
 */
export const trackCommentInteraction = (action: string, postId: string) => {
  trackEngagement({
    action: `comment_${action}`,
    category: 'user_engagement',
    label: 'comment_interaction',
    value: 1,
    custom_parameters: {
      post_id: postId,
      engagement_type: 'comment'
    }
  });
};

/**
 * Track reaction events
 * @param reactionType - Type of reaction (like, love, laugh, etc.)
 * @param contentId - Content identifier
 */
export const trackReaction = (reactionType: string, contentId: string) => {
  trackEngagement({
    action: 'reaction',
    category: 'user_engagement',
    label: reactionType,
    value: 1,
    custom_parameters: {
      reaction_type: reactionType,
      content_id: contentId,
      engagement_type: 'reaction'
    }
  });
};

/**
 * Track content moderation events
 * @param action - Moderation action (report, flag, block)
 * @param reason - Reason for moderation
 * @param contentId - Content identifier
 */
export const trackModerationEvent = (action: string, reason: string, contentId: string) => {
  trackEngagement({
    action: `moderation_${action}`,
    category: 'content_safety',
    label: reason,
    value: 1,
    custom_parameters: {
      moderation_reason: reason,
      content_id: contentId,
      safety_action: action
    }
  });
};

/**
 * Track user session engagement
 * @param sessionDuration - Duration of session in seconds
 * @param pageViews - Number of pages viewed
 * @param interactions - Number of interactions performed
 */
export const trackSessionEngagement = (sessionDuration: number, pageViews: number, interactions: number) => {
  trackEngagement({
    action: 'session_summary',
    category: 'user_behavior',
    label: 'session_engagement',
    value: sessionDuration,
    custom_parameters: {
      session_duration: sessionDuration,
      page_views: pageViews,
      total_interactions: interactions,
      engagement_rate: interactions / pageViews
    }
  });
};

/**
 * Initialize enhanced ecommerce tracking for content engagement
 * @param contentId - Content identifier
 * @param contentType - Type of content
 * @param author - Content author
 */
export const trackContentView = (contentId: string, contentType: string, author: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: 0, // Free content
      items: [{
        item_id: contentId,
        item_name: `${contentType}_content`,
        item_category: contentType,
        item_brand: 'Geeks & Nerds',
        item_variant: author,
        quantity: 1
      }]
    });
  }
};

/**
 * Track ad-friendly content compliance
 * @param contentId - Content identifier
 * @param isCompliant - Whether content meets advertiser guidelines
 * @param categories - Content categories
 */
export const trackContentCompliance = (contentId: string, isCompliant: boolean, categories: string[]) => {
  trackEngagement({
    action: 'content_compliance_check',
    category: 'content_safety',
    label: isCompliant ? 'compliant' : 'non_compliant',
    value: isCompliant ? 1 : 0,
    custom_parameters: {
      content_id: contentId,
      is_advertiser_friendly: isCompliant,
      content_categories: categories.join(','),
      compliance_status: isCompliant ? 'approved' : 'flagged'
    }
  });
};