import { ENGAGEMENT_SELECTORS } from './constants.js';

export class DOMHelpers {
  static getExcludedAreaSelectors() {
    return [
      '[role="menu"]',
      'div[style*="flex-direction: row"]',
      'header',
      'aside'
    ];
  }

  static getEngagementExtractionScript() {
    return `
      // DOM Helper functions for browser context
      const isInExcludedArea = (element) => {
        const excludedSelectors = ${JSON.stringify(this.getExcludedAreaSelectors())};
        return excludedSelectors.some(selector => element.closest(selector));
      };

      const isValidPostUrl = (url, img) => {
        if (!url) return false;
        
        // Must be from Instagram CDN
        if (!(url.includes('scontent') || url.includes('cdninstagram') || url.includes('fbcdn'))) {
          return false;
        }
        
        // Skip profile pictures and stories
        if (url.includes('profile_pic') || url.includes('150x150') || 
            url.includes('320x320') || url.includes('story') || url.includes('highlight')) {
          return false;
        }
        
        // Check image dimensions
        if (img) {
          const width = img.naturalWidth || img.width;
          const height = img.naturalHeight || img.height;
          
          if (width < 200 || height < 200) return false;
          if (width === height && width < 400) return false;
        }
        
        return true;
      };

      const extractNumberFromText = (text) => {
        if (!text) return 0;
        
        const match = text.match(/(\\d{1,3}(?:,\\d{3})*|\\d+(?:\\.\\d+)?[km]?)/i);
        if (!match) return 0;
        
        let count = match[1].toLowerCase();
        
        if (count.includes('k')) {
          return Math.round(parseFloat(count.replace('k', '')) * 1000);
        } else if (count.includes('m')) {
          return Math.round(parseFloat(count.replace('m', '')) * 1000000);
        } else {
          return parseInt(count.replace(/,/g, ''));
        }
      };

      const extractEngagementFromContainer = (container) => {
        let likes = 0;
        let comments = 0;
        let views = 0;

        // Like extraction
        const likeSelectors = ${JSON.stringify(ENGAGEMENT_SELECTORS.likes)};
        likeSelectors.forEach(selector => {
          try {
            const elements = container.querySelectorAll(selector);
            elements.forEach(el => {
              const text = el.textContent || el.title || el.getAttribute('title');
              if (text && (/\\d+\\s*likes?/i.test(text) || /liked by \\d+/i.test(text))) {
                const count = extractNumberFromText(text);
                if (count && !likes) likes = count;
              }
            });
          } catch (e) {}
        });

        // Comment extraction
        const commentSelectors = ${JSON.stringify(ENGAGEMENT_SELECTORS.comments)};
        commentSelectors.forEach(selector => {
          try {
            const elements = container.querySelectorAll(selector);
            elements.forEach(el => {
              const text = el.textContent || el.title || el.getAttribute('title');
              if (text && /\\d+\\s*comments?/i.test(text)) {
                const count = extractNumberFromText(text);
                if (count && !comments) comments = count;
              }
            });
          } catch (e) {}
        });

        // View extraction
        const viewSelectors = ${JSON.stringify(ENGAGEMENT_SELECTORS.views)};
        viewSelectors.forEach(selector => {
          try {
            const elements = container.querySelectorAll(selector);
            elements.forEach(el => {
              const text = el.textContent || el.title || el.getAttribute('title');
              if (text && /\\d+\\s*views?/i.test(text)) {
                const count = extractNumberFromText(text);
                if (count && !views) views = count;
              }
            });
          } catch (e) {}
        });

        return { likes, comments, views };
      };
    `;
  }
}