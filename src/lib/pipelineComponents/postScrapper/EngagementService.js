export class EngagementService {
  static calculateEngagementRate(averageLikes, averageComments, followersCount) {
    if (!followersCount || followersCount === 0) {
      return { rate: 0, category: 'Unknown' };
    }
    
    const totalAvgEngagement = (averageLikes || 0) + (averageComments || 0);
    const rate = (totalAvgEngagement / followersCount) * 100;
    
    let category = 'Low';
    if (rate >= 6) category = 'Excellent';
    else if (rate >= 3) category = 'Good';
    else if (rate >= 1) category = 'Average';
    
    return {
      rate: Math.round(rate * 100) / 100,
      category
    };
  }

  static getEngagementAnalysisScript() {
    return `
      (function() {
        // Engagement analysis functions for browser context
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
        const likeSelectors = ${JSON.stringify([
          'button span[title*="like"]',
          'span[title*="like"]', 
          'button[aria-label*="like"] span',
          'span:contains("likes")',
          'button span[dir="auto"]'
        ])};

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
        const commentSelectors = ${JSON.stringify([
          'button[aria-label*="comment"] span',
          'span:contains("comments")',
          'span[title*="comment"]',
          'a[href*="/comments/"] span'
        ])};

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
        const viewSelectors = ${JSON.stringify([
          'span:contains("views")',
          'span[title*="view"]',
          '[aria-label*="view"] span'
        ])};

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

      let totalLikes = 0;
      let totalComments = 0;
      let totalViews = 0;
      let postCount = 0;

      const postElements = document.querySelectorAll('article');
      console.log(\` Found \${postElements.length} potential post containers\`);

      postElements.forEach((post, index) => {
        const engagement = extractEngagementFromContainer(post);
        
        if (engagement.likes > 0 || engagement.comments > 0 || engagement.views > 0) {
          totalLikes += engagement.likes;
          totalComments += engagement.comments;
          totalViews += engagement.views;
          postCount++;
          console.log(\`Post \${index + 1} engagement: \${engagement.likes} likes, \${engagement.comments} comments, \${engagement.views} views\`);
        }
      });

        console.log(\`Final totals: \${postCount} posts, \${totalLikes} total likes, \${totalComments} total comments, \${totalViews} total views\`);
        
        return { totalLikes, totalComments, totalViews, postCount };
      })();
    `;
  }
}