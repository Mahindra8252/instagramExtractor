import { POST_SELECTORS } from './constants.js';
import { delay } from '@/utils/utils.js';

export class PostDetectionService {
  constructor(page, debugScreenshot) {
    this.page = page;
    this.debugScreenshot = debugScreenshot;
  }

  async waitForPosts(maxAttempts = 3) {
    console.log(` [PostDetection] Starting post detection with ${maxAttempts} max attempts...`);
    
    let postsFound = false;
    let attempts = 0;

    await this.debugScreenshot.capture('post-detection', 'before', 'initial-state');

    while (!postsFound && attempts < maxAttempts) {
      attempts++;
      console.log(` [PostDetection] Attempt ${attempts}/${maxAttempts} to find posts...`);
      
      await this.debugScreenshot.capture('post-detection', 'during', `attempt-${attempts}`);
      
      try {
        await this.page.waitForSelector(POST_SELECTORS.join(', '), { timeout: 10000 });
        console.log(' [PostDetection] Posts found on page successfully!');
        
        await this.debugScreenshot.capture('post-detection', 'during', `posts-found-attempt-${attempts}`);
        postsFound = true;
      } catch (error) {
        console.log(` [PostDetection] Attempt ${attempts} failed: ${error.message}`);
        
        await this.debugScreenshot.capture('post-detection', 'during', `attempt-${attempts}-failed`);
        
        if (attempts < maxAttempts) {
          await this.scrollAndRetry();
        }
      }
    }

    return postsFound;
  }

  async scrollAndRetry() {
    console.log('Scrolling down to load content...');
    
    await this.debugScreenshot.capture('scroll-retry', 'before', 'pre-scroll');
    
    await this.page.evaluate(() => {
      window.scrollTo(0, window.innerHeight);
    });
    
    await this.debugScreenshot.capture('scroll-retry', 'after', 'post-scroll');
    await delay(2000);
    
    await this.handlePopupButtons();
  }

  async handlePopupButtons() {
    try {
      const laterButton = await this.page.$('button:contains("Not Now"), button:contains("Later"), button:contains("Skip")');
      if (laterButton) {
        console.log('Found and clicking "Not Now" or similar button');
        
        await this.debugScreenshot.capture('scroll-retry', 'during', 'later-button-found');
        await laterButton.click();
        await this.debugScreenshot.capture('scroll-retry', 'after', 'later-button-clicked');
        await delay(1000);
      }
    } catch (btnError) {
    }
  }
}