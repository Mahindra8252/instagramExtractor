export const POST_SELECTORS = [
  'article',
  'div[role="button"]',
  'a[href*="/p/"]',
  'a[href*="/reel/"]',
  'div[data-testid="post-container"]'
];

export const VIDEO_SELECTORS = [
  'video',
  'div[role="button"] video',
  'article video'
];

export const ENGAGEMENT_SELECTORS = {
  likes: [
    'button span[title*="like"]',
    'span[title*="like"]', 
    'button[aria-label*="like"] span',
    'span:contains("likes")',
    'button span[dir="auto"]'
  ],
  comments: [
    'button[aria-label*="comment"] span',
    'span:contains("comments")',
    'span[title*="comment"]',
    'a[href*="/comments/"] span'
  ],
  views: [
    'span:contains("views")',
    'span[title*="view"]',
    '[aria-label*="view"] span'
  ]
};