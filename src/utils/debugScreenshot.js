

export class DebugScreenshot {
  constructor(page, username = 'unknown') {
    this.page = page;
    this.username = username;
    this.screenshotCounter = 0;
    this.maxScreenshots = 5;
  }

  /**
   * Take a screenshot with fixed naming (debug-1.png to debug-5.png)
   * @param {string} operation - The operation being performed (for logging only)
   * @param {string} stage - The stage within the operation (for logging only)
   * @param {string} detail - Additional detail (for logging only)
   */
  async capture(operation, stage = 'during', detail = '') {
    try {
      this.screenshotCounter = (this.screenshotCounter % this.maxScreenshots) + 1;
      const filename = `debug-${this.screenshotCounter}.png`;
      
      await this.page.screenshot({ 
        path: filename,
        fullPage: false
      });
      
      console.log(` Debug screenshot saved`);
      return filename;
    } catch (error) {
      console.log(` Failed to take screenshot for ${operation}-${stage}: ${error.message}`);
      return null;
    }
  }


  async captureFullPage(operation, stage = 'full', detail = '') {
    try {
      this.screenshotCounter = (this.screenshotCounter % this.maxScreenshots) + 1;
      const filename = `debug-${this.screenshotCounter}.png`;
      
      await this.page.screenshot({ 
        path: filename,
        fullPage: true
      });
      
      console.log(` Full page screenshot saved: ${filename} (${operation}-${stage}${detail ? `-${detail}` : ''})`);
      return filename;
    } catch (error) {
      console.log(` Failed to take full page screenshot for ${operation}-${stage}: ${error.message}`);
      return null;
    }
  }


  async captureElement(selector, operation, detail = 'element') {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`  Element not found for screenshot: ${selector}`);
        return null;
      }

      this.screenshotCounter = (this.screenshotCounter % this.maxScreenshots) + 1;
      const filename = `debug-${this.screenshotCounter}.png`;
      
      await element.screenshot({ 
        path: filename
      });
      
      console.log(` Element screenshot saved: ${filename} (${operation}-${detail})`);
      return filename;
    } catch (error) {
      console.log(` Failed to take element screenshot for ${operation}: ${error.message}`);
      return null;
    }
  }


  async quick(name) {
    try {
      this.screenshotCounter = (this.screenshotCounter % this.maxScreenshots) + 1;
      const filename = `debug-${this.screenshotCounter}.png`;
      
      await this.page.screenshot({ path: filename });
      console.log(`ss : ${filename} (${name})`);
      return filename;
    } catch (error) {
      console.log(`ss failed: ${error.message}`);
      return null;
    }
  }

 
  updateUsername(username) {
    this.username = username;
  }
}

export const createDebugScreenshot = (page, username) => new DebugScreenshot(page, username);