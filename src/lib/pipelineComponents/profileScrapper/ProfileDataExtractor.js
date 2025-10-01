import { Selectors, PrivateIndicators } from './Selectors.js';
import { parseNumber } from './numberParser.js';
import { findElementWithSelectors, findTextInDocument } from './elementFinder.js';

export class ProfileDataExtractor {
  async extract(page) {
    const extractionScript = this.getBrowserExtractionScript();
    
    return await page.evaluate(extractionScript);
  }

  getBrowserExtractionScript() {
    return `
      (function() {
        // Import selectors and utilities (need to be defined in browser context)
        const Selectors = ${JSON.stringify(Selectors)};
        const PrivateIndicators = ${JSON.stringify(PrivateIndicators)};
        
        // Helper functions (moved inside browser context)
        function parseNumber(text) {
          if (!text) return 0;
          const cleaned = text.toString().replace(/[,\\s]/g, '').toLowerCase();
          if (cleaned.includes('k')) return Math.round(parseFloat(cleaned) * 1000);
          if (cleaned.includes('m')) return Math.round(parseFloat(cleaned) * 1000000);
          if (cleaned.includes('b')) return Math.round(parseFloat(cleaned) * 1000000000);
          return parseInt(cleaned) || 0;
        }

        function findElementWithSelectors(selectors, options = {}) {
          for (const selector of selectors) {
            try {
              const elements = document.querySelectorAll(selector);
              for (const el of elements) {
                const text = el.textContent?.trim();
                if (text && text.length >= (options.minLength || 0) && text.length <= (options.maxLength || 1000)) {
                  if (options.excludePatterns) {
                    const hasExcluded = options.excludePatterns.some(pattern => pattern.test(text));
                    if (hasExcluded) continue;
                  }
                  return text;
                }
              }
            } catch (e) {
              continue;
            }
          }
          return null;
        }

        function findTextInDocument(patterns) {
          const text = document.body.textContent;
          for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) return match[1] || match[0];
          }
          return null;
        }

        // Main extraction logic
        const data = {
          influencerName: null,
          username: null,
          profilePicture: null,
          followersCount: null,
          followingCount: null,
          postsCount: null,
          bio: null,
          isVerified: false,
          isPrivate: false,
          website: null
        };

        // Extract username
        const currentUrl = window.location.href;
        const urlMatch = currentUrl.match(/instagram\\.com\\/([^\\/\\?]+)/);
        if (urlMatch) {
          data.username = urlMatch[1];
        } else {
          data.username = findElementWithSelectors(Selectors.USERNAME)?.replace('@', '');
        }

        // Extract display name
        data.influencerName = findElementWithSelectors(Selectors.DISPLAY_NAME, {
          minLength: 1,
          maxLength: 100,
          excludePatterns: [/@/, /followers|following|posts/, /•/, /^\\d+$/, /^[0-9,k.m\\s]+$/i]
        });

        // Extract profile picture
        for (const selector of Selectors.PROFILE_PICTURE) {
          try {
            const img = document.querySelector(selector);
            if (img && img.src && !img.src.includes('data:')) {
              data.profilePicture = img.src;
              break;
            }
          } catch (e) {}
        }

        // Extract stats
        for (const selector of Selectors.STATS) {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              const text = el.textContent?.toLowerCase();
              const number = parseNumber(el.textContent);
              
              if (text?.includes('followers') && !data.followersCount) {
                data.followersCount = number;
              } else if (text?.includes('following') && !data.followingCount) {
                data.followingCount = number;
              } else if (text?.includes('posts') && !data.postsCount) {
                data.postsCount = number;
              }
            });
          } catch (e) {}
        }

        // Extract bio
        data.bio = findElementWithSelectors(Selectors.BIO, {
          minLength: 1,
          maxLength: 500,
          excludePatterns: [/^\\d+$/, /followers|following|posts/i]
        });

        // Check verification
        data.isVerified = Selectors.VERIFIED.some(selector => {
          try {
            return document.querySelector(selector) !== null;
          } catch (e) {
            return false;
          }
        });

        // Check private account
        data.isPrivate = PrivateIndicators.some(indicator => {
          return document.body.textContent?.toLowerCase().includes(indicator.toLowerCase());
        });

        // Extract website
        data.website = findElementWithSelectors(Selectors.WEBSITE);

        console.log('Profile data extracted:', data);
        return data;
      })();
    `;
  }
}