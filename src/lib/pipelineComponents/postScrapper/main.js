import { PostDetectionService } from './PostDetectionService.js';
import { PostExtractionService } from './PostExtractionService.js';
import { EngagementService } from './EngagementService.js';
import { DebugScreenshot } from '@/utils/debugScreenshot.js';

export class PostScraper {
  constructor(page, username = 'unknown') {
    this.page = page;
    this.debugScreenshot = new DebugScreenshot(page, username);
    this.postDetection = new PostDetectionService(page, this.debugScreenshot);
  }

  async waitForPosts(maxAttempts = 3) {
    console.log(` [PostScraper] Current page URL: ${this.page.url()}`);
    return await this.postDetection.waitForPosts(maxAttempts);
  }

  async scrapePostsWithEngagement(maxPosts = 10) {
    console.log(' [PostScraper] Starting  post extraction with engagement...');
    console.log(` [PostScraper] Starting from URL: ${this.page.url()}`);
    
    await this.debugScreenshot.capture('post-scraping', 'before', 'scrape-start');
    
    const profileUrl = this.page.url();
    
      const posts = await PostExtractionService.extractPostsWithEngagement(this.page, maxPosts || 10);
    
    console.log(` [PostScraper] Found ${posts.length} posts with engagement data`);
    
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
    const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);
    console.log(` [PostScraper] Total engagement: ${totalLikes} likes, ${totalComments} comments`);
    
    await this.page.goto(profileUrl, { waitUntil: 'networkidle2' });
    
    await this.debugScreenshot.capture('post-scraping', 'after', `found-${posts.length}-posts`);
    
    return posts;
  }

  async scrapePosts(maxPosts = 10) {
    console.log(' [PostScraper] Starting FAST post extraction (limited engagement data)...');
    console.log(`[PostScraper] Extracting posts from URL: ${this.page.url()}`);
    
    await this.debugScreenshot.capture('post-scraping', 'before', 'scrape-start');
    
    const posts = await PostExtractionService.extractPosts(this.page, maxPosts);
    
    console.log(` [PostScraper] Found ${posts.length} posts`);
    
    await this.debugScreenshot.capture('post-scraping', 'after', `found-${posts.length}-posts`);
    
    return posts;
  }

  async scrapeEngagementData(maxPosts = 12) {
    console.log(`[PostScraper] Starting engagement analysis for up to ${maxPosts} posts...`);
    console.log(`[PostScraper] Analyzing engagement from URL: ${this.page.url()}`);
    
    await this.debugScreenshot.capture('engagement-analysis', 'before', 'engagement-start');
    
    const engagement = {
      averageLikes: 0,
      averageComments: 0,
      averageViews: 0,
      engagementRate: 0,
      totalPosts: 0
    };

    try {
      const engagementScript = EngagementService.getEngagementAnalysisScript();
      const result = await this.page.evaluate(engagementScript);

      if (result.postCount > 0) {
        engagement.averageLikes = Math.round(result.totalLikes / result.postCount);
        engagement.averageComments = Math.round(result.totalComments / result.postCount);
        engagement.averageViews = result.totalViews > 0 ? Math.round(result.totalViews / result.postCount) : 0;
        engagement.totalPosts = result.postCount;
        
        const totalEngagement = result.totalLikes + result.totalComments;
        engagement.engagementRate = result.postCount > 0 ?
          Math.round((totalEngagement / result.postCount) * 100) / 100 : 0;
      }

      console.log(' [PostScraper] Engagement analysis complete:', engagement);
      
    } catch (error) {
      console.error(' [PostScraper] Error during engagement analysis:', error);
    }

    await this.debugScreenshot.capture('engagement-analysis', 'after', `engagement-complete`);
    
    return engagement;
  }

  calculateEngagementRate(averageLikes, averageComments, followersCount) {
    return EngagementService.calculateEngagementRate(averageLikes, averageComments, followersCount);
  }

  async checkPrivateProfile() {
    await this.debugScreenshot.capture('private-check', 'during', 'checking-privacy');
    
    const pageContent = await this.page.content();
    const isPrivate = pageContent.includes('private') || pageContent.includes('Private');
    
    await this.debugScreenshot.capture('private-check', 'after',
      isPrivate ? 'profile-private' : 'profile-public');
    
    return isPrivate;
  }

  async takeDebugScreenshot(filename) {
    try {
      await this.page.screenshot({ path: filename });
    } catch (error) {
    }
  }
}