/**
 * Content moderation utilities for maintaining advertiser-friendly standards
 * Compliant with Google AdSense policies and TAG standards
 */

export interface ModerationResult {
  isApproved: boolean;
  confidence: number;
  flags: string[];
  categories: string[];
  recommendations: string[];
}

export interface ContentAnalysis {
  text: string;
  type: 'post' | 'comment' | 'reply';
  userId: string;
  timestamp: Date;
}

/**
 * Prohibited content patterns for advertiser-friendly compliance
 */
const PROHIBITED_PATTERNS = {
  // Violence and harmful content
  violence: [
    /\b(kill|murder|death|violence|harm|hurt|attack|fight|war|weapon|gun|knife|bomb)\b/gi,
    /\b(blood|gore|torture|abuse|assault|threat)\b/gi
  ],
  
  // Adult content
  adult: [
    /\b(sex|porn|nude|naked|adult|explicit|nsfw)\b/gi,
    /\b(dating|hookup|escort|massage)\b/gi
  ],
  
  // Hate speech and discrimination
  hate: [
    /\b(hate|racist|discrimination|bigot|nazi|supremacist)\b/gi,
    /\b(terrorist|extremist|radical|fanatic)\b/gi
  ],
  
  // Illegal activities
  illegal: [
    /\b(drug|cocaine|heroin|marijuana|weed|illegal|piracy|hack|crack|steal)\b/gi,
    /\b(fraud|scam|cheat|counterfeit|fake)\b/gi
  ],
  
  // Spam and misleading content
  spam: [
    /\b(click here|free money|get rich|miracle cure|guaranteed|limited time)\b/gi,
    /\b(buy now|act fast|don't wait|urgent|exclusive offer)\b/gi
  ]
};

/**
 * Positive content indicators for tech/professional content
 */
const POSITIVE_PATTERNS = {
  technical: [
    /\b(code|programming|development|software|algorithm|database|api|framework)\b/gi,
    /\b(javascript|python|react|node|typescript|css|html|sql|git)\b/gi
  ],
  
  professional: [
    /\b(career|job|interview|resume|skills|experience|education|learning)\b/gi,
    /\b(team|collaboration|project|meeting|presentation|leadership)\b/gi
  ],
  
  educational: [
    /\b(tutorial|guide|learn|teach|explain|understand|knowledge|study)\b/gi,
    /\b(course|training|workshop|certification|degree|university)\b/gi
  ]
};

/**
 * Analyze content for advertiser-friendly compliance
 * @param analysis - Content analysis object
 * @returns Moderation result with approval status and recommendations
 */
export const moderateContent = (analysis: ContentAnalysis): ModerationResult => {
  const { text, type } = analysis;
  const flags: string[] = [];
  const categories: string[] = [];
  const recommendations: string[] = [];
  let confidence = 1.0;

  // Check for prohibited content
  Object.entries(PROHIBITED_PATTERNS).forEach(([category, patterns]) => {
    patterns.forEach(pattern => {
      if (pattern.test(text)) {
        flags.push(category);
        confidence -= 0.3;
      }
    });
  });

  // Check for positive indicators
  Object.entries(POSITIVE_PATTERNS).forEach(([category, patterns]) => {
    patterns.forEach(pattern => {
      if (pattern.test(text)) {
        categories.push(category);
        confidence += 0.1;
      }
    });
  });

  // Additional checks for different content types
  if (type === 'comment' || type === 'reply') {
    // More lenient for comments but still check for major violations
    if (text.length < 10) {
      flags.push('too_short');
      confidence -= 0.1;
    }
    
    if (/[A-Z]{5,}/.test(text)) {
      flags.push('excessive_caps');
      confidence -= 0.1;
    }
  }

  // Check for spam indicators
  const urlCount = (text.match(/https?:\/\/[^\s]+/g) || []).length;
  if (urlCount > 2) {
    flags.push('excessive_links');
    confidence -= 0.2;
  }

  // Generate recommendations
  if (flags.includes('violence') || flags.includes('hate')) {
    recommendations.push('Content contains potentially harmful language. Consider revising to maintain a professional tone.');
  }
  
  if (flags.includes('spam')) {
    recommendations.push('Content appears promotional. Focus on providing value to the community.');
  }
  
  if (flags.includes('adult')) {
    recommendations.push('Content may not be suitable for all audiences. Consider keeping discussions professional.');
  }

  if (categories.includes('technical') || categories.includes('professional')) {
    recommendations.push('Great technical content! This aligns well with our community standards.');
  }

  // Determine approval status
  const isApproved = confidence > 0.5 && 
                    !flags.includes('violence') && 
                    !flags.includes('hate') && 
                    !flags.includes('adult') && 
                    !flags.includes('illegal');

  return {
    isApproved,
    confidence: Math.max(0, Math.min(1, confidence)),
    flags: [...new Set(flags)],
    categories: [...new Set(categories)],
    recommendations
  };
};

/**
 * Generate content safety score for advertiser compliance
 * @param content - Content to analyze
 * @returns Safety score from 0-100
 */
export const getContentSafetyScore = (content: string): number => {
  const analysis: ContentAnalysis = {
    text: content,
    type: 'post',
    userId: 'anonymous',
    timestamp: new Date()
  };
  
  const result = moderateContent(analysis);
  return Math.round(result.confidence * 100);
};

/**
 * Check if content is suitable for ad placement
 * @param content - Content to check
 * @returns Boolean indicating ad suitability
 */
export const isAdFriendly = (content: string): boolean => {
  const safetyScore = getContentSafetyScore(content);
  return safetyScore >= 70; // Minimum threshold for ad placement
};

/**
 * Generate content categories for targeting
 * @param content - Content to categorize
 * @returns Array of content categories
 */
export const categorizeContent = (content: string): string[] => {
  const categories: string[] = [];
  
  // Technical categories
  if (/\b(javascript|js|react|vue|angular|node)\b/gi.test(content)) {
    categories.push('frontend-development');
  }
  
  if (/\b(python|django|flask|fastapi|backend|api)\b/gi.test(content)) {
    categories.push('backend-development');
  }
  
  if (/\b(devops|docker|kubernetes|aws|cloud|deployment)\b/gi.test(content)) {
    categories.push('devops-infrastructure');
  }
  
  if (/\b(ai|ml|machine learning|data science|tensorflow|pytorch)\b/gi.test(content)) {
    categories.push('artificial-intelligence');
  }
  
  if (/\b(mobile|ios|android|react native|flutter)\b/gi.test(content)) {
    categories.push('mobile-development');
  }
  
  // Professional categories
  if (/\b(career|job|interview|hiring|resume|salary)\b/gi.test(content)) {
    categories.push('career-development');
  }
  
  if (/\b(startup|entrepreneur|business|funding|investment)\b/gi.test(content)) {
    categories.push('entrepreneurship');
  }
  
  if (/\b(design|ui|ux|user experience|interface|prototype)\b/gi.test(content)) {
    categories.push('design-ux');
  }
  
  return categories.length > 0 ? categories : ['general-tech'];
};

/**
 * Validate user-generated content before posting
 * @param content - Content to validate
 * @param userId - User ID for tracking
 * @returns Validation result with approval and feedback
 */
export const validateUserContent = (content: string, userId: string) => {
  const analysis: ContentAnalysis = {
    text: content,
    type: 'post',
    userId,
    timestamp: new Date()
  };
  
  const moderationResult = moderateContent(analysis);
  const categories = categorizeContent(content);
  const safetyScore = getContentSafetyScore(content);
  
  return {
    ...moderationResult,
    categories,
    safetyScore,
    isAdFriendly: isAdFriendly(content),
    canPost: moderationResult.isApproved && safetyScore >= 50
  };
};