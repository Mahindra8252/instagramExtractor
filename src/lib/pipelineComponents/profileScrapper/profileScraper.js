import { delay } from '@/utils/utils';
import { DebugScreenshot } from '@/utils/debugScreenshot.js';
import { ProfileDataExtractor } from './ProfileDataExtractor.js';
import { EngagementExtractor } from './EngagementExtractor.js';

export class ProfileScraper {
  constructor(page, username = 'unknown') {
    this.page = page;
    this.debugScreenshot = new DebugScreenshot(page, username);
    this.profileDataExtractor = new ProfileDataExtractor();
    this.engagementExtractor = new EngagementExtractor();
  }

  async scrapeProfileData() {
    console.log(' [ProfileScraper] Starting profile data extraction...');
    
    const currentUrl = this.page.url();
    console.log(` [ProfileScraper] Extracting profile from URL: ${currentUrl}`);
    
    await this.debugScreenshot.capture('profile-extraction', 'before', 'profile-page-loaded');
    
    try {
      const profileData = await this.profileDataExtractor.extract(this.page);
      
      console.log(` [ProfileScraper] Profile extraction completed successfully`);
      console.log(` [ProfileScraper] Extracted data: @${profileData?.username || 'unknown'}, ${profileData?.followersCount || 0} followers, ${profileData?.postsCount || 0} posts`);
      
      await this.debugScreenshot.capture('profile-extraction', 'after', 'profile-data-extracted');
      
      return profileData;
    } catch (error) {
      console.error(' [ProfileScraper] Error scraping profile data:', error);
      await this.debugScreenshot.capture('profile-extraction', 'error', 'extraction-failed');
      return null;
    }
  }

  async scrapePostEngagement(posts) {
    if (!posts || posts.length === 0) return null;

    console.log('Extracting engagement metrics from posts...');
    
    await this.debugScreenshot.capture('post-engagement', 'before', 'engagement-start');

    try {
      const engagementData = await this.engagementExtractor.extract(this.page, posts);
      
      await this.debugScreenshot.capture('post-engagement', 'after', 'engagement-complete');
      
      return engagementData;
    } catch (error) {
      console.error('Error extracting engagement data:', error);
      await this.debugScreenshot.capture('post-engagement', 'error', 'engagement-failed');
      return null;
    }
  }

  calculateEngagementRate(averageLikes, averageComments, followersCount) {
    if (!followersCount || followersCount === 0) return 0;
    
    const totalEngagement = (averageLikes || 0) + (averageComments || 0);
    const engagementRate = (totalEngagement / followersCount) * 100;
    
    return Math.round(engagementRate * 100) / 100;
  }

  async takeProfileScreenshot(filename = 'debug-profile.png') {
    try {
      await this.page.screenshot({ path: filename });
      console.log(`Profile screenshot saved: ${filename}`);
    } catch (error) {
      console.log(`Could not take profile screenshot: ${error.message}`);
    }
  }
  
  updateUsername(username) {
    this.debugScreenshot.updateUsername(username);
  }
}