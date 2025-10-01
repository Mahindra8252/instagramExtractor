export const Selectors = {
  USERNAME: [
    'h2[dir="auto"]', 
    'h1[dir="auto"]',
    '[data-testid="user-avatar"] + div h2',
    'header h2',
    'main h2'
  ],
  
  DISPLAY_NAME: [
    'header section > div > div > div > div > span',
    'header section span[dir="auto"]',
    'header h1',
    'header section div[style] span',
    'header section div div span',
    '[data-testid="user-avatar"] + div + div span',
    'main section div span',
    'span[dir="auto"]',
    'header section > div:first-child span',
    'header section > div span:not([title])',
    'header section span:not([role]):not([aria-label])'
  ],
  
  PROFILE_PICTURE: [
    'header img[alt*="profile"]',
    'canvas + img',
    'header img[src*="profile"]',
    'img[data-testid="user-avatar"]',
    'header section img',
    'main img[alt*="profile"]'
  ],
  
  BIO: [
    'header section > div:last-child span',
    'main section div span[dir="auto"]',
    'header div[data-testid] span',
    'span.-vDIg span'
  ],
  
  VERIFIED: [
    'svg[aria-label*="Verified"]',
    '[data-testid="verification-badge"]',
    'span[title*="Verified"]'
  ],
  
  WEBSITE: [
    'header a[href^="http"]',
    'div[dir="auto"] a[href^="http"]',
    'a[target="_blank"][href^="http"]'
  ],
  
  LIKE: [
    'button span[dir="auto"]',
    'span:contains("likes")',
    'button[aria-label*="like"]',
    'svg[aria-label*="like"] + span'
  ],
  
  COMMENT: [
    'span:contains("comments")',
    'button[aria-label*="comment"] span',
    'svg[aria-label*="comment"] + span'
  ],

  STATS: [
    'header section ul li span',
    'header section div span[title]',
    'header section a span',
    'main section ul li span',
    'header div ul li span',
    'header section > div span',
    'header ul li span[title]',
    'section div div span',
    'a[href*="followers"] span',
    'a[href*="following"] span'
  ]
};

export const PrivateIndicators = [
  'This account is private',
  'private account',
  'Follow to see their photos'
];