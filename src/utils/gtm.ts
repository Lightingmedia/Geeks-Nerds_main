/**
 * Google Tag Manager event tracking utilities
 * For use with GTM container GTM-5RC6PVD5
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Initialize GTM data layer
 */
export const initializeGTM = () => {
  window.dataLayer = window.dataLayer || [];
};

/**
 * Push custom events to GTM data layer
 */
export const gtmPush = (event: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath: string, pageTitle: string) => {
  gtmPush({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track user authentication events
 */
export const trackAuth = (action: 'login' | 'register' | 'logout', userId?: string) => {
  gtmPush({
    event: 'auth_event',
    auth_action: action,
    user_id: userId || 'anonymous',
    timestamp: new Date().toISOString()
  });
};

/**
 * Track post interactions
 */
export const trackPostInteraction = (
  action: 'create' | 'like' | 'comment' | 'share' | 'delete',
  postId: string,
  postType: string,
  userId?: string
) => {
  gtmPush({
    event: 'post_interaction',
    interaction_type: action,
    post_id: postId,
    post_type: postType,
    user_id: userId || 'anonymous',
    timestamp: new Date().toISOString()
  });
};

/**
 * Track social sharing
 */
export const trackSocialShare = (
  platform: string,
  contentType: string,
  contentId: string
) => {
  gtmPush({
    event: 'social_share',
    social_platform: platform,
    content_type: contentType,
    content_id: contentId,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track file downloads/uploads
 */
export const trackFileAction = (
  action: 'upload' | 'download' | 'view',
  fileType: string,
  fileName: string,
  fileSize?: number
) => {
  gtmPush({
    event: 'file_action',
    file_action: action,
    file_type: fileType,
    file_name: fileName,
    file_size: fileSize,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track user engagement
 */
export const trackEngagement = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  gtmPush({
    event: 'user_engagement',
    engagement_action: action,
    engagement_category: category,
    engagement_label: label,
    engagement_value: value,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track search events
 */
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  gtmPush({
    event: 'search',
    search_term: searchTerm,
    search_results_count: resultsCount,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (
  formName: string,
  formType: string,
  success: boolean,
  errorMessage?: string
) => {
  gtmPush({
    event: 'form_submission',
    form_name: formName,
    form_type: formType,
    submission_success: success,
    error_message: errorMessage,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track custom business events
 */
export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, any>
) => {
  gtmPush({
    event: eventName,
    ...parameters,
    timestamp: new Date().toISOString()
  });
};