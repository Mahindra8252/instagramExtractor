import { Selectors } from './Selectors.js';

export class EngagementExtractor {
  async extract(page, posts) {
    return await page.evaluate(({ Selectors, postUrls }) => {
      const engagement = {
        totalLikes: 0,
        totalComments: 0,
        postsAnalyzed: 0,
        averageLikes: 0,
        averageComments: 0,
        engagementRate: 0
      };

      const postElements = document.querySelectorAll('article, [role="button"]');
      
      postElements.forEach(element => {
        try {
          Selectors.LIKE.forEach(selector => {
            try {
              const likeElements = element.querySelectorAll(selector);
              likeElements.forEach(likeEl => {
                const text = likeEl.textContent;
                if (text && /\d/.test(text) && text.includes('like')) {
                  const likes = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                  if (likes > 0) {
                    engagement.totalLikes += likes;
                    engagement.postsAnalyzed++;
                  }
                }
              });
            } catch (e) {}
          });

          Selectors.COMMENT.forEach(selector => {
            try {
              const commentElements = element.querySelectorAll(selector);
              commentElements.forEach(commentEl => {
                const text = commentEl.textContent;
                if (text && /\d/.test(text) && text.includes('comment')) {
                  const comments = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                  if (comments > 0) {
                    engagement.totalComments += comments;
                  }
                }
              });
            } catch (e) {}
          });
        } catch (error) {
          console.log('Error processing post element:', error);
        }
      });

      if (engagement.postsAnalyzed > 0) {
        engagement.averageLikes = Math.round(engagement.totalLikes / engagement.postsAnalyzed);
        engagement.averageComments = Math.round(engagement.totalComments / engagement.postsAnalyzed);
      }

      console.log('Engagement data:', engagement);
      return engagement;
    }, { Selectors, postUrls: posts.map(p => p.url) });
  }
}